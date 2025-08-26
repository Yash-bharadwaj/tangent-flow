import { motion } from "framer-motion";
import { Check } from "lucide-react";
import React from "react";

interface ProcessStepperProps {
  steps: string[];
  currentStep: number;
}

export function ProcessStepper({ steps, currentStep }: ProcessStepperProps) {
  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between relative">
        {/* Connector Line Base */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border -z-10">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ 
              width: `${(currentStep / (steps.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isActive = index <= currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border-2 border-border text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <span className="text-[10px] font-medium">{index + 1}</span>
                )}
              </motion.div>
              
              {/* Step Label */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 + 0.1 }}
                className="mt-1 text-center max-w-[60px]"
              >
                <span className={`text-[9px] font-medium leading-tight ${
                  isActive 
                    ? "text-foreground" 
                    : "text-muted-foreground"
                }`}>
                  {step}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}