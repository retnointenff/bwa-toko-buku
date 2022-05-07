const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const controller = require("./controller");

/* GET home page. */
// router.get("/categories", auth, controller.getAllCategories);
router.post("/checkout", auth, controller.checkout);
// router.put("/updateCategories/:id", auth, controller.updateCategories);
// router.delete("/deleteCategories/:id", auth, controller.deleteCategories);

module.exports = router;
