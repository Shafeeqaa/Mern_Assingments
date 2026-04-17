// server.js
const express = require("express");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = 2000;

// Middleware
app.use(express.json()); // parse JSON
app.use(morgan("dev"));  // logger

// API Routes
app.use("/products", productRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Product Management MVC API Running 🚀</h1>");
});

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});