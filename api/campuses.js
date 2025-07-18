const express = require("express");
const router = express.Router();
const { Campus, Student } = require("../database");

// GET /api/campuses/:id - Get campus by ID including students
router.get("/:id", async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id, {
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

// GET /api/campuses - Get all campuses
router.get("/", async (req, res) => {
  try {
    const campuses = await Campus.findAll();
    res.json(campuses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch campuses" });
  }
});

// POST /api/campuses - Create a new campus
router.post("/", async (req, res) => {
  try {
    const { campusName, address, image, description, students } = req.body;
    console.log(req.body);
    const newCampus = await Campus.create({
        campusName,
        address,
        students,
        image,
        description,
    });

    res.status(201).json(newCampus);
  } catch (error) {
    console.error("Error creating campus:", error);
    res.status(500).json({ error: "Failed to create campus" });
  }
});


//PUT, edit an existing campus
router.put("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) return res.status(404).send("Campus not found");

    await campus.update(req.body);
    res.json(campus);
  } catch (err) {
    next(err);
  }
});

// Delete campus by ID
router.delete("/:id", async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);

    if (!campus) {
      return res.status(404).json({ error: "Campus not found" });
    }

    await campus.destroy(); // Remove the campus from the database
    res.json({ message: "Campus deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete campus" });
  }
});





module.exports = router;