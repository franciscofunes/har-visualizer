import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { glossaryData } from '../shared/constants/glossaryData';
import { TbMoodNerd } from "react-icons/tb";
import { GlossaryProps } from '../shared/interfaces/glossaryProps';

const Glossary: React.FC<GlossaryProps> = ({ isOpen }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const toggleOpen = () => {
    setIsExpanded((prev) => !prev);
  };

  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };
  
  useEffect(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);
  
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-100 shadow-lg rounded-lg p-6 mt-6 md:mt-0 text-gray-800"
    >
      <div className={`flex flex-col md:flex-row items-center justify-between ${isExpanded ? 'justify-between' : 'justify-center'}`}>
        <hr className="border-t-2 border-gray-300 mb-4 w-full md:w-auto" />
        <div className="flex items-center gap-2">
          <h2 className="text-lg md:text-xl font-semibold">Glossary of Terms </h2>
          <TbMoodNerd className="w-6 h-6" />
        </div>
        <button onClick={toggleOpen} className="focus:outline-none">
          <motion.div
            initial={false}
            animate={isExpanded ? "open" : "closed"}
            variants={iconVariants}
          >
            <IoIosArrowDown />
          </motion.div>
        </button>
      </div>
      {isExpanded && (
        <div className="flex justify-center mt-4">
          <div className="flex flex-wrap max-w-4xl">
            {Object.entries(glossaryData).map(([term, definition]) => (
              <div key={term} className="w-full md:w-1/2 mb-4">
                <h3 className="text-sm md:text-base font-semibold text-gray-700">{term}</h3>
                <p className="text-xs md:text-sm italic text-gray-600">{definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Glossary;
