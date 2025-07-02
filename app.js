// Load environment variables
require("dotenv").config();

// Import packages
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

// Import your API router and database
const apiRouter = require("./api");
const { db } = require("./database");

// Create the Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json()); // parse JSON request bodies
app.use(cors());         // allow requests from all origins
app.use(morgan("dev"));  // log requests to the console

// Serve static files from public/
app.use(express.static(path.join(__dirname, "public")));

// Mount API routes at /api
app.use("/api", apiRouter);

// Fallback route (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack CRUD API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).send("Something broke!");
});

// Start the server and connect to the database
const runApp = async () => {
  try {
    await db.sync(); // sync models to DB
    console.log("✅ Connected to the database");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
  }
};

runApp();

module.exports = app;
