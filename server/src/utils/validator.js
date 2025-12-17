// server/src/utils/validator.js

export const ALLOWED_CHARS_REGEX = /^[a-iø0+\-*/%^()\s]+$/i;

const MAX_LENGTH = 500;
const MAX_PAREN_DEPTH = 25;

function validationError(code, message) {
  const err = new Error(message);
  err.code = code;
  err.status = 400;
  return err;
}

export function normalizeAndValidateExpression(rawInput) {
  if (typeof rawInput !== "string") {
    throw validationError(
      "INVALID_INPUT_TYPE",
      "Input expression must be a string"
    );
  }

  const normalized = rawInput.trim().toLowerCase();

  if (!normalized) {
    throw validationError(
      "EMPTY_EXPRESSION",
      "Expression cannot be empty"
    );
  }

  if (normalized.length > MAX_LENGTH) {
    throw validationError(
      "EXPRESSION_TOO_LARGE",
      "Expression is too long"
    );
  }

  if (!ALLOWED_CHARS_REGEX.test(normalized)) {
    throw validationError(
      "INVALID_EXPRESSION_CHARACTERS",
      "Expression contains invalid characters"
    );
  }

  // 🚫 Only operators (no values)
  if (!/[a-iø0]/.test(normalized)) {
    throw validationError(
      "ONLY_OPERATORS",
      "Expression must contain at least one value"
    );
  }

  // 🧠 Parentheses depth check
  let depth = 0;
  for (const char of normalized) {
    if (char === "(") depth++;
    if (char === ")") depth--;
    if (depth > MAX_PAREN_DEPTH) {
      throw validationError(
        "PARENTHESIS_TOO_DEEP",
        "Expression nesting is too deep"
      );
    }
  }

  return normalized;
}

/**
 * Boolean helper
 */
export function isValidExpression(rawInput) {
  try {
    normalizeAndValidateExpression(rawInput);
    return true;
  } catch {
    return false;
  }
}
