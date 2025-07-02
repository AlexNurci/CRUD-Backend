const express = require("express");
const router = express.Router();

// Import routers
const ducksRouter = require("./ducks");
const campusesRouter = require("./campuses");
const studentsRouter = require("./students");

// Mount routers
router.use("/ducks", ducksRouter);
router.use("/campuses", campusesRouter);
router.use("/students", studentsRouter);

module.exports = router;