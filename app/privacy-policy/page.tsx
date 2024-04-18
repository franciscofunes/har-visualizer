'use client'

import { privacyPolicyData } from '@/app/shared/constants/privacyPolicyData';
import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <motion.div
      className="container mx-auto mt-8 p-2"
      initial={{ opacity: 0, y: -20 }} // Initial animation values
      animate={{ opacity: 1, y: 0 }} // Animation to apply when the component mounts
      transition={{ duration: 0.5, delay: 0.1 }} // Transition duration and delay
    >
      <h1 className="text-gray-300 text-4xl font-bold mb-4">Privacy Policy</h1>

      {privacyPolicyData.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-gray-100 text-2xl font-semibold mb-2">{section.title}</h2>
          <p className="text-gray-400">{section.content}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default PrivacyPolicyPage;
