// src/utils/alphaMap.test.js

const assert = require("assert");
const {
  lettersToNumbers,
  numbersToLetters,
} = require("./alphaMap");
const {
  normalizeAndValidateExpression,
  isValidExpression,
} = require("./validator");

// --- lettersToNumbers tests ---

// Basic mapping
assert.strictEqual(lettersToNumbers("abc"), "123");
assert.strictEqual(lettersToNumbers("i"), "9");

// Ø and 0
assert.strictEqual(lettersToNumbers("ø"), "0");
assert.strictEqual(lettersToNumbers("Ø"), "0");
assert.strictEqual(lettersToNumbers("0"), "0");

// Mixed expression with operators and spaces
assert.strictEqual(
  lettersToNumbers("a + b * c"),
  "1 + 2 * 3"
);

// Already lowercase enforced
assert.strictEqual(
  lettersToNumbers("A + Ø"),
  "1 + 0"
);

// --- numbersToLetters tests ---

assert.strictEqual(numbersToLetters("123"), "abc");
assert.strictEqual(numbersToLetters("9"), "i");
assert.strictEqual(numbersToLetters("0"), "ø");

// Mixed numeric expression
assert.strictEqual(
  numbersToLetters("1+2*3"),
  "a+b*c"
);

// --- validator tests ---

// Valid expressions
assert.strictEqual(
  normalizeAndValidateExpression("A + B * C"),
  "a + b * c"
);

assert.ok(isValidExpression("a + b - c"));
assert.ok(isValidExpression("ø + a"));
assert.ok(isValidExpression("0 + a")); // if you allow literal 0

// Invalid expressions
assert.strictEqual(isValidExpression("j + a"), false);
assert.strictEqual(isValidExpression("1 + 2"), false); // digits other than 0
assert.strictEqual(isValidExpression("a & b"), false);

try {
  normalizeAndValidateExpression("z + a");
  assert.fail("Expected error for invalid characters");
} catch (err) {
  assert.strictEqual(err.code, "INVALID_EXPRESSION_CHARACTERS");
}

console.log("All alphaMap / validator tests passed!");
