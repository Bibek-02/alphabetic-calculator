// server/src/utils/calcEngine.js
/**
 * Calc Engine (Safe Expression Evaluator)
 * Input: validated numeric expression string like: "1 + 2 * (3 ^ 2)"
 * Output: number (JS Number)
 */

export class CalcError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "CalcError";
    this.code = code;
  }
}

export const ERR = {
  EMPTY_EXPRESSION: "EMPTY_EXPRESSION",
  MALFORMED_EXPRESSION: "MALFORMED_EXPRESSION",
  INVALID_TOKEN: "INVALID_TOKEN",
  INVALID_OPERATOR_SEQUENCE: "INVALID_OPERATOR_SEQUENCE",
  UNMATCHED_PARENTHESIS: "UNMATCHED_PARENTHESIS",
  DIVISION_BY_ZERO: "DIVISION_BY_ZERO",
};

const OPERATORS = {
  "+": { prec: 1, assoc: "L", arity: 2 },
  "-": { prec: 1, assoc: "L", arity: 2 },
  "*": { prec: 2, assoc: "L", arity: 2 },
  "/": { prec: 2, assoc: "L", arity: 2 },
  "%": { prec: 2, assoc: "L", arity: 2 },
  "^": { prec: 3, assoc: "R", arity: 2 },

  // Internal unary operators
  "u+": { prec: 4, assoc: "R", arity: 1 },
  "u-": { prec: 4, assoc: "R", arity: 1 },
};

function isOperator(tok) {
  return Object.prototype.hasOwnProperty.call(OPERATORS, tok);
}

function isNumberToken(tok) {
  return typeof tok === "number" && Number.isFinite(tok);
}

/**
 * Tokenizer
 */
export function tokenize(expr) {
  const s = expr.replace(/\s+/g, "");
  if (!s) {
    throw new CalcError(ERR.EMPTY_EXPRESSION, "Expression is empty.");
  }

  const tokens = [];
  let i = 0;
  let expectingValue = true;

  while (i < s.length) {
    const ch = s[i];

    // Number
    if (/\d/.test(ch) || ch === ".") {
      if (!expectingValue) {
        throw new CalcError(
          ERR.INVALID_OPERATOR_SEQUENCE,
          "Missing operator between values."
        );
      }

      let start = i;
      let dotCount = 0;

      while (i < s.length && /[\d.]/.test(s[i])) {
        if (s[i] === ".") dotCount++;
        if (dotCount > 1) {
          throw new CalcError(ERR.INVALID_TOKEN, "Invalid number format.");
        }
        i++;
      }

      const raw = s.slice(start, i);
      const num = Number(raw);

      if (!Number.isFinite(num)) {
        throw new CalcError(ERR.INVALID_TOKEN, `Invalid number: ${raw}`);
      }

      tokens.push(num);
      expectingValue = false;
      continue;
    }

    // Parentheses
    if (ch === "(") {
      if (!expectingValue) {
        throw new CalcError(
          ERR.INVALID_OPERATOR_SEQUENCE,
          "Missing operator before '('."
        );
      }
      tokens.push(ch);
      expectingValue = true;
      i++;
      continue;
    }

    if (ch === ")") {
      if (expectingValue) {
        throw new CalcError(
          ERR.MALFORMED_EXPRESSION,
          "Empty or malformed parentheses."
        );
      }
      tokens.push(ch);
      expectingValue = false;
      i++;
      continue;
    }

    // Operators
    if ("+-*/%^".includes(ch)) {
      if (expectingValue) {
        if (ch === "+" || ch === "-") {
          tokens.push(ch === "+" ? "u+" : "u-");
          i++;
          continue;
        }
        throw new CalcError(
          ERR.INVALID_OPERATOR_SEQUENCE,
          `Operator '${ch}' cannot appear here.`
        );
      }

      tokens.push(ch);
      expectingValue = true;
      i++;
      continue;
    }

    throw new CalcError(ERR.INVALID_TOKEN, `Unexpected character: ${ch}`);
  }

  if (expectingValue) {
    throw new CalcError(
      ERR.MALFORMED_EXPRESSION,
      "Expression ends with an operator."
    );
  }

  return tokens;
}

/**
 * Shunting-yard: infix → RPN
 */
export function toRpn(tokens) {
  const output = [];
  const ops = [];

  for (const tok of tokens) {
    if (isNumberToken(tok)) {
      output.push(tok);
      continue;
    }

    if (tok === "(") {
      ops.push(tok);
      continue;
    }

    if (tok === ")") {
      let found = false;
      while (ops.length) {
        const top = ops.pop();
        if (top === "(") {
          found = true;
          break;
        }
        output.push(top);
      }
      if (!found) {
        throw new CalcError(ERR.UNMATCHED_PARENTHESIS, "Unmatched ')'.");
      }
      continue;
    }

    if (isOperator(tok)) {
      const { prec: p1, assoc } = OPERATORS[tok];

      while (ops.length) {
        const top = ops[ops.length - 1];
        if (!isOperator(top)) break;

        const { prec: p2 } = OPERATORS[top];
        if ((assoc === "L" && p1 <= p2) || (assoc === "R" && p1 < p2)) {
          output.push(ops.pop());
        } else break;
      }

      ops.push(tok);
      continue;
    }

    throw new CalcError(ERR.INVALID_TOKEN, `Invalid token: ${tok}`);
  }

  while (ops.length) {
    const top = ops.pop();
    if (top === "(") {
      throw new CalcError(ERR.UNMATCHED_PARENTHESIS, "Unmatched '('.");
    }
    output.push(top);
  }

  return output;
}

/**
 * Evaluate RPN
 */
export function evalRpn(rpn) {
  const stack = [];

  for (const tok of rpn) {
    if (isNumberToken(tok)) {
      stack.push(tok);
      continue;
    }

    if (!isOperator(tok)) {
      throw new CalcError(ERR.INVALID_TOKEN, `Invalid RPN token: ${tok}`);
    }

    const { arity } = OPERATORS[tok];

    if (arity === 1) {
      if (stack.length < 1) {
        throw new CalcError(ERR.MALFORMED_EXPRESSION, "Malformed expression.");
      }
      const a = stack.pop();
      stack.push(tok === "u-" ? -a : +a);
      continue;
    }

    if (stack.length < 2) {
      throw new CalcError(ERR.MALFORMED_EXPRESSION, "Malformed expression.");
    }

    const b = stack.pop();
    const a = stack.pop();

    let res;
    switch (tok) {
      case "+": res = a + b; break;
      case "-": res = a - b; break;
      case "*": res = a * b; break;
      case "/":
        if (b === 0) throw new CalcError(ERR.DIVISION_BY_ZERO, "Division by zero.");
        res = a / b;
        break;
      case "%":
        if (b === 0) throw new CalcError(ERR.DIVISION_BY_ZERO, "Modulus by zero.");
        res = a % b;
        break;
      case "^": res = Math.pow(a, b); break;
      default:
        throw new CalcError(ERR.INVALID_TOKEN, `Unknown operator: ${tok}`);
    }

    if (!Number.isFinite(res)) {
      throw new CalcError(ERR.MALFORMED_EXPRESSION, "Result is not finite.");
    }

    stack.push(res);
  }

  if (stack.length !== 1) {
    throw new CalcError(ERR.MALFORMED_EXPRESSION, "Malformed expression.");
  }

  return stack[0];
}

/**
 * Public API
 */
export function evaluateNumericExpression(validNumericExpression) {
  const tokens = tokenize(validNumericExpression);
  const rpn = toRpn(tokens);
  return evalRpn(rpn);
}
