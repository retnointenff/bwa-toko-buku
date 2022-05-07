const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const controller = require("./controller");

/* GET home page. */
router.get("/getTransactionList", auth, controller.getTransactionList);
router.get("/getDetailTransaction/:id", auth, controller.getDetailTransaction);

module.exports = router;
