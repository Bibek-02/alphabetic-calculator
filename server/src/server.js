// server/src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import { connectDB } from "./config/db.js";
import calcRoutes from "./routes/calcRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";


// Load environment variables
dotenv.config();

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", calcRoutes);
app.use("/api", historyRoutes);



// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Alphabetic Calculator API is running",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connect DB, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
