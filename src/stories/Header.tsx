import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";

interface HeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/new-logo.svg" alt="Tendas Logo" className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
            >
              Home
            </Link>
            <div className="relative group">
              <button
                onClick={toggleProductsMenu}
                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
              >
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div
                className={`absolute top-full left-0 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 w-48 transition-all duration-200 ${isProductsOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              >
                <Link
                  to="/products/tents"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Tents
                </Link>
                <Link
                  to="/products/covers"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Vehicle Covers
                </Link>
                <Link
                  to="/products/shade"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Shade Solutions
                </Link>
                <Link
                  to="/products/custom"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Custom Work
                </Link>
              </div>
            </div>
            <Link
              to="/rental"
              className="text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
            >
              Rental
            </Link>
            <Link
              to="/why-us"
              className="text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
            >
              Why Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <Link
            to="/"
            className="block text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <div>
            <button
              onClick={toggleProductsMenu}
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors w-full justify-between"
            >
              Products
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div
              className={`pl-4 mt-2 space-y-2 transition-all duration-200 ${isProductsOpen ? "block" : "hidden"}`}
            >
              <Link
                to="/products/tents"
                className="block text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tents
              </Link>
              <Link
                to="/products/covers"
                className="block text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Vehicle Covers
              </Link>
              <Link
                to="/products/shade"
                className="block text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shade Solutions
              </Link>
              <Link
                to="/products/custom"
                className="block text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Custom Work
              </Link>
            </div>
          </div>
          <Link
            to="/rental"
            className="block text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Rental
          </Link>
          <Link
            to="/why-us"
            className="block text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Why Us
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 dark:text-gray-200 hover:text-[#1b5e20] dark:hover:text-green-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
