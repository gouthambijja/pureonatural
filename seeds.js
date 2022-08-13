const mongoose = require("mongoose");
const Product = require("./product");
mongoose
  .connect("mongodb://localhost:27017/pureOnatural", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongo connetion open!");
  })
  .catch((err) => {
    console.log("oops error!");
    console.log(err);
  });
// const p = new Product({
//   name: "papaya",
//   price: "20",
//   category: "fruit",
// });
// p.save()
//   .then(() => {
//     console.log(p);
//   })
//   .catch((err) => console.log(err));
const data = [
  {
    name: "spinach",
    price: "10",
    category: "vegetable",
  },
  {
    name: "milk",
    price: "25",
    category: "dairy",
  },
  {
    name: "paneer",
    price: "100",
    category: "dairy",
  },
  {
    name: "tomato",
    price: "35",
    category: "vegetable",
  },
];
Product.insertMany(data)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
