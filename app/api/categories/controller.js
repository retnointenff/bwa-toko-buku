const { Category } = require("../../db/models");

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        where: { user: req.user.id },
        attributes: ["id", "name"],
      });

      res.status(200).json({ message: "Success", data: categories });
    } catch (error) {
      next(error);
    }
  },
  createCategories: async (req, res, next) => {
    try {
      const { name } = req.body;

      const categories = await Category.create({
        name: name,
        user: req.user.id,
      });

      res.status(201).json({
        message: "Success",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },
  updateCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const checkCategory = await Category.findOne({
        where: { id: id, user: req.user.id },
      });

      const update = await checkCategory.update({ name: name });

      res.status(201).json({ message: "Success", data: update });
    } catch (error) {
      next(error);
    }
  },
  deleteCategories: (req, res, next) => {
    const { id } = req.params;

    Category.findOne({ where: { id: id, user: req.user.id } })
      .then((categories) => {
        if (categories) {
          categories.destroy();

          res.status(201).json({ message: "Data has been delete" });
        }
      })
      .catch((err) => next(err));
  },
};
