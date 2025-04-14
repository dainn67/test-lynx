import { createContext, useContext, useState } from '@lynx-js/react';
import type React from 'react';

interface CalculatorContextType {
  display: string;
  operator: string;
  operand: number;
}

export const CalculatorContext = createContext<
  CalculatorContextType | undefined
>(undefined);

export const CalculatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState(null);
  const [operand, setOperand] = useState(null);

  const inputDigit = (digit: string) => {
    setDisplay((prev) => (prev === '0' ? digit : prev + digit));
  };

  const clearDisplay = () => {
    setDisplay('0');
    setOperator(null);
    setOperand(null);
  };

  const chooseOperator = (op) => {
    setOperand(parseFloat(display));
    setOperator(op);
    setDisplay('0');
  };

  const calculateResult = () => {
    if (operator && operand !== null) {
      const current = parseFloat(display);
      let result;
      switch (operator) {
        case '+':
          result = operand + current;
          break;
        case '-':
          result = operand - current;
          break;
        case '*':
          result = operand * current;
          break;
        case '/':
          result = operand / current;
          break;
        default:
          return;
      }
      setDisplay(String(result));
      setOperator(null);
      setOperand(null);
    }
  };

  return (
    <CalculatorContext.Provider
      value={{
        display,
        inputDigit,
        clearDisplay,
        chooseOperator,
        calculateResult,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};
