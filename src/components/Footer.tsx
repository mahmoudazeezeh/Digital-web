import React from 'react';
import { Link } from 'react-router-dom';
import { CircuitBoard, Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <CircuitBoard className="h-6 w-6 mr-2" />
              <span className="font-bold text-lg">Digital Logic Design</span>
            </div>
            <p className="text-indigo-200 text-sm">
              An interactive educational platform for learning digital logic design concepts,
              from number systems to sequential circuits.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/number-systems" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Number Systems
                </Link>
              </li>
              <li>
                <Link to="/logic-gates" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Logic Gates
                </Link>
              </li>
              <li>
                <Link to="/exam" className="text-indigo-200 hover:text-white transition-colors duration-200">
                  Exam
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/your-project-link" className="text-indigo-200 hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/mahmoud-azeezeh-370465293/" className="text-indigo-200 hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/azeezeh_codes?igsh=MTVodjh6Y2IyY2xpZg%3D%3D&utm_source=qr" className="text-indigo-200 hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-indigo-800 text-center text-indigo-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Digital Logic Design Course. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
