// server.js
const express = require("express");
const app = express();
const PORT = 4000;

// Middleware to parse JSON
app.use(express.json());

// Sample Data
let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 }
];

// Home Route
app.get("/", (req, res) => {
  res.send("<h1>Product API Server Running 🚀</h1>");
});

// ✅ GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// ✅ GET product by ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// ✅ POST new product
app.post("/products", (req, res) => {
  // Safety check for missing body
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body missing" });
  }

  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price required" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct
  });
});

// ✅ PUT update product
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (name) product.name = name;
  if (price) product.price = price;

  res.json({
    message: "Product updated successfully",
    product
  });
});

// ✅ DELETE product
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(index, 1)[0];

  res.json({
    message: "Product deleted successfully",
    product: deletedProduct
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});