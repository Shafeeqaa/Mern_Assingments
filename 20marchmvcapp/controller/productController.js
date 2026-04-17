// controllers/productController.js
const products = require("../models/productModel");

// ✅ Get all products
const getAllProducts = (req, res) => {
  res.json(products);
};

// ✅ Get product by ID
const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

// ✅ Add new product
const addProduct = (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category
  };

  products.push(newProduct);
  res.status(201).json({ message: "Product added successfully", product: newProduct });
};

module.exports = { getAllProducts, getProductById, addProduct };