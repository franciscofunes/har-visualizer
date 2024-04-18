import React from 'react';
import { motion } from 'framer-motion';

const LoadingComponent: React.FC = () => {
  const circleVariants = {
    initial: { y: 0 },
    animate: { y: [-5, 5, -5, 0], transition: { duration: 1.5, repeat: Infinity } },
  };

  return (
    <div className="text-center text-gray-400 mt-10">
      <div className="flex items-center justify-center">
        <motion.div
          variants={circleVariants}
          initial="initial"
          animate="animate"
          className="w-3 h-3 bg-gray-400 rounded-full mx-1"
        />
        <motion.div
          variants={circleVariants}
          initial="initial"
          animate="animate"
          className="w-3 h-3 bg-gray-400 rounded-full mx-1"
        />
        <motion.div
          variants={circleVariants}
          initial="initial"
          animate="animate"
          className="w-3 h-3 bg-gray-400 rounded-full mx-1"
        />
      </div>
    </div>
  );
};

export default LoadingComponent;
