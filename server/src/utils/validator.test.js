import assert from "assert";
import {
  normalizeAndValidateExpression,
  isValidExpression,
} from "./validator.js";

/**
 * ✅ VALID EXPRESSIONS
 */
assert.strictEqual(
  normalizeAndValidateExpression("a + b"),
  "a + b",
  "Should normalize and accept valid expression"
);

assert.strictEqual(
  normalizeAndValidateExpression(" A + B * ( C ) "),
  "a + b * ( c )",
  "Should trim spaces and convert to lowercase"
);

assert.strictEqual(
  normalizeAndValidateExpression("ø + a"),
  "ø + a",
  "Should allow special character ø"
);

/**
 * ❌ INVALID INPUT TYPE
 */
assert.throws(
  () => normalizeAndValidateExpression(123),
  (err) => err.code === "INVALID_INPUT_TYPE",
  "Should reject non-string input"
);

/**
 * ❌ EMPTY EXPRESSION
 */
assert.throws(
  () => normalizeAndValidateExpression("   "),
  (err) => err.code === "EMPTY_EXPRESSION",
  "Should reject empty expression"
);

/**
 * ❌ INVALID CHARACTERS
 */
assert.throws(
  () => normalizeAndValidateExpression("a + z"),
  (err) => err.code === "INVALID_EXPRESSION_CHARACTERS",
  "Should reject invalid letters"
);

/**
 * ❌ ONLY OPERATORS
 */
assert.throws(
  () => normalizeAndValidateExpression("++--**"),
  (err) => err.code === "ONLY_OPERATORS",
  "Should reject expressions with only operators"
);

/**
 * ❌ PARENTHESIS TOO DEEP
 */
const deepParens = "(".repeat(30) + "a" + ")".repeat(30);
assert.throws(
  () => normalizeAndValidateExpression(deepParens),
  (err) => err.code === "PARENTHESIS_TOO_DEEP",
  "Should reject deeply nested parentheses"
);

/**
 * ❌ EXPRESSION TOO LARGE
 */
const longExpr = "a+".repeat(300);
assert.throws(
  () => normalizeAndValidateExpression(longExpr),
  (err) => err.code === "EXPRESSION_TOO_LARGE",
  "Should reject very large expressions"
);

/**
 * ✅ isValidExpression helper
 */
assert.strictEqual(
  isValidExpression("a+b"),
  true,
  "isValidExpression should return true for valid input"
);

assert.strictEqual(
  isValidExpression("+++"),
  false,
  "isValidExpression should return false for invalid input"
);

console.log("✅ validator.test.js passed all tests");
