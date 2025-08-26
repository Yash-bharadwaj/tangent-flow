import { motion } from "framer-motion";
import { Check } from "lucide-react";
import React from "react";

interface ProcessStepperProps {
  steps: string[];
  currentStep: number;
}

export function ProcessStepper({ steps, currentStep }: ProcessStepperProps) {
  return (
    <div className="py-2 px-2">
      <div className="flex items-center" style={{ minWidth: `${steps.length * 80}px` }}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center relative" style={{ minWidth: '70px' }}>
                {/* Step Circle */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-500 z-10 ${
                    isCompleted
                      ? "bg-emerald-500 text-white shadow-md"
                      : isCurrent
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-200 border-2 border-gray-300 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <span className="text-[10px] font-bold">{index + 1}</span>
                  )}
                  
                  {/* Pulsing animation for current step */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/20"
                      animate={{ 
                        scale: [1, 1.6, 1], 
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="mt-2 text-center"
                  style={{ minHeight: '28px', maxWidth: '58px' }}
                >
                  <span className={`text-[9px] font-medium leading-tight block ${
                    isCompleted
                      ? "text-emerald-600"
                      : isCurrent
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}>
                    {step}
                  </span>
                </motion.div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center h-7 px-1">
                  <div className="w-full h-[2px] bg-gray-200 relative">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: index < currentStep ? "100%" : "0%" 
                      }}
                      transition={{ 
                        duration: 1.0, 
                        delay: index * 0.2,
                        ease: "easeInOut"
                      }}
                      className="h-full bg-emerald-500"
                    />
                    
                    {/* Animated progress line for current step */}
                    {index === currentStep - 1 && (
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-blue-500"
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
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}