import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProcessStepperProps {
  steps: string[];
  currentStep: number;
}

export function ProcessStepper({ steps, currentStep }: ProcessStepperProps) {
  return (
    <div className="flex items-center gap-2 py-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;
        
        return (
          <div key={step} className="flex items-center">
            {/* Step Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isCurrent
                  ? "bg-primary text-primary-foreground animate-pulse"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <Check className="w-3 h-3" />
                </motion.div>
              ) : (
                <span className="text-[10px] font-bold">{index + 1}</span>
              )}
              
              {/* Pulsing animation for current step */}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/30"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
            
            {/* Step Label */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
              className="absolute mt-8 -ml-2 w-12"
            >
              <span className={`text-[9px] font-medium leading-tight block text-center ${
                isCompleted
                  ? "text-green-600"
                  : isCurrent
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}>
                {step}
              </span>
            </motion.div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 relative">
                <div className="h-0.5 bg-muted rounded-full">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: index < currentStep ? "100%" : "0%" 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
                
                {/* Animated progress for current connecting line */}
                {index === currentStep - 1 && (
                  <motion.div
                    className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-green-500 to-primary rounded-full"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}