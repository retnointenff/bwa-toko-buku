var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var authRouter = require("./app/api/auth/router");
var categoriesRouter = require("./app/api/categories/router");
var booksRouter = require("./app/api/books/router");
var uploadsRouter = require("./app/api/uploads/router");
var checkoutRouter = require("./app/api/checkout/router");
var transactionRouter = require("./app/api/transaction/router");
const URL = `/api/v1`;

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to server Toko Buku" });
});
app.use(`${URL}`, authRouter);
app.use(`${URL}`, categoriesRouter);
app.use(`${URL}`, booksRouter);
app.use(`${URL}`, uploadsRouter);
app.use(`${URL}`, checkoutRouter);
app.use(`${URL}`, transactionRouter);

module.exports = app;
