const express = require("express");
const app = express();
const PORT = 5000;

console.log("NEW CODE RUNNING");

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Student API Server Running 🚀</h1>");
});

// Data
let students = [
  { id: 1, name: "Sara", course: "AI" },
  { id: 2, name: "Amit", course: "FullStack" },
  { id: 3, name: "Riya", course: "DataScience" }
];

// ✅ Get all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// ✅ Get student by ID
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// ✅ Add student
app.post("/students/add", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({ message: "Name and course required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});