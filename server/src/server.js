// server/src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import { connectDB } from "./config/db.js";
import calcRoutes from "./routes/calcRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Global middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/calc", calcRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Alphabetic Calculator API is running",
  });
});

// Connect DB, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
