// Quick script to fix versioned imports
// Run with: node fix-imports.js

const fs = require('fs');
const path = require('path');

const fixes = [
  // Radix UI imports
  ['@radix-ui/react-tooltip@1.1.8', '@radix-ui/react-tooltip'],
  ['@radix-ui/react-toggle@1.1.2', '@radix-ui/react-toggle'],
  ['@radix-ui/react-toggle-group@1.1.2', '@radix-ui/react-toggle-group'],
  ['@radix-ui/react-tabs@1.1.3', '@radix-ui/react-tabs'],
  ['@radix-ui/react-switch@1.1.3', '@radix-ui/react-switch'],
  ['@radix-ui/react-slider@1.2.3', '@radix-ui/react-slider'],
  ['@radix-ui/react-slot@1.1.2', '@radix-ui/react-slot'],
  ['@radix-ui/react-separator@1.1.2', '@radix-ui/react-separator'],
  ['@radix-ui/react-select@2.1.6', '@radix-ui/react-select'],
  ['@radix-ui/react-scroll-area@1.2.3', '@radix-ui/react-scroll-area'],
  ['@radix-ui/react-radio-group@1.2.3', '@radix-ui/react-radio-group'],
  ['@radix-ui/react-progress@1.1.2', '@radix-ui/react-progress'],
  ['@radix-ui/react-popover@1.1.6', '@radix-ui/react-popover'],
  ['@radix-ui/react-navigation-menu@1.2.5', '@radix-ui/react-navigation-menu'],
  ['@radix-ui/react-menubar@1.1.6', '@radix-ui/react-menubar'],
  ['@radix-ui/react-label@2.1.2', '@radix-ui/react-label'],
  ['@radix-ui/react-hover-card@1.1.6', '@radix-ui/react-hover-card'],
  ['@radix-ui/react-dropdown-menu@2.1.6', '@radix-ui/react-dropdown-menu'],
  ['@radix-ui/react-dialog@1.1.6', '@radix-ui/react-dialog'],
  ['@radix-ui/react-context-menu@2.2.6', '@radix-ui/react-context-menu'],
  ['@radix-ui/react-collapsible@1.1.3', '@radix-ui/react-collapsible'],
  ['@radix-ui/react-checkbox@1.1.4', '@radix-ui/react-checkbox'],
  ['@radix-ui/react-avatar@1.1.3', '@radix-ui/react-avatar'],
  ['@radix-ui/react-aspect-ratio@1.1.2', '@radix-ui/react-aspect-ratio'],
  ['@radix-ui/react-alert-dialog@1.1.6', '@radix-ui/react-alert-dialog'],
  ['@radix-ui/react-accordion@1.2.3', '@radix-ui/react-accordion'],
  
  // Other libraries
  ['class-variance-authority@0.7.1', 'class-variance-authority'],
  ['lucide-react@0.487.0', 'lucide-react'],
  ['next-themes@0.4.6', 'next-themes'],
  ['sonner@2.0.3', 'sonner'],
  ['cmdk@1.1.1', 'cmdk'],
  ['input-otp@1.4.2', 'input-otp'],
  ['react-hook-form@7.55.0', 'react-hook-form'],
  ['react-resizable-panels@2.1.7', 'react-resizable-panels'],
  ['vaul@1.1.2', 'vaul']
];

function fixFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  fixes.forEach(([from, to]) => {
    const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (content.includes(from)) {
      content = content.replace(regex, to);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
}

// Fix all UI component files
const uiDir = './src/components/ui';
if (fs.existsSync(uiDir)) {
  fs.readdirSync(uiDir).forEach(file => {
    if (file.endsWith('.tsx')) {
      fixFile(path.join(uiDir, file));
    }
  });
}

console.log('Import fixes completed!');