const express = require("express");
const app = express();
const PORT = 3000;

// Function to get current date & time
function getDateTime() {
  return new Date().toLocaleString();
}

// Home Route
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to My Website</h1>
    <p>Date & Time: ${getDateTime()}</p>
  `);
});

// About Route
app.get("/about", (req, res) => {
  res.send(`
    <h1>About Us</h1>
    <p>This is about page</p>
    <p>${getDateTime()}</p>
  `);
});

// Services Route
app.get("/services", (req, res) => {
  res.send(`
    <h1>Our Services</h1>
    <ul>
      <li>Web Development</li>
      <li>AI Solutions</li>
      <li>Cloud Services</li>
    </ul>
    <p>${getDateTime()}</p>
  `);
});

// Contact Route
app.get("/contact", (req, res) => {
  res.send(`
    <h1>Contact Us</h1>
    <p>Email: example@gmail.com</p>
    <p>${getDateTime()}</p>
  `);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});