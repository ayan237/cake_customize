import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Stepper } from "./Stepper";
import { OptionCard } from "./OptionCard";
import { CakePreview } from "./CakePreview";
import { ChevronLeft, ChevronRight, Circle, Square, Heart, ChefHat } from "lucide-react";
import { toast } from "sonner";

interface CakeSelection {
  shape: string;
  size: string;
  base: string;
  flavor: string;
  toppings: string[];
}

const steps = ["Shape", "Size", "Base", "Flavor", "Toppings", "Preview"];

const customizationData = {
  shapes: [
    {
      id: "round",
      title: "Round",
      description: "Classic circular cake shape",
      icon: <Circle className="w-8 h-8" />,
      price: 0,
      imageUrl: "https://images.unsplash.com/photo-1563912318719-4a188174bd3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3VuZCUyMGNha2V8ZW58MXx8fHwxNzU1OTY5MDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "square",
      title: "Square",
      description: "Modern square design",
      icon: <Square className="w-8 h-8" />,
      price: 5,
      imageUrl: "https://images.unsplash.com/photo-1695275677975-7e2eb9704cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcXVhcmUlMjBjYWtlfGVufDF8fHx8MTc1NTk2OTA5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "heart",
      title: "Heart",
      description: "Perfect for special occasions",
      icon: <Heart className="w-8 h-8" />,
      price: 10
    },
    {
      id: "custom",
      title: "Custom Shape",
      description: "Design your own unique shape",
      icon: <ChefHat className="w-8 h-8" />,
      price: 20
    }
  ],
  sizes: [
    { id: "small", title: "Small (6\")", description: "Serves 4-6 people", price: 25 },
    { id: "medium", title: "Medium (8\")", description: "Serves 8-10 people", price: 35 },
    { id: "large", title: "Large (10\")", description: "Serves 12-15 people", price: 45 },
    { id: "xlarge", title: "Extra Large (12\")", description: "Serves 16-20 people", price: 60 }
  ],
  bases: [
    {
      id: "sponge",
      title: "Vanilla Sponge",
      description: "Light and fluffy classic base",
      price: 0,
      imageUrl: "https://images.unsplash.com/photo-1662751381695-396624641958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwc3BvbmdlJTIwY2FrZXxlbnwxfHx8fDE3NTU4ODY1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "chocolate",
      title: "Chocolate Base",
      description: "Rich and moist chocolate foundation",
      price: 3,
      imageUrl: "https://images.unsplash.com/photo-1592962826124-56f6e78c6f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwbGF5ZXJ8ZW58MXx8fHwxNzU1OTY5MTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    { id: "red-velvet", title: "Red Velvet", description: "Luxurious red velvet with cream cheese", price: 5 },
    { id: "carrot", title: "Carrot Cake", description: "Spiced carrot with nuts and raisins", price: 4 }
  ],
  flavors: [
    { id: "vanilla", title: "Vanilla Buttercream", description: "Classic smooth vanilla frosting", price: 0 },
    { id: "chocolate", title: "Chocolate Ganache", description: "Rich dark chocolate coating", price: 3 },
    { id: "strawberry", title: "Strawberry Cream", description: "Fresh strawberry infused cream", price: 4 },
    { id: "caramel", title: "Salted Caramel", description: "Sweet and salty caramel frosting", price: 5 },
    { id: "lemon", title: "Lemon Glaze", description: "Zesty lemon with a glossy finish", price: 3 },
    { id: "cream-cheese", title: "Cream Cheese", description: "Tangy and smooth cream cheese frosting", price: 4 }
  ],
  toppings: [
    { id: "chocolate-chips", title: "Chocolate Chips", price: 2 },
    { id: "fresh-berries", title: "Fresh Berries", price: 4 },
    { id: "whipped-cream", title: "Whipped Cream", price: 3 },
    { id: "caramel-drizzle", title: "Caramel Drizzle", price: 3 },
    { id: "sprinkles", title: "Sprinkles", price: 1 },
    { id: "nuts", title: "Nuts", price: 3 },
    { id: "fresh-fruit", title: "Fresh Fruit", price: 5 },
    { id: "edible-flowers", title: "Edible Flowers", price: 8 }
  ]
};

export function CakeCustomizer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selection, setSelection] = useState<CakeSelection>({
    shape: "",
    size: "",
    base: "",
    flavor: "",
    toppings: []
  });

  const calculatePrice = (): number => {
    let total = 0;
    
    // Add shape price
    const shapeOption = customizationData.shapes.find(s => s.id === selection.shape);
    if (shapeOption) total += shapeOption.price;
    
    // Add size price
    const sizeOption = customizationData.sizes.find(s => s.id === selection.size);
    if (sizeOption) total += sizeOption.price;
    
    // Add base price
    const baseOption = customizationData.bases.find(b => b.id === selection.base);
    if (baseOption) total += baseOption.price;
    
    // Add flavor price
    const flavorOption = customizationData.flavors.find(f => f.id === selection.flavor);
    if (flavorOption) total += flavorOption.price;
    
    // Add toppings price
    selection.toppings.forEach(toppingId => {
      const topping = customizationData.toppings.find(t => t.id === toppingId);
      if (topping) total += topping.price;
    });
    
    return total;
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleToppingToggle = (toppingId: string) => {
    setSelection(prev => ({
      ...prev,
      toppings: prev.toppings.includes(toppingId)
        ? prev.toppings.filter(id => id !== toppingId)
        : [...prev.toppings, toppingId]
    }));
  };

  const handleOrderCake = () => {
    toast.success("🎂 Order placed successfully!", {
      description: `Your custom cake will be ready for pickup in 2-3 business days. Total: $${calculatePrice().toFixed(2)}`
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selection.shape !== "";
      case 2: return selection.size !== "";
      case 3: return selection.base !== "";
      case 4: return selection.flavor !== "";
      case 5: return true; // Toppings are optional
      case 6: return true; // Preview step
      default: return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customizationData.shapes.map((shape) => (
              <OptionCard
                key={shape.id}
                id={shape.id}
                title={shape.title}
                description={shape.description}
                icon={shape.icon}
                imageUrl={shape.imageUrl}
                price={shape.price}
                isSelected={selection.shape === shape.id}
                onClick={() => setSelection(prev => ({ ...prev, shape: shape.id }))}
              />
            ))}
          </div>
        );
      
      case 2:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customizationData.sizes.map((size) => (
              <OptionCard
                key={size.id}
                id={size.id}
                title={size.title}
                description={size.description}
                price={size.price}
                isSelected={selection.size === size.id}
                onClick={() => setSelection(prev => ({ ...prev, size: size.id }))}
              />
            ))}
          </div>
        );
      
      case 3:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customizationData.bases.map((base) => (
              <OptionCard
                key={base.id}
                id={base.id}
                title={base.title}
                description={base.description}
                imageUrl={base.imageUrl}
                price={base.price}
                isSelected={selection.base === base.id}
                onClick={() => setSelection(prev => ({ ...prev, base: base.id }))}
              />
            ))}
          </div>
        );
      
      case 4:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customizationData.flavors.map((flavor) => (
              <OptionCard
                key={flavor.id}
                id={flavor.id}
                title={flavor.title}
                description={flavor.description}
                price={flavor.price}
                isSelected={selection.flavor === flavor.id}
                onClick={() => setSelection(prev => ({ ...prev, flavor: flavor.id }))}
              />
            ))}
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center">
              Select your favorite toppings (optional - you can select multiple)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {customizationData.toppings.map((topping) => (
                <OptionCard
                  key={topping.id}
                  id={topping.id}
                  title={topping.title}
                  price={topping.price}
                  isSelected={selection.toppings.includes(topping.id)}
                  onClick={() => handleToppingToggle(topping.id)}
                />
              ))}
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">Perfect! Your cake is ready to order</h3>
              <p className="text-muted-foreground mb-6">
                Review your selections and place your order. We'll have your custom cake ready in 2-3 business days.
              </p>
              <Button 
                onClick={handleOrderCake}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Order Your Cake - ${calculatePrice().toFixed(2)}
                </motion.span>
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl font-bold text-foreground">Customize Your Cake</h1>
              <p className="text-muted-foreground">
                Create the perfect cake for your special occasion
              </p>
            </motion.div>

            {/* Stepper */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-primary/10">
              <Stepper currentStep={currentStep} steps={steps} />
            </Card>

            {/* Current Step Content */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-primary/10">
              <div className="space-y-6">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-semibold text-center mb-6">
                    {currentStep === 6 ? "Review & Order" : `Choose Your ${steps[currentStep - 1]}`}
                  </h2>
                  
                  <AnimatePresence mode="wait">
                    {renderCurrentStep()}
                  </AnimatePresence>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {currentStep < steps.length ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="flex items-center gap-2 bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/20"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleOrderCake}
                      className="bg-gradient-to-r from-primary to-chart-2 hover:shadow-lg hover:shadow-primary/20"
                    >
                      Order Cake
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Cake Preview Sidebar */}
          <div className="lg:col-span-1">
            <CakePreview selection={selection} totalPrice={calculatePrice()} />
          </div>
        </div>
      </div>
    </div>
  );
}