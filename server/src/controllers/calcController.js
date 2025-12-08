// src/controllers/calcController.js

import { lettersToNumbers, numbersToLetters } from "../utils/alphaMap";

import { normalizeAndValidateExpression } from "../utils/validator";

// Placeholder safe evaluator – DO NOT use eval() directly.
// Later you’ll replace this with a proper math parser.
function evaluateNumericExpression(expr) {
  // TODO: integrate a safe math library like 'mathjs'
  // For now, just throw so you don't accidentally use eval.
  const error = new Error("Numeric evaluation not implemented yet");
  error.code = "EVAL_NOT_IMPLEMENTED";
  throw error;
}

async function calculate(req, res, next) {
  try {
    const { expression } = req.body;

    // 1. Normalize and validate letters-based expression
    const normalizedExpression = normalizeAndValidateExpression(expression);

    // 2. Convert to numeric expression
    const numericExpression = lettersToNumbers(normalizedExpression);

    // 3. Evaluate numeric expression (placeholder for now)
    const result = evaluateNumericExpression(numericExpression);

    // 4. (Optional) convert result back to letters
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
    // Pass to Express error middleware
    next(err);
  }
}

export default {
  calculate,
};
