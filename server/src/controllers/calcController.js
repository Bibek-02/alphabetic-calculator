// src/controllers/calcController.js
import Calculation from "../models/Calculation.js";

import {
  lettersToNumbers,
  numbersToLetters,
} from "../utils/alphaMap.js";

import {
  normalizeAndValidateExpression,
} from "../utils/validator.js";

import {
  evaluateNumericExpression,
} from "../utils/calcEngine.js";

/**
 * POST /api/calculate
 */
export async function calculate(req, res, next) {
  const { expression } = req.body;

  if (!expression) {
    const err = new Error("Expression is required");
    err.code = "EXPRESSION_REQUIRED";
    err.status = 400;
    throw err;
  }

  // 1️⃣ Normalize & validate (may throw)
  const normalized =
    normalizeAndValidateExpression(expression);

  // 2️⃣ Letters → numbers
  const numericExpression =
    lettersToNumbers(normalized);

  // 3️⃣ Safe evaluation (may throw CalcError)
  const resultNumeric =
    evaluateNumericExpression(numericExpression);

  // 4️⃣ Numbers → letters
  const resultAlphabetic =
    numbersToLetters(resultNumeric);

  // 5️⃣ Persist result
  const record = await Calculation.create({
    originalExpression: expression,
    numericExpression,
    resultNumeric,
    resultAlphabetic,
  });

  // ✅ Success response
  res.status(200).json({
    originalExpression: record.originalExpression,
    numericExpression: record.numericExpression,
    resultNumeric: record.resultNumeric,
    resultAlphabetic: record.resultAlphabetic,
  });
}
