import dotenv from "dotenv";
dotenv.config();

// Import required modules
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after DB connection is established
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

// Route handlers
// Authentication routes (signup/login)
app.use("/api/auth", authRoutes);

// Project management routes
app.use("/api/projects", projectRoutes);

// Task management routes
app.use("/api/tasks", taskRoutes);

// Root endpoint for health check
app.get("/", (req, res) => {
  res.send("Mini Project Manager API");
});
