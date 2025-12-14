// server/src/utils/alphaMap.js

export const LETTER_TO_DIGIT = {
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
  "Ø": "0",
  "0": "0",
};

export const DIGIT_TO_LETTER = {
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

export function lettersToNumbers(inputString) {
  if (typeof inputString !== "string") {
    throw new TypeError("lettersToNumbers expects a string");
  }

  const normalized = inputString.toLowerCase();
  let result = "";

  for (const ch of normalized) {
    result += LETTER_TO_DIGIT[ch] ?? ch;
  }

  return result;
}

export function numbersToLetters(numberString) {
  if (typeof numberString !== "string") {
    throw new TypeError("numbersToLetters expects a string");
  }

  let result = "";

  for (const ch of numberString) {
    result += DIGIT_TO_LETTER[ch] ?? ch;
  }

  return result;
}
