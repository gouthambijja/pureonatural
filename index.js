require("dotenv").config();
const express = require("express");
const { rmSync } = require("fs");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect;
const Product = require("./product");
const methodOverride = require("method-override");

mongoose
  .connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connetion open!");
  })
  .catch((err) => {
    console.log("oops error!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.render("products/products", { products });
});
//requesting app
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});
//inserting new products
app.get("/products/new/product", (req, res) => {
  res.render("products/new");
});
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const product = await newProduct.save();
  res.redirect(`/products/${product._id}`);
});
//update
app.get("/products/:id/edit", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
});
app.put("/products/:id", async (req, res) => {
  console.log(req.body);
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});
//detele
app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});
app.listen(process.env.PORT || 3000, () => {
  console.log("app is listening on port 3000");
});
