// src/App.jsx
import CalculatorDisplay from "./components/CalculatorDisplay.jsx";
import ButtonGrid from "./components/ButtonGrid.jsx";
import "./styles/calculator.css";

function App() {
  return (
    <div className="app">
      <div className="calculator">
        <CalculatorDisplay value="abc" />
        <ButtonGrid />
      </div>
    </div>
  );
}

export default App;
