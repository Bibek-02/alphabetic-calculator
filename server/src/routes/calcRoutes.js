// server/src/routes/calcRoutes.js
import express from "express";
import { calculate } from "../controllers/calcController.js";

const router = express.Router();

router.post("/calculate", calculate);

export default router;
