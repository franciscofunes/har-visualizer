'use client'
import Link from "next/link";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 p-6 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-white mb-4">© {currentYear} Har Visualizer. All rights reserved.</p>

        <Link legacyBehavior href="/privacy-policy">
          <a className="text-gray-500 hover:text-gray-400 transition-colors">
            Privacy Policy
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
