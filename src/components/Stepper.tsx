import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-chart-2"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <motion.div
              key={step}
              className="flex flex-col items-center gap-2 relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Step circle */}
              <motion.div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                  ${isCompleted 
                    ? "bg-gradient-to-r from-primary to-chart-2 border-primary text-white" 
                    : isCurrent 
                    ? "bg-white border-primary text-primary shadow-lg shadow-primary/20" 
                    : "bg-white border-muted-foreground/30 text-muted-foreground"
                  }
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.span
                    className="text-sm font-medium"
                    animate={{ 
                      scale: isCurrent ? [1, 1.1, 1] : 1,
                      color: isCurrent ? ["#d97d4c", "#f4a261", "#d97d4c"] : undefined
                    }}
                    transition={{ 
                      duration: isCurrent ? 2 : 0,
                      repeat: isCurrent ? Infinity : 0
                    }}
                  >
                    {stepNumber}
                  </motion.span>
                )}
              </motion.div>

              {/* Step label */}
              <motion.span
                className={`
                  text-xs font-medium text-center transition-all duration-300 hidden sm:block
                  ${isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"}
                `}
                animate={{ 
                  scale: isCurrent ? 1.05 : 1,
                  y: isCurrent ? -2 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {step}
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}