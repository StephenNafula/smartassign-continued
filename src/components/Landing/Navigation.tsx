import React from 'react';
import { motion } from 'framer-motion';
import { FileEdit } from 'lucide-react';

interface NavigationProps {
  onGetStarted: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onGetStarted }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
              <FileEdit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">SmartAssign</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-800 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-800 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-800 transition-colors">
              About
            </a>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};