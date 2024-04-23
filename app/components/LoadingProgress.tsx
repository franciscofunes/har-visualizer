import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProgressBarProps {
  progress: number;
}

const LoadingProgressBar: React.FC<LoadingProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full h-4 bg-gray-300 rounded-lg overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full bg-green-500"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      ></motion.div>
      <motion.div
        className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-black font-bold shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {progress}%
      </motion.div>
    </div>
  );
};

export default LoadingProgressBar;
