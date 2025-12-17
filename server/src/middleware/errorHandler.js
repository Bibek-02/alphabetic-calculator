// server/src/middleware/errorHandler.js
import { CalcError } from "../utils/calcEngine.js";

export function errorHandler(err, req, res, next) {
  // Known calculation errors
  if (err instanceof CalcError) {
    return res.status(400).json({
      error: {
        code: err.code,
        message: err.message
      }
    });
  }

  // Validation errors (custom)
  if (err.code === "VALIDATION_ERROR") {
    return res.status(400).json({
      error: {
        code: err.code,
        message: err.message
      }
    });
  }

  // Unknown / internal errors
  console.error(err); // log internally only

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong"
    }
  });
}
