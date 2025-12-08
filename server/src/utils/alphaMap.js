// src/utils/alphaMap.js

// Map letters → digits
// a–i → 1–9, Ø/ø or 0 → 0

const LETTER_TO_DIGIT = {
  a: "1",
  b: "2",
  c: "3",
  d: "4",
  e: "5",
  f: "6",
  g: "7",
  h: "8",
  i: "9",
  "ø": "0",
  "Ø": "0", // handle uppercase Ø just in case
  "0": "0", // allow literal zero as an alias
};

// Reverse map digits → letters
// 0 → Ø by convention
const DIGIT_TO_LETTER = {
  "1": "a",
  "2": "b",
  "3": "c",
  "4": "d",
  "5": "e",
  "6": "f",
  "7": "g",
  "8": "h",
  "9": "i",
  "0": "ø",
};

/**
 * Convert an expression from letters to digits.
 * Example: "a+ø" -> "1+0"
 *
 * Non-mapped characters (operators, spaces, parentheses, etc.)
 * are passed through unchanged.
 */
function lettersToNumbers(inputString) {
  if (typeof inputString !== "string") {
    throw new TypeError("lettersToNumbers expects a string");
  }

  // Normalize to lowercase for consistent mapping
  const normalized = inputString.toLowerCase();

  let result = "";

  for (const ch of normalized) {
    if (Object.prototype.hasOwnProperty.call(LETTER_TO_DIGIT, ch)) {
      result += LETTER_TO_DIGIT[ch];
    } else {
      // Operators, spaces, parentheses etc. are kept as-is
      result += ch;
    }
  }

  return result;
}

/**
 * Convert a numeric expression back to letter form.
 * Example: "1+0" -> "a+ø"
 *
 * Non-digit characters are passed through unchanged.
 */
function numbersToLetters(numberString) {
  if (typeof numberString !== "string") {
    throw new TypeError("numbersToLetters expects a string");
  }

  let result = "";

  for (const ch of numberString) {
    if (Object.prototype.hasOwnProperty.call(DIGIT_TO_LETTER, ch)) {
      result += DIGIT_TO_LETTER[ch];
    } else {
      // Operators, spaces, parentheses etc. are kept as-is
      result += ch;
    }
  }

  return result;
}

module.exports = {
  LETTER_TO_DIGIT,
  DIGIT_TO_LETTER,
  lettersToNumbers,
  numbersToLetters,
};
