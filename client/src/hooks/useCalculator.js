import { useState } from "react";

const OPERATORS = ["+", "-", "*", "/", "%", "^"];

export default function useCalculator() {
  const [expression, setExpression] = useState("ø");

  const reset = () => {
    setExpression("ø");
  };

  const append = (value) => {
    value = value.toLowerCase();

    setExpression((prev) => {
      if (prev === "ø") prev = "";

      const lastChar = prev.slice(-1);

      /* ❌ Prevent starting with operator */
      if (prev.length === 0 && OPERATORS.includes(value)) {
        return prev;
      }

      /* ❌ Prevent two operators in a row */
      if (
        OPERATORS.includes(lastChar) &&
        OPERATORS.includes(value)
      ) {
        return prev;
      }

      /* ❌ Prevent closing parenthesis without opening */
      if (value === ")") {
        const openCount = (prev.match(/\(/g) || []).length;
        const closeCount = (prev.match(/\)/g) || []).length;

        if (closeCount >= openCount) return prev;
      }

      return prev + value;
    });
  };

  const handleEquals = () => {
    // Day 10+
    console.log("Expression ready:", expression);
  };

  return {
    expression,
    append,
    reset,
    handleEquals,
  };
}
