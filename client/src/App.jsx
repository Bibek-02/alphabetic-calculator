// src/App.jsx
import CalculatorDisplay from "./components/CalculatorDisplay.jsx";
import ButtonGrid from "./components/ButtonGrid.jsx";
import useCalculator from "./hooks/useCalculator.js";
import "./styles/calculator.css";

function App() {
   const {
    expression,
    append,
    reset,
    handleEquals,
  } = useCalculator();

 
  return (
    <div className="calculator">
      <CalculatorDisplay value={expression} />
      <ButtonGrid
        onInput={append}
        onClear={reset}
        onEquals={handleEquals}
      />
    </div>
  );
}

export default App;
