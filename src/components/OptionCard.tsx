import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Check } from "lucide-react";

interface OptionCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  price?: number;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function OptionCard({
  id,
  title,
  description,
  imageUrl,
  icon,
  price,
  isSelected,
  onClick,
  disabled = false
}: OptionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      layout
    >
      <Card
        className={`
          relative cursor-pointer border-2 transition-all duration-300 overflow-hidden
          ${isSelected 
            ? "border-primary bg-gradient-to-br from-white to-accent shadow-lg shadow-primary/20" 
            : "border-border hover:border-primary/50 hover:shadow-md"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onClick={disabled ? undefined : onClick}
      >
        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="absolute top-2 right-2 z-10 w-6 h-6 bg-gradient-to-r from-primary to-chart-2 rounded-full flex items-center justify-center shadow-lg"
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}

        <div className="p-4 space-y-3">
          {/* Image or Icon */}
          <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
            {imageUrl ? (
              <ImageWithFallback
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : icon ? (
              <motion.div
                animate={{ 
                  rotate: isSelected ? [0, 5, -5, 0] : 0,
                  scale: isSelected ? [1, 1.1, 1] : 1 
                }}
                transition={{ duration: 0.6 }}
                className="text-primary"
              >
                {icon}
              </motion.div>
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                <span className="text-2xl">🎂</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-1">
            <h3 className={`font-medium transition-colors duration-300 ${isSelected ? "text-primary" : "text-foreground"}`}>
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            )}
            {price !== undefined && (
              <motion.p
                className={`font-medium transition-colors duration-300 ${isSelected ? "text-primary" : "text-foreground"}`}
                animate={{ scale: isSelected ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                +${price.toFixed(2)}
              </motion.p>
            )}
          </div>
        </div>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-chart-2/5 opacity-0"
          whileHover={{ opacity: disabled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
}