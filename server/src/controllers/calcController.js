// server/src/controllers/calcController.js
import {
  lettersToNumbers,
  numbersToLetters,
} from "../utils/alphaMap.js";

import {
  normalizeAndValidateExpression,
} from "../utils/validator.js";

// Placeholder safe evaluator – DO NOT use eval()
function evaluateNumericExpression(expr) {
  const error = new Error("Numeric evaluation not implemented yet");
  error.code = "EVAL_NOT_IMPLEMENTED";
  throw error;
}

export async function calculate(req, res, next) {
  try {
    const { expression } = req.body;

    const normalizedExpression =
      normalizeAndValidateExpression(expression);

    const numericExpression =
      lettersToNumbers(normalizedExpression);

    const result =
      evaluateNumericExpression(numericExpression);

    const resultInLetters =
      typeof result === "number"
        ? numbersToLetters(String(result))
        : null;

    res.json({
      ok: true,
      expression: normalizedExpression,
      numericExpression,
      result,
      resultInLetters,
    });
  } catch (err) {
    next(err);
  }
}
