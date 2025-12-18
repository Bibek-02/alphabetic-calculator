// client/src/components/CalculatorDisplay.jsx
function CalculatorDisplay({ value }) {
  return (
    <div className="display">
      <span className="display-text">{value || "Ø"}</span>
    </div>
  );
}

export default CalculatorDisplay;
