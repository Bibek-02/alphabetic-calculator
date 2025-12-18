// client/src/components/ButtonGrid.jsx
import CalcButton from "./CalcButton";

const buttons = [
  "a","b","c",
  "d","e","f",
  "g","h","i",
  "Ø","(",")",
  "/","%","^",
  "C","="
];

function ButtonGrid() {
  return (
    <div className="button-grid">
      {buttons.map(btn => (
        <CalcButton key={btn} label={btn} />
      ))}
    </div>
  );
}

export default ButtonGrid;
