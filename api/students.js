const express = require("express");
const router = express.Router();
const { Student, Campus } = require("../database");

// GET a single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: Campus,
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// create a new student
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, imageUrl, gpa, campusId } = req.body;

    const newStudent = await Student.create({
      firstName,
      lastName,
      email,
      imageUrl,
      gpa,
      CampusId: campusId, 
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Failed to create student" });
  }
});

module.exports = router;
