'use client'

import FaqItem from '@/app/components/FaqItem';
import React from 'react';
import faqData from '../shared/constants/faqData';

const FaqPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-20 p-8 bg-gray-100 rounded-lg shadow-md mb-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} isOpen={index === 0} />
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
