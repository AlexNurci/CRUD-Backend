const express = require("express");
const router = express.Router();
const { Campus, Student } = require("../database");

//campus
router.get("/:id", async (req, res) => {
  try {
    const campus = await campus.findByPk(req.params.id, {
      include: Student,
    });

    if (!campus) {
      return res.status(404).json({ error: "Campus not found" });
    }

    res.json(campus);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch campus" });
  }
});


//student
const express = require("express");
const router = express.Router();
const { Student, Campus } = require("../database");

router.get("/:id", async (req, res) => {
  try {
    const student = await campus.findByPk(req.params.id, {
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

//hello