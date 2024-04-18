import { motion } from 'framer-motion';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FaqItemProps } from '../shared/types/Faq';

const FaqItem: React.FC<FaqItemProps & { isOpen: boolean }> = ({ question, answer, isOpen }) => {
    const [isOpenState, setIsOpenState] = React.useState(isOpen);
  
    const toggleOpen = () => {
      setIsOpenState((prev) => !prev);
    };

    const iconVariants = {
      open: { rotate: 180 },
      closed: { rotate: 0 },
    };
  
    return (
      <>
        <div className="flex items-center cursor-pointer" onClick={toggleOpen}>
          <motion.div
            initial={false}
            animate={isOpenState ? "open" : "closed"}
            variants={iconVariants}
          >
            <IoIosArrowDown />
          </motion.div>
          <div className="ml-2">
            <span className="text-lg font-semibold">{question}</span>
          </div>
        </div>
        {isOpenState && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-600"
          >
            {answer}
          </motion.div>
        )}
      </>
    );
  };
  
  export default FaqItem;
