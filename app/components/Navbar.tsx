'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-4"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link legacyBehavior href="/">
            <a className="text-white text-xl font-bold hover:text-gray-200 transition-colors">
              <motion.div
                className="flex gap-2"
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Har Visualizer <IoAnalyticsSharp />
              </motion.div>
            </a>

          </Link>
          <div className="flex space-x-4">
            <Link legacyBehavior href="/faq">
              <a className="text-white hover:text-gray-400 transition-colors">
                <motion.div
                  className="flex gap-1 items-center"
                  whileTap={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  FAQ <FaQuestion/>
                </motion.div></a>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
