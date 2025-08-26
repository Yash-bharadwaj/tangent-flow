import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProcessStepperProps {
  steps: string[];
  currentStep: number;
}

export function ProcessStepper({ steps, currentStep }: ProcessStepperProps) {
  return (
    <div className="py-2 px-2">
      <div className="flex items-center justify-between relative" style={{ minWidth: `${steps.length * 80}px` }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center relative" style={{ minWidth: '70px' }}>
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 z-10 ${
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : isCurrent
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-muted border-2 border-border text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <span className="text-xs font-bold">{index + 1}</span>
                )}
                
                {/* Pulsing animation for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500/20"
                    animate={{ 
                      scale: [1, 1.8, 1], 
                      opacity: [0.5, 0, 0.5] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
              
              {/* Step Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className="mt-3 text-center"
                style={{ minHeight: '32px', maxWidth: '60px' }}
              >
                <span className={`text-[10px] font-medium leading-tight block ${
                  isCompleted
                    ? "text-emerald-600"
                    : isCurrent
                    ? "text-blue-600 font-semibold"
                    : "text-muted-foreground"
                }`}>
                  {step}
                </span>
              </motion.div>
              
              {/* Connector Line - positioned absolutely behind circles */}
              {index < steps.length - 1 && (
                <div 
                  className="absolute top-4 z-0" 
                  style={{
                    left: '32px',
                    width: '38px',
                    height: '2px'
                  }}
                >
                  <div className="w-full h-full bg-border/40 rounded-full">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: index < currentStep ? "100%" : "0%" 
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: index * 0.3,
                        ease: "easeInOut"
                      }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                  
                  {/* Animated progress line for current step */}
                  {index === currentStep - 1 && (
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                      animate={{ 
                        width: ["0%", "100%"],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Moving dot animation for active progress */}
                  {index === currentStep - 1 && (
                    <motion.div
                      className="absolute top-[-1px] w-1 h-1 bg-blue-400 rounded-full"
                      animate={{
                        x: [0, 70],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}