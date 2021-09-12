import React, { useState, useEffect } from "react";
import CalculatorButtons from "./calculatorButtons";
import '../Calculator/styles/calculator.css';

const CalculatorOperations = {
    '/': (prevValue, nextValue) => (prevValue / nextValue).toFixed(5),
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
}

function Calculator() {
  // Setting initial values for the calculator display
  const [value, setValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [isOperatorClicked, setIsOperatorClicked] = useState(false);
  const [result, setResultValue] = useState("0");

  useEffect(() => {}, [value, operator, result]);

  // Handle input for the numbers
  const handleNumberInput = (number) => {
      if (isOperatorClicked) {
        setResultValue(String(number));
        setIsOperatorClicked(false);    
      } else {
        setResultValue(result === '0' ? String(number) : result + number);
      }
  }

  const handleOperation = (operatorValue) => {
      const inputValue = parseFloat(result);

      if (value === null) {
        setValue(inputValue);
      } else if (operator) {
          const currentValue = value || 0;
          const newValue = CalculatorOperations[operator](currentValue, inputValue)
          setValue(newValue);
          setResultValue(String(newValue));
      }

      setIsOperatorClicked(true)
      setOperator(operatorValue);
  }

  const handleDotInput = () => {
      if (!(/\./).test(result)) {
          setResultValue(result + '.');
          setIsOperatorClicked(false);
      }
  }

  const handleToggleSign = () => {
      const newValue = parseFloat(result) * -1;
      setResultValue(String(newValue));
  }

  const handlePercentageInput = () => {
      const currentValue = parseFloat(result);

      if (currentValue === 0) {
          return;
      }

      const fixedDigits = result.replace(/^-?d*\.?/, '');
      const newValue = parseFloat(result) / 100;

      setResultValue(String(newValue.toFixed(fixedDigits.length + 2)));
  }

  // Clear all data
  const clearAll = () => {
      setValue(null);
      setOperator(null);
      setResultValue("0");
  }

  return (
    <div className="calculator">
      <div className="calculator-input">
        <div className="result">{result} </div>
      </div>
      <div className="calculator-keypad">
        <div className="keys-function">
          <CalculatorButtons keyValue={"c"} onClick={clearAll} />
          <CalculatorButtons keyValue={"\xB1"} onClick={handleToggleSign} />
          <CalculatorButtons keyValue={"%"} onClick={handlePercentageInput} />
        </div>
        <div className="keys-operators">
          <CalculatorButtons keyValue={"+"} onClick={() => handleOperation('+')} />
          <CalculatorButtons keyValue={"-"} onClick={() => handleOperation('-')} />
          <CalculatorButtons keyValue={"*"} onClick={() => handleOperation('*')} />
          <CalculatorButtons keyValue={"/"} onClick={() => handleOperation('/')} />
          <CalculatorButtons keyValue={"="} onClick={() => handleOperation('=')} />
        </div>
        <div className="keys-numbers">
          <CalculatorButtons keyValue={9} onClick={handleNumberInput} />
          <CalculatorButtons keyValue={8} onClick={handleNumberInput} />
          <CalculatorButtons keyValue={7} onClick={handleNumberInput} />
          <CalculatorButtons keyValue={6} onClick={handleNumberInput} />
          <CalculatorButtons keyValue={5} onClick={handleNumberInput} />
          <CalculatorButtons keyValue={4} onClick={handleNumberInput} />
          <CalculatorButtons keyValue={3} onClick={handleNumberInput} />
          <CalculatorButtons keyValue={2} onClick={handleNumberInput} />
          <CalculatorButtons keyValue={1} onClick={handleNumberInput} />
          <CalculatorButtons
            className="key-dot"
            keyValue={"."}
            onClick={handleDotInput}
          />
          <CalculatorButtons
            className="key-zero"
            keyValue={0}
            onClick={handleNumberInput}
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;