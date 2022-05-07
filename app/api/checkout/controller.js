const { Transaction, DetailTransaction, Book } = require("../../db/models");
const { Op } = require("sequelize");
const sequelize = require("../../db/models").sequelize;

module.exports = {
  checkout: async (req, res, next) => {
    const trans = await sequelize.transaction();
    try {
      const { payload } = req.body;
      const user = req.user.id;

      let errorBookIdNotFound = [],
        errorBookIdStock = [],
        updateStock = [];

      for (let i = 0; i < payload.length; i++) {
        const checkingBook = await Book.findOne({
          where: { id: payload[i].bookId, user: user },
        });

        // add field detail transaction
        if (checkingBook != null) {
          //   payload[i].transaction = transaction.id;
          payload[i].user = user;
          payload[i].titleBook = checkingBook.title;
          payload[i].books = payload[i].bookId;
          payload[i].imageBook = checkingBook.image;
          payload[i].priceBook = checkingBook.price;

          updateStock.push({
            id: payload[i].bookId,
            stock: checkingBook.stock - payload[i].quantity,
          });

          if (payload[i].quantity > checkingBook.stock) {
            errorBookIdStock.push(
              `${payload[i].quantity} - ${checkingBook.stock}`
            );
          }
        } else {
          errorBookIdNotFound.push(payload[i].bookId);
        }
      }

      if (errorBookIdNotFound.length != 0) {
        return res.status(400).json({
          message: `book id ${errorBookIdNotFound.join(", ")} not found `,
        });
      }

      if (errorBookIdStock.length != 0) {
        return res.status(400).json({
          message: `book stock is not enough with id ${errorBookIdNotFound.join(
            ", "
          )}`,
        });
      }

      const transaction = await Transaction.create({
        invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date(),
        user: user,
      });

      payload.forEach((element) => {
        element.transaction = transaction.id;
      });

      await Book.bulkCreate(
        updateStock,
        { updateOnDuplicate: ["stock"] },
        { transaction: trans }
      );

      const detailTransaction = await DetailTransaction.bulkCreate(payload, {
        transaction: trans,
      });

      await trans.commit();

      res.status(201).json({ message: "success", data: detailTransaction });
    } catch (error) {
      if (trans) await trans.rollback();
      next(error);
    }
  },
};
