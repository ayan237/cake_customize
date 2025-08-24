import React from "react";
import { Header } from "./components/Header";
import { CakeCustomizer } from "./components/CakeCustomizer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100">
      <Header />
      <CakeCustomizer />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid rgba(217, 125, 76, 0.2)',
            borderRadius: '14px',
          },
        }}
      />
    </div>
  );
}