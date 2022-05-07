const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const controller = require("./controller");

/* GET home page. */
router.get("/categories", auth, controller.getAllCategories);
router.post("/createCategories", auth, controller.createCategories);
router.put("/updateCategories/:id", auth, controller.updateCategories);
router.delete("/deleteCategories/:id", auth, controller.deleteCategories);

module.exports = router;
