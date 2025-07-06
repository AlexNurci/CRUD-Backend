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
    // Destructure from req.body
    let { firstName, lastName, email, imageUrl, gpa, CampusId } = req.body;

    // Optionally: parse CampusId if it's coming as a string
    CampusId = parseFloat(CampusId);

    const newStudent = await Student.create({
      firstName,
      lastName,
      email,
      imageUrl,
      gpa,
      CampusId,
    });

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Failed to create student" });
  }
});

<<<<<<< Updated upstream
=======

//PUT, edit an existing student
router.put("/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).send("Student not found");

    await student.update(req.body);
    res.json(student);
  } catch (err) {
    next(err);
  }
});

>>>>>>> Stashed changes
//Delete student by ID
router.delete("/:id", async (req, res) => {
  console.log("DELETE /api/students/:id", req.params.id); 
  try {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    await student.destroy(); // Remove the student from the database
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});


module.exports = router;