
import { useState } from "react";
import { Calculator as CalculatorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const result = calculate(prevValue, inputValue, operator);
      setDisplay(String(result));
      setPrevValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (!operator || prevValue === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(prevValue, inputValue, operator);
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  return (
    <div className="p-3 bg-sidebar-accent/30 rounded-md">
      <div className="flex items-center gap-2 mb-2">
        <CalculatorIcon className="h-4 w-4 text-sidebar-foreground/70" />
        <span className="text-xs font-medium text-sidebar-foreground/70">Calculator</span>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <div className="bg-background p-2 rounded border text-right font-mono">
          {display}
        </div>
        
        <div className="grid grid-cols-4 gap-1">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={clearAll}
            className="h-7 text-xs font-medium"
          >
            C
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => performOperation("÷")}
            className="h-7 text-xs font-medium"
          >
            ÷
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => performOperation("×")}
            className="h-7 text-xs font-medium"
          >
            ×
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => performOperation("-")}
            className="h-7 text-xs font-medium"
          >
            -
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("7")}
            className="h-7 text-xs font-medium"
          >
            7
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("8")}
            className="h-7 text-xs font-medium"
          >
            8
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("9")}
            className="h-7 text-xs font-medium"
          >
            9
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => performOperation("+")}
            className="h-7 text-xs font-medium"
          >
            +
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("4")}
            className="h-7 text-xs font-medium"
          >
            4
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("5")}
            className="h-7 text-xs font-medium"
          >
            5
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("6")}
            className="h-7 text-xs font-medium"
          >
            6
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleEquals}
            className="h-7 text-xs font-medium row-span-2"
          >
            =
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("1")}
            className="h-7 text-xs font-medium"
          >
            1
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("2")}
            className="h-7 text-xs font-medium"
          >
            2
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("3")}
            className="h-7 text-xs font-medium"
          >
            3
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => inputDigit("0")}
            className="h-7 text-xs font-medium col-span-2"
          >
            0
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={inputDot}
            className="h-7 text-xs font-medium"
          >
            .
          </Button>
        </div>
      </div>
    </div>
  );
}
