import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Cake } from "lucide-react";

export function Header() {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white/80 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl">
              <Cake className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl text-foreground">CakeCraft</span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {["Home", "About", "Order Now"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Button 
                  variant={item === "Order Now" ? "default" : "ghost"}
                  size="sm"
                  className={`
                    relative overflow-hidden transition-all duration-300
                    ${item === "Order Now" 
                      ? "bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/20" 
                      : "hover:bg-secondary/50"
                    }
                  `}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {item}
                  </motion.span>
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}