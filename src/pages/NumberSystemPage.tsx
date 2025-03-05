import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NumberSystemPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputBase, setInputBase] = useState('10');
  const [results, setResults] = useState({
    binary: '',
    decimal: '',
    octal: '',
    hexadecimal: ''
  });
  const [error, setError] = useState('');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const isValidForBase = (value: string, base: number) => {
    const validChars = '0123456789ABCDEF'.substring(0, base);
    return [...value.toUpperCase()].every(char => validChars.includes(char));
  };

  const handleConvert = () => {
    if (!inputValue) {
      setError('Please enter a value');
      return;
    }

    const base = parseInt(inputBase, 10);
    
    if (!isValidForBase(inputValue, base)) {
      setError(`Invalid characters for base ${base}`);
      return;
    }

    setError('');
    
    try {
      // Convert input to decimal first
      const decimalValue = parseInt(inputValue, base);
      
      setResults({
        binary: decimalValue.toString(2),
        decimal: decimalValue.toString(10),
        octal: decimalValue.toString(8),
        hexadecimal: decimalValue.toString(16).toUpperCase()
      });
    } catch (err) {
      setError('Conversion error. Please check your input.');
    }
  };

  // Example conversion table data
  const conversionExamples = [
    { decimal: '10', binary: '1010', octal: '12', hex: 'A' },
    { decimal: '15', binary: '1111', octal: '17', hex: 'F' },
    { decimal: '42', binary: '101010', octal: '52', hex: '2A' },
    { decimal: '100', binary: '1100100', octal: '144', hex: '64' },
    { decimal: '255', binary: '11111111', octal: '377', hex: 'FF' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Number System Conversions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Convert between decimal, binary, octal, and hexadecimal number systems.
            Understanding these conversions is fundamental to digital logic design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Conversion Tool */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Conversion Tool</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Enter a number:</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter a number"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select input base:</label>
              <select
                value={inputBase}
                onChange={(e) => setInputBase(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="2">Binary (Base 2)</option>
                <option value="8">Octal (Base 8)</option>
                <option value="10">Decimal (Base 10)</option>
                <option value="16">Hexadecimal (Base 16)</option>
              </select>
            </div>
            
            <button
              onClick={handleConvert}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Convert
            </button>
            
            {error && (
              <p className="mt-4 text-red-500">{error}</p>
            )}
            
            <div className="mt-6 space-y-4">
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-semibold">Binary (Base 2):</span> {results.binary}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-semibold">Decimal (Base 10):</span> {results.decimal}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-semibold">Octal (Base 8):</span> {results.octal}
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <span className="font-semibold">Hexadecimal (Base 16):</span> {results.hexadecimal}
              </div>
            </div>
          </motion.div>
          
          {/* Conversion Table */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Conversion Table</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decimal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Binary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Octal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hexadecimal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {conversionExamples.map((example, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{example.decimal}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{example.binary}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{example.octal}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{example.hex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
        
        {/* Educational Content */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold mb-4">Understanding Number Systems</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Decimal (Base 10)</h3>
              <p className="text-gray-700">
                The decimal number system is the most familiar to us as it's what we use in everyday life.
                It uses 10 digits (0-9) and each position represents a power of 10.
                For example, in the number 423:
                <br />
                4 × 10² + 2 × 10¹ + 3 × 10⁰ = 400 + 20 + 3 = 423
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Binary (Base 2)</h3>
              <p className="text-gray-700">
                The binary number system is fundamental to digital systems as computers work with binary digits (bits).
                It uses only 2 digits (0 and 1) and each position represents a power of 2.
                For example, the binary number 1011:
                <br />
                1 × 2³ + 0 × 2² + 1 × 2¹ + 1 × 2⁰ = 8 + 0 + 2 + 1 = 11 in decimal
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Octal (Base 8)</h3>
              <p className="text-gray-700">
                The octal number system uses 8 digits (0-7) and each position represents a power of 8.
                It's useful in computing as 3 binary digits can represent one octal digit.
                For example, the octal number 52:
                <br />
                5 × 8¹ + 2 × 8⁰ = 40 + 2 = 42 in decimal
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Hexadecimal (Base 16)</h3>
              <p className="text-gray-700">
                The hexadecimal number system uses 16 digits (0-9 and A-F) and each position represents a power of 16.
                It's widely used in computing as 4 binary digits can represent one hexadecimal digit.
                For example, the hexadecimal number 2A:
                <br />
                2 × 16¹ + 10 × 16⁰ = 32 + 10 = 42 in decimal (A represents 10)
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Video Section */}
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold mb-4">Video Tutorial</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              className="w-full h-96"
              src="https://www.youtube.com/embed/FFDMzbrEXaE" 
              title="Number Systems - Decimal, Binary, Octal & Hexadecimal" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NumberSystemPage;