import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, CircuitBoard } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Number Systems', path: '/number-systems' },
    { name: 'Logic Gates', path: '/logic-gates' },
    { name: 'Boolean Expressions', path: '/boolean-expressions' },
    { name: 'Code Conversions', path: '/code-conversions' },
    { name: 'Complements', path: '/complements' },
    { name: 'Sequential Circuits', path: '/sequential-circuits' },
    { name: 'Exam', path: '/exam' },
  ];

  return (
    <nav className="bg-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <CircuitBoard className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">Digital Logic Design</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;