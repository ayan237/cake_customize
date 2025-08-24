import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CakeSelection {
  shape: string;
  size: string;
  base: string;
  flavor: string;
  toppings: string[];
}

interface CakePreviewProps {
  selection: CakeSelection;
  totalPrice: number;
}

export function CakePreview({ selection, totalPrice }: CakePreviewProps) {
  // Dynamic cake image database - matching actual options from CakeCustomizer
  const cakeImages = {
    // Shape-based images (using existing images from CakeCustomizer where available)
    shapes: {
      round: {
        // Use the existing round cake image from CakeCustomizer
        default: "https://images.unsplash.com/photo-1563912318719-4a188174bd3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3VuZCUyMGNha2V8ZW58MXx8fHwxNzU1OTY5MDkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        vanilla: "https://images.unsplash.com/photo-1563912318719-4a188174bd3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3VuZCUyMGNha2V8ZW58MXx8fHwxNzU1OTY5MDkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        chocolate: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwcm91bmR8ZW58MXx8fHwxNzU1OTY5MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        strawberry: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwY2FrZSUyMHJvdW5kfGVufDF8fHx8MTc1NTk2OTA5OXww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      square: {
        // Use the existing square cake image from CakeCustomizer
        default: "https://images.unsplash.com/photo-1695275677975-7e2eb9704cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcXVhcmUlMjBjYWtlfGVufDF8fHx8MTc1NTk2OTA5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        vanilla: "https://images.unsplash.com/photo-1695275677975-7e2eb9704cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcXVhcmUlMjBjYWtlfGVufDF8fHx8MTc1NTk2OTA5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        chocolate: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBzcXVhcmUlMjBjYWtlfGVufDF8fHx8MTc1NTk2OTEwMnww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      heart: {
        default: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGNha2V8ZW58MXx8fHwxNzU1OTY5MTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
        strawberry: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMHN0cmF3YmVycnklMjBjYWtlfGVufDF8fHx8MTc1NTk2OTEwOHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      custom: {
        default: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBjYWtlfGVufDF8fHx8MTc1NTk2OTExMXww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    },
    // Base-specific images (using existing images from CakeCustomizer)
    bases: {
      sponge: "https://images.unsplash.com/photo-1662751381695-396624641958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwc3BvbmdlJTIwY2FrZXxlbnwxfHx8fDE3NTU4ODY1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      chocolate: "https://images.unsplash.com/photo-1592962826124-56f6e78c6f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwbGF5ZXJ8ZW58MXx8fHwxNzU1OTY5MTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "red-velvet": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB2ZWx2ZXQlMjBjYWtlfGVufDF8fHx8MTc1NTk2OTExNHww&ixlib=rb-4.1.0&q=80&w=1080",
      carrot: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3QlMjBjYWtlfGVufDF8fHx8MTc1NTk2OTExN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    // Flavor-specific images (matching actual flavor options with distinct visuals)
    flavors: {
      vanilla: "https://images.unsplash.com/photo-1563912318719-4a188174bd3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwYnV0dGVyY3JlYW18ZW58MXx8fHwxNzU1OTY5MTIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      chocolate: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBnYW5hY2hlfGVufDF8fHx8MTc1NTk2OTEyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      strawberry: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwY3JlYW18ZW58MXx8fHwxNzU1OTY5MTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      caramel: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWx0ZWQlMjBjYXJhbWVsfGVufDF8fHx8MTc1NTk2OTEyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      lemon: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbiUyMGdsYXplfGVufDF8fHx8MTc1NTk2OTEzMnww&ixlib=rb-4.1.0&q=80&w=1080",
      "cream-cheese": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbSUyMGNoZWVzZSUyMGZyb3N0aW5nfGVufDF8fHx8MTc1NTk2OTEzNXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    // Base + Flavor combinations for more specific matching
    combinations: {
      "sponge-vanilla": "https://images.unsplash.com/photo-1662751381695-396624641958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwc3BvbmdlJTIwY2FrZXxlbnwxfHx8fDE3NTU4ODY1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "sponge-chocolate": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBzcG9uZ2V8ZW58MXx8fHwxNzU1OTY5MTIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "sponge-strawberry": "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwc3BvbmdlfGVufDF8fHx8MTc1NTk2OTEyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      "chocolate-chocolate": "https://images.unsplash.com/photo-1592962826124-56f6e78c6f18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwbGF5ZXJ8ZW58MXx8fHwxNzU1OTY5MTAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "chocolate-vanilla": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjB2YW5pbGxhfGVufDF8fHx8MTc1NTk2OTEyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "red-velvet-cream-cheese": "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB2ZWx2ZXQlMjBjcmVhbSUyMGNoZWVzZXxlbnwxfHx8fDE3NTU5NjkxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "carrot-cream-cheese": "https://images.unsplash.com/photo-1621303837174-89787a7d4729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3QlMjBjcmVhbSUyMGNoZWVzZXxlbnwxfHx8fDE3NTU5NjkxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  };

  const getCakeImage = () => {
    // NEW Priority: Base + Flavor combination > Shape + Flavor > Flavor > Base > Shape > Default

    // 1. Try base + flavor combination (most specific)
    if (selection.base && selection.flavor) {
      const combinationKey = `${selection.base}-${selection.flavor}`;
      if (cakeImages.combinations[combinationKey as keyof typeof cakeImages.combinations]) {
        return cakeImages.combinations[combinationKey as keyof typeof cakeImages.combinations];
      }
    }

    // 2. Try shape + flavor combination
    if (selection.shape && selection.flavor) {
      const shapeImages = cakeImages.shapes[selection.shape as keyof typeof cakeImages.shapes];
      if (shapeImages && shapeImages[selection.flavor as keyof typeof shapeImages]) {
        return shapeImages[selection.flavor as keyof typeof shapeImages];
      }
    }

    // 3. Try flavor-specific image (frosting/coating) - NOW MORE PROMINENT
    if (selection.flavor && cakeImages.flavors[selection.flavor as keyof typeof cakeImages.flavors]) {
      return cakeImages.flavors[selection.flavor as keyof typeof cakeImages.flavors];
    }

    // 4. Try base-specific image
    if (selection.base && cakeImages.bases[selection.base as keyof typeof cakeImages.bases]) {
      return cakeImages.bases[selection.base as keyof typeof cakeImages.bases];
    }

    // 5. Try shape default
    if (selection.shape) {
      const shapeImages = cakeImages.shapes[selection.shape as keyof typeof cakeImages.shapes];
      if (shapeImages && shapeImages.default) {
        return shapeImages.default;
      }
    }

    // 6. Final fallback - a beautiful default cake
    return "https://images.unsplash.com/photo-1618508369688-3947bc4f00f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2UlMjBsYXllcnN8ZW58MXx8fHwxNzU1OTUwMjkxfDA&ixlib=rb-4.1.0&q=80&w=1080";
  };

  // Get dynamic size styling based on selection
  const getCakeSizeStyle = () => {
    const sizeMap = {
      small: {
        scale: 0.7,
        containerClass: "w-3/4 mx-auto",
        label: "6\" cake"
      },
      medium: {
        scale: 0.85,
        containerClass: "w-5/6 mx-auto",
        label: "8\" cake"
      },
      large: {
        scale: 1,
        containerClass: "w-full",
        label: "10\" cake"
      },
      xlarge: {
        scale: 1.15,
        containerClass: "w-full",
        label: "12\" cake"
      }
    };

    return selection.size && sizeMap[selection.size as keyof typeof sizeMap]
      ? sizeMap[selection.size as keyof typeof sizeMap]
      : { scale: 1, containerClass: "w-full", label: "" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-24"
    >
      {/* Elegant Bakery Card Design */}
      <div className="relative">
        {/* Warm Bakery Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 rounded-3xl blur-lg opacity-25"></div>

        <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50/95 via-orange-50/90 to-rose-50/85 backdrop-blur-xl border border-amber-200/30 shadow-2xl rounded-3xl">
          {/* Subtle Bakery Pattern Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100/15 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-100/15 to-transparent rounded-full blur-xl"></div>

          {/* Decorative Cake Layer Pattern */}
          <div className="absolute inset-0 opacity-8">
            <div className="absolute top-8 left-8 w-16 h-1 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full"></div>
            <div className="absolute top-12 left-12 w-12 h-1 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full"></div>
            <div className="absolute bottom-16 right-8 w-20 h-1 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full"></div>
            <div className="absolute bottom-20 right-12 w-14 h-1 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full"></div>
          </div>

          <div className="relative p-8 space-y-8">
            {/* Premium Header with Icon */}
            <motion.div
              className="text-center space-y-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  Your Custom Cake
                </h3>
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
              </div>

              <motion.div
                className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-100/80 to-orange-100/80 rounded-full border border-amber-200/50 shadow-sm"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-gray-700">
                  {selection.size && getCakeSizeStyle().label ? `${getCakeSizeStyle().label} ` : ""}
                  {selection.base && selection.flavor ? `${formatSelectionValue(selection.base)} with ${formatSelectionValue(selection.flavor)} frosting` :
                    selection.shape && selection.flavor ? `${formatSelectionValue(selection.shape)} with ${formatSelectionValue(selection.flavor)} frosting` :
                      selection.flavor ? `${formatSelectionValue(selection.flavor)} frosting` :
                        selection.base ? `${formatSelectionValue(selection.base)} base` :
                          selection.shape ? `${formatSelectionValue(selection.shape)} shape` :
                            "Live preview updates as you customize"}
                </p>
              </motion.div>
            </motion.div>

            {/* Premium Cake Display */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "backOut" }}
            >
              {/* Cake Container with Floating Effect */}
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6 shadow-inner">
                {/* Elegant Sprinkle Pattern */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute top-6 left-6 w-1 h-4 bg-amber-400 rounded-full rotate-12 animate-pulse" style={{ animationDelay: '0s' }}></div>
                  <div className="absolute top-12 right-8 w-1 h-3 bg-rose-400 rounded-full rotate-45 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                  <div className="absolute bottom-8 left-12 w-1 h-5 bg-orange-400 rounded-full -rotate-12 animate-pulse" style={{ animationDelay: '1.6s' }}></div>
                  <div className="absolute bottom-6 right-6 w-1 h-3 bg-pink-400 rounded-full rotate-90 animate-pulse" style={{ animationDelay: '2.4s' }}></div>
                  <div className="absolute top-1/2 left-8 w-1 h-4 bg-amber-300 rounded-full -rotate-45 animate-pulse" style={{ animationDelay: '3.2s' }}></div>
                  <div className="absolute top-1/3 right-12 w-1 h-3 bg-rose-300 rounded-full rotate-12 animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                {/* Cake Image with Premium Effects */}
                <motion.div
                  className={`aspect-square rounded-2xl overflow-hidden relative ${getCakeSizeStyle().containerClass} mx-auto`}
                  layout
                  animate={{
                    scale: getCakeSizeStyle().scale,
                    rotateY: [0, 2, -2, 0],
                  }}
                  transition={{
                    scale: { duration: 0.8, ease: "easeInOut" },
                    rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))',
                  }}
                >
                  {/* Warm Bakery Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-300/20 via-orange-300/20 to-rose-300/20 rounded-3xl blur-xl"></div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selection.shape}-${selection.size}-${selection.base}-${selection.flavor}`}
                      initial={{ scale: 0.6, opacity: 0, rotateY: 180, z: -100 }}
                      animate={{ scale: 1, opacity: 1, rotateY: 0, z: 0 }}
                      exit={{ scale: 0.6, opacity: 0, rotateY: -180, z: -100 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="relative w-full h-full rounded-2xl overflow-hidden"
                    >
                      <ImageWithFallback
                        src={getCakeImage()}
                        alt={`${selection.size ? getCakeSizeStyle().label + ' ' : ''}${selection.shape || 'Custom'} ${selection.flavor || 'cake'} cake preview`}
                        className="w-full h-full object-cover rounded-2xl"
                      />

                      {/* Premium Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10 rounded-2xl"></div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Premium Floating Toppings */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {selection.toppings.map((topping, index) => (
                      <motion.div
                        key={`${topping}-${index}`}
                        className="absolute"
                        style={{
                          top: `${20 + (index * 15) % 60}%`,
                          left: `${15 + (index * 20) % 70}%`,
                        }}
                        initial={{ scale: 0, rotate: 0, y: 20 }}
                        animate={{
                          scale: [0, 1.2, 1],
                          rotate: [0, 180, 360],
                          y: [20, -5, 0]
                        }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.15,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -8, 0],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "easeInOut"
                          }}
                          className="text-2xl filter drop-shadow-lg"
                        >
                          {getTopping(topping)}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Premium Size Badge */}
                  {selection.size && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg border-2 border-white"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {getCakeSizeStyle().label}
                      </motion.span>
                    </motion.div>
                  )}

                  {/* Premium Empty State */}
                  {(!selection.shape && !selection.base && !selection.flavor) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-100/80 via-orange-100/80 to-rose-100/80 backdrop-blur-md rounded-2xl border border-white/50"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                              <div className="w-4 h-4 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full"></div>
                            </div>
                          </div>
                        </motion.div>
                        <motion.p
                          className="text-lg font-semibold bg-gradient-to-r from-amber-700 to-rose-600 bg-clip-text text-transparent"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Start creating your masterpiece
                        </motion.p>
                        <p className="text-sm text-amber-700/70 mt-2">Choose your cake options to see the preview</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* Premium Selection Summary */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-rose-600 bg-clip-text text-transparent">
                  Your Selections
                </h4>
              </div>

              <div className="grid gap-3">
                {[
                  { label: "Shape", value: selection.shape, format: formatSelectionValue, color: "from-amber-400 to-orange-400" },
                  { label: "Size", value: selection.size, format: formatSelectionValue, color: "from-orange-400 to-rose-400" },
                  { label: "Base", value: selection.base, format: formatSelectionValue, color: "from-rose-400 to-pink-400" },
                  { label: "Flavor", value: selection.flavor, format: formatSelectionValue, color: "from-pink-400 to-purple-400" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="group"
                  >
                    <div className={`
                      flex justify-between items-center p-3 rounded-xl transition-all duration-300
                      ${item.value
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 shadow-sm hover:shadow-md'
                        : 'bg-gray-50 border border-gray-200/50'
                      }
                    `}>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                        <span className="font-medium text-gray-700">{item.label}</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant={item.value ? "default" : "secondary"}
                          className={
                            item.value
                              ? `bg-gradient-to-r ${item.color} text-white border-0 shadow-sm font-medium`
                              : "bg-gray-200 text-gray-500 border-0"
                          }
                        >
                          {item.format(item.value) || "Not selected"}
                        </Badge>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}

                {/* Premium Toppings Section */}
                {selection.toppings.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200/50 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg">🧁</span>
                      <span className="font-medium text-gray-700">Toppings</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selection.toppings.map((topping, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 1.2 + index * 0.1,
                            type: "spring",
                            stiffness: 300
                          }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <Badge className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white border-0 shadow-sm font-medium text-xs px-3 py-1">
                            {getTopping(topping)} {formatSelectionValue(topping)}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Premium Price Display */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 200 }}
              className="relative"
            >
              {/* Price Card with Glow Effect */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl blur-lg opacity-60"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.div>

                <div className="relative bg-gradient-to-br from-white via-green-50/50 to-emerald-50/50 backdrop-blur-xl border border-green-200/50 rounded-2xl p-6 shadow-xl">
                  {/* Decorative Elements */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>

                  <div className="text-center space-y-3">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="flex items-center justify-center gap-2"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg"></div>
                      <p className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Total Investment
                      </p>
                    </motion.div>

                    <motion.div
                      key={totalPrice}
                      initial={{ scale: 1.3, rotateY: 180 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                      className="relative"
                    >
                      <motion.p
                        className="text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ${totalPrice.toFixed(2)}
                      </motion.p>

                      {/* Sparkle Effects */}
                      <motion.div
                        className="absolute -top-2 -right-2 text-yellow-400"
                        animate={{
                          rotate: [0, 360],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ⭐
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-1 -left-1 text-pink-400"
                        animate={{
                          rotate: [360, 0],
                          scale: [1.2, 0.8, 1.2]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        💫
                      </motion.div>
                    </motion.div>

                    <motion.p
                      className="text-sm text-gray-600 font-medium"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Premium quality guaranteed 🎂
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

function getTopping(toppingId: string): string {
  const toppings: Record<string, string> = {
    // Match the IDs from CakeCustomizer
    "chocolate-chips": "🍫",
    "fresh-berries": "🫐",
    "whipped-cream": "🍥",
    "caramel-drizzle": "🍯",
    "sprinkles": "🌈",
    "nuts": "🥜",
    "fresh-fruit": "🍓",
    "edible-flowers": "🌸"
  };
  return toppings[toppingId] || "🎂";
}

function formatSelectionValue(value: string): string {
  if (!value) return "";

  // Convert kebab-case to Title Case
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}