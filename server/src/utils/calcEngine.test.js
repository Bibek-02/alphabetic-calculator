import assert from "assert";

import {
  evaluateNumericExpression,
  CalcError,
  ERR,
} from "./calcEngine.js";

function expectError(expr, code) {
  try {
    evaluateNumericExpression(expr);
    assert.fail(`Expected error ${code} but got success for: ${expr}`);
  } catch (e) {
    assert.ok(e instanceof CalcError, "Expected CalcError");
    assert.strictEqual(e.code, code, `Wrong code for: ${expr}`);
  }
}

// ✅ Simple expressions
assert.strictEqual(evaluateNumericExpression("1+2"), 3);
assert.strictEqual(evaluateNumericExpression("9-4"), 5);
assert.strictEqual(evaluateNumericExpression("2*3"), 6);
assert.strictEqual(evaluateNumericExpression("8/2"), 4);
assert.strictEqual(evaluateNumericExpression("8%3"), 2);

// ✅ Operator precedence
assert.strictEqual(evaluateNumericExpression("1+2*3"), 7);
assert.strictEqual(evaluateNumericExpression("(1+2)*3"), 9);

// ✅ Exponent precedence + right associativity
assert.strictEqual(evaluateNumericExpression("3^2"), 9);
assert.strictEqual(evaluateNumericExpression("2^3^2"), 512); // 2^(3^2)

// ✅ Mixed expressions
assert.strictEqual(
  evaluateNumericExpression("1 + 2 * (3 ^ 2)"),
  19
);

// ✅ Unary operators
assert.strictEqual(evaluateNumericExpression("-3+5"), 2);
assert.strictEqual(evaluateNumericExpression("2*-4"), -8);
assert.strictEqual(evaluateNumericExpression("-(2+1)*3"), -9);

// ❌ Invalid / error cases
expectError("", ERR.EMPTY_EXPRESSION);
expectError("   ", ERR.EMPTY_EXPRESSION);
expectError("1+", ERR.MALFORMED_EXPRESSION);
expectError("*2+1", ERR.INVALID_OPERATOR_SEQUENCE);
expectError("2(3+4)", ERR.INVALID_OPERATOR_SEQUENCE); // implicit multiplication not allowed
expectError("(1+2", ERR.UNMATCHED_PARENTHESIS);
expectError("1+2)", ERR.UNMATCHED_PARENTHESIS);
expectError("8/0", ERR.DIVISION_BY_ZERO);
expectError("8%0", ERR.DIVISION_BY_ZERO);

console.log("✅ calcEngine tests passed");
