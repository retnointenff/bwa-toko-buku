const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const controller = require("./controller");

/* GET home page. */
router.get("/books", auth, controller.getAllBooks);
router.get("/getBooksbyTitle", auth, controller.getBooksbyTitle);
router.get("/getBooksbyCategory", auth, controller.getBooksbyCategory);
router.post("/createBooks", auth, controller.createBooks);
router.put("/updateBooks/:id", auth, controller.updateBooks);
router.delete("/deleteBooks/:id", auth, controller.deleteBooks);

module.exports = router;
