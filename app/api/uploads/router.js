const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const controller = require("./controller");
const upload = require("../../middlewares/multer");

/* GET home page. */
router.post("/uploads", auth, upload.single("image"), controller.uploadImage);

module.exports = router;
