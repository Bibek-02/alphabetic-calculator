// server/src/utils/validator.js


// The /i flag allows uppercase letters as well; we normalize to lowercase later.
const ALLOWED_CHARS_REGEX = /^[a-iø0+\-*/%^()\s]+$/i;

/**
 * Normalize an incoming expression:
 * - Ensure it's a string
 * - Trim outer whitespace
 * - Convert to lowercase
 * - Validate allowed characters
 *
 * Returns the normalized expression or throws an Error on invalid input.
 */

function normalizeAndValidateExpression(rawInput){
    if (typeof rawInput !== "string") {
        throw new Error("Input expression must be a string");
    }
    const trimmed = rawInput.trim();
    const normalized = trimmed.toLowerCase();
    if (!ALLOWED_CHARS_REGEX.test(normalized)) {
        const error = new Error("Expression contains invalid characters. Allowed: letters a-i, ø, digits 0, operators + - * / % ^, parentheses, and spaces.");
        error.status = 400; 
        error.code = "INVALID_EXPRESSION_CHARACTERS";
        throw error;
    }
    return normalized;
}

/**
 * Simple boolean validation helper.
 * Returns true if valid, false otherwise.
 */
function isValidExpression(rawInput) {
    try {
        normalizeAndValidateExpression(rawInput);
        return true;
    } catch {
        return false;
    }
}

module.exports = {
    normalizeAndValidateExpression,
    isValidExpression,
    ALLOWED_CHARS_REGEX
}