// server.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(express.json());

// ✅ Connect to MongoDB
const mongoURI = "YOUR_MONGODB_CONNECTION_STRING";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// ✅ Student Schema & Model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  marks: { type: Number, default: 0 }
});

const Student = mongoose.model("Student", studentSchema);

// ✅ Routes

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Student Management API Running 🚀</h1>");
});

// Add student
app.post("/students", async (req, res) => {
  try {
    const { name, email, course, marks } = req.body;
    if (!name || !email || !course) {
      return res.status(400).json({ message: "Name, email, and course are required" });
    }

    const student = new Student({ name, email, course, marks });
    await student.save();

    res.status(201).json({ message: "Student added successfully", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Get all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Update student marks
app.put("/students/:id", async (req, res) => {
  try {
    const { marks } = req.body;
    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    if (marks !== undefined) student.marks = marks;
    await student.save();

    res.json({ message: "Marks updated", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Delete student
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});