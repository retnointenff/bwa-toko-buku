const { Book, Category } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const book = await Book.findAll({
        where: { user: req.user.id },
        attributes: ["id", "title", "author", "stock"],
      });

      res.status(200).json({ message: "Success", data: book });
    } catch (error) {
      next(error);
    }
  },
  getBooksbyTitle: async (req, res, next) => {
    try {
      const { keyword = "" } = req.query;
      console.log(keyword);
      let condition = {
        user: req.user.id,
      };

      if (keyword !== "") {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
      }

      const book = await Book.findAll({
        where: condition,
        include: {
          model: Category,
          attributes: ["id", "name"],
        },
        attributes: ["id", "title", "author", "image"],
      });

      res.status(200).json({ message: "Success", data: book });
    } catch (error) {
      next(error);
    }
  },
  getBooksbyCategory: async (req, res, next) => {
    try {
      const { keyword = "" } = req.query;
      console.log(keyword);
      let condition = {
        user: req.user.id,
      };

      if (keyword !== "") {
        condition = { ...condition, category: keyword };
      }

      const book = await Book.findAll({
        where: condition,
        include: {
          model: Category,
          attributes: ["id", "name"],
        },
        attributes: ["id", "title", "author", "image"],
      });

      res.status(200).json({ message: "Success", data: book });
    } catch (error) {
      next(error);
    }
  },
  createBooks: async (req, res, next) => {
    try {
      const { title, price, category, author, published, stock, image } =
        req.body;
      const user = req.user.id;

      const checkCategory = await Category.findOne({
        where: { id: category, user: user },
      });

      if (!checkCategory) {
        return res.status(404).json({ message: "id category not found" });
      }

      const books = await Book.create({
        title,
        category,
        author,
        published,
        price,
        stock,
        image,
        user: user,
      });

      res.status(201).json({
        message: "Success",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },
  updateBooks: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, price, category, author, published, stock, image } =
        req.body;

      const checkBook = await Book.findOne({
        where: { id: id, user: req.user.id },
      });

      if (!checkBook) {
        return res.status(404).json({ message: "id book not found" });
      }

      const update = await checkBook.update({
        title,
        category,
        author,
        published,
        price,
        stock,
        image,
      });

      res.status(201).json({ message: "Success", data: update });
    } catch (error) {
      next(error);
    }
  },
  deleteBooks: (req, res, next) => {
    const { id } = req.params;

    Book.findOne({ where: { id: id, user: req.user.id } })
      .then((books) => {
        if (books) {
          books.destroy();

          res.status(201).json({ message: "Data has been delete" });
        } else {
          res.status(404).json({ message: "Data not found" });
        }
      })
      .catch((err) => next(err));
  },
};
