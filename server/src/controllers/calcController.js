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

export async function calculate(req, res) {
  try {
    const { expression } = req.body;

    if (!expression) {
      return res.status(400).json({
        success: false,
        error: "EXPRESSION_REQUIRED",
      });
    }

    // 1. Normalize & validate
    const normalized =
      normalizeAndValidateExpression(expression);

    // 2. Letters → numbers
    const numericExpression =
      lettersToNumbers(normalized);

    // 3. SAFE evaluation (your engine)
    const resultNumeric =
      evaluateNumericExpression(numericExpression);

    // 4. Numbers → letters
    const resultAlphabetic =
      numbersToLetters(resultNumeric);

    // 5. Save to DB
    const record = await Calculation.create({
      originalExpression: expression,
      numericExpression,
      resultNumeric,
      resultAlphabetic,
    });

    return res.status(200).json({
      originalExpression: record.originalExpression,
      numericExpression: record.numericExpression,
      resultNumeric: record.resultNumeric,
      resultAlphabetic: record.resultAlphabetic,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.code || err.message || "CALCULATION_FAILED",
    });
  }
}
