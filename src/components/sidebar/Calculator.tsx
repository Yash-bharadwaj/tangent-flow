
import { useState } from "react";
import { Calculator as CalculatorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type CalculatorButton = {
  value: string;
  label: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
};

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const buttons: CalculatorButton[] = [
    { value: "7", label: "7", variant: "outline" },
    { value: "8", label: "8", variant: "outline" },
    { value: "9", label: "9", variant: "outline" },
    { value: "÷", label: "÷", variant: "secondary" },
    { value: "4", label: "4", variant: "outline" },
    { value: "5", label: "5", variant: "outline" },
    { value: "6", label: "6", variant: "outline" },
    { value: "×", label: "×", variant: "secondary" },
    { value: "1", label: "1", variant: "outline" },
    { value: "2", label: "2", variant: "outline" },
    { value: "3", label: "3", variant: "outline" },
    { value: "-", label: "-", variant: "secondary" },
    { value: "0", label: "0", variant: "outline" },
    { value: ".", label: ".", variant: "outline" },
    { value: "=", label: "=", variant: "default" },
    { value: "+", label: "+", variant: "secondary" },
    { value: "C", label: "C", variant: "destructive", className: "col-span-2" },
    { value: "⌫", label: "⌫", variant: "destructive", className: "col-span-2" },
  ];

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "C":
        setDisplay("0");
        setOperation(null);
        setPrevValue(null);
        setResetDisplay(false);
        break;
      case "⌫":
        if (display.length === 1) {
          setDisplay("0");
        } else {
          setDisplay(display.slice(0, -1));
        }
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        setOperation(value);
        setPrevValue(parseFloat(display));
        setResetDisplay(true);
        break;
      case "=":
        if (operation && prevValue !== null) {
          let result = 0;
          switch (operation) {
            case "+":
              result = prevValue + parseFloat(display);
              break;
            case "-":
              result = prevValue - parseFloat(display);
              break;
            case "×":
              result = prevValue * parseFloat(display);
              break;
            case "÷":
              if (parseFloat(display) === 0) {
                setDisplay("Error");
                setResetDisplay(true);
                return;
              }
              result = prevValue / parseFloat(display);
              break;
          }
          setDisplay(result.toString());
          setOperation(null);
          setPrevValue(null);
          setResetDisplay(true);
        }
        break;
      case ".":
        if (resetDisplay) {
          setDisplay("0.");
          setResetDisplay(false);
        } else if (!display.includes(".")) {
          setDisplay(display + ".");
        }
        break;
      default:
        if (display === "0" || resetDisplay) {
          setDisplay(value);
          setResetDisplay(false);
        } else {
          setDisplay(display + value);
        }
        break;
    }
  };

  return (
    <div className="p-3 bg-sidebar-accent/30 rounded-md">
      <div className="flex items-center gap-2 mb-2">
        <CalculatorIcon className="h-4 w-4 text-sidebar-foreground/70" />
        <span className="text-xs font-medium text-sidebar-foreground/70">Calculator</span>
      </div>

      <div className="bg-background border border-border rounded-md p-2 mb-2 text-right font-mono">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant || "outline"}
            className={`h-8 text-xs font-medium ${button.className || ""}`}
            onClick={() => handleButtonClick(button.value)}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
