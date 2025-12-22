// client/src/components/ButtonGrid.jsx
export default function ButtonGrid({ onInput, onClear, onEquals }) {
  const buttons = [
    "a","b","c","+",
    "d","e","f","-",
    "g","h","i","*",
    "(",")","%","/",
    "ø","^","C","="
  ];

  return (
    <div className="button-grid">
      {buttons.map((btn) => {
        if (btn === "C")
          return <button key={btn} onClick={onClear}>{btn}</button>;

        if (btn === "=")
          return <button key={btn} onClick={onEquals}>{btn}</button>;

        return (
          <button key={btn} onClick={() => onInput(btn)}>
            {btn}
          </button>
        );
      })}
    </div>
  );
}

