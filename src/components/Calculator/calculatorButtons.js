import React from "react";
import '../Calculator/styles/calculatorButtons.css';

function CalculatorButtons(props) {
  return (
    <button
      className={`${props.className}`}
      onClick={() => props.onClick(props.keyValue)}
    >
      {props.keyValue}{" "}
    </button>
  );
}

export default CalculatorButtons;