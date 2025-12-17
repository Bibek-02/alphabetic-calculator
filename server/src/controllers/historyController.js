// src/controllers/historyController.js
import Calculation from "../models/Calculation.js";

/**
 * GET /api/history
 */
export async function getHistory(req, res) {
  const limitRaw = req.query.limit;
  const limit = parseInt(limitRaw, 10) || 10;

  if (limit < 1 || limit > 50) {
    const err = new Error("Limit must be between 1 and 50");
    err.code = "INVALID_LIMIT";
    err.status = 400;
    throw err;
  }

  const history = await Calculation.find()
    .sort({ createdAt: -1 })
    .limit(limit);

  res.status(200).json({
    count: history.length,
    data: history,
  });
}
