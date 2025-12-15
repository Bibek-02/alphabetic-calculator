import Calculation from "../models/Calculation.js";

export async function getHistory(req, res) {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;

    const history = await Calculation.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "FAILED_TO_FETCH_HISTORY",
    });
  }
}
