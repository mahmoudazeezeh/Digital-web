import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CodeConversionsPage = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [conversionType, setConversionType] = useState('gray');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Validate binary input
  const isValidBinary = (value: string) => {
    return /^[01]+$/.test(value);
  };

  // Convert binary to Gray code
  const binaryToGray = (binary: string) => {
    let gray = binary.charAt(0);
    for (let i = 1; i < binary.length; i++) {
      // XOR operation
      gray += (parseInt(binary.charAt(i), 2) ^ parseInt(binary.charAt(i - 1), 2)).toString();
    }
    return gray;
  };

  // Convert binary to BCD
  const binaryToBCD = (binary: string) => {
    // Convert binary to decimal
    const decimal = parseInt(binary, 2);
    
    // Convert decimal to BCD
    let bcd = '';
    const decimalStr = decimal.toString();
    
    for (let i = 0; i < decimalStr.length; i++) {
      const digit = parseInt(decimalStr.charAt(i), 10);
      bcd += digit.toString(2).padStart(4, '0');
    }
    
    return bcd;
  };

  // Convert binary to Excess-3
  const binaryToExcess3 = (binary: string) => {
    // Convert binary to decimal
    const decimal = parseInt(binary, 2);
    
    // Convert decimal to Excess-3
    let excess3 = '';
    const decimalStr = decimal.toString();
    
    for (let i = 0; i < decimalStr.length; i++) {
      const digit = parseInt(decimalStr.charAt(i), 10);
      const excess3Digit = digit + 3;
      excess3 += excess3Digit.toString(2).padStart(4, '0');
    }
    
    return excess3;
  };

  // Handle conversion
  const handleConvert = () => {
    if (!binaryInput) {
      setError('Please enter a binary value');
      setResult('');
      return;
    }

    if (!isValidBinary(binaryInput)) {
      setError('Input must be a binary number (0s and 1s only)');
      setResult('');
      return;
    }

    setError('');
    
    try {
      switch (conversionType) {
        case 'gray':
          setResult(binaryToGray(binaryInput));
          break;
        case 'bcd':
          setResult(binaryToBCD(binaryInput));
          break;
        case 'excess3':
          setResult(binaryToExcess3(binaryInput));
          break;
        default:
          setResult('');
      }
    } catch (err) {
      setError('Conversion error. Please check your input.');
      setResult('');
    }
  };

  // Example conversions
  const examples = [
    { binary: '1010', gray: '1111', bcd: '0001 0000 0001 0000', excess3: '0100 0100 0100 0100' },
    { binary: '1101', gray: '1011', bcd: '0001 0101 0000 0001', excess3: '0100 1000 0011 0100' },
    { binary: '10110', gray: '11101', bcd: '0010 0010 0001 0001 0000', excess3: '0101 0101 0100 0100 0011' }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Code Conversions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Convert between different binary codes including Gray Code, BCD (Binary-Coded Decimal),
            and Excess-3 Code. These codes are essential in digital systems for various applications.
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
            <h2 className="text-xl font-semibold mb-4">Code Conversion Tool</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Enter Binary Value:</label>
              <input
                type="text"
                value={binaryInput}
                onChange={(e) => setBinaryInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter a binary number (e.g., 1010)"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select Conversion Type:</label>
              <select
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="gray">Binary to Gray Code</option>
                <option value="bcd">Binary to BCD</option>
                <option value="excess3">Binary to Excess-3</option>
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
            
            {result && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Result:</h3>
                <div className="p-4 bg-gray-50 rounded text-lg font-mono break-all">
                  {result}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Examples and Information */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Examples & Information</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Example Conversions:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Binary</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gray Code</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BCD</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {examples.map((example, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">{example.binary}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">{example.gray}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">{example.bcd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Code Descriptions:</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium text-indigo-700">Gray Code</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    A binary numeral system where two successive values differ in only one bit.
                    It's used to prevent spurious output from electromechanical switches and in error correction.
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium text-indigo-700">BCD (Binary-Coded Decimal)</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    A class of binary encodings of decimal numbers where each decimal digit is represented by a fixed
                    number of binary digits (usually 4). It's used in electronic systems where decimal digits are displayed.
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium text-indigo-700">Excess-3 Code</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    A self-complementing BCD code in which each decimal digit is represented by the corresponding
                    BCD code plus 3. It simplifies the implementation of arithmetic operations.
                  </p>
                </div>
              </div>
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
          <h2 className="text-2xl font-semibold mb-4">Understanding Code Conversions</h2>
          
          <div className="space-y-6">
            <p className="text-gray-700">
              Code conversions are essential in digital systems for various applications, from data transmission
              to error detection and correction. Different codes have different properties that make them suitable
              for specific applications.
            </p>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Gray Code</h3>
              <p className="text-gray-700 mb-2">
                Gray code is a binary numeral system where two successive values differ in only one bit position.
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">Properties:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Minimizes errors during transitions</li>
                  <li>Used in rotary encoders and position sensors</li>
                  <li>Helps in error detection in digital communications</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">BCD (Binary-Coded Decimal)</h3>
              <p className="text-gray-700 mb-2">
                BCD represents decimal digits using a fixed number of binary digits, typically 4 bits per decimal digit.
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">Properties:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Easy conversion between decimal and binary</li>
                  <li>Used in systems where decimal display is required</li>
                  <li>Simplifies decimal arithmetic operations</li>
                  <li>Common in financial and business applications</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Excess-3 Code</h3>
              <p className="text-gray-700 mb-2">
                Excess-3 is a self-complementing BCD code where each decimal digit is represented by the BCD code plus 3.
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">Properties:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Self-complementing (9's complement is obtained by inverting all bits)</li>
                  <li>Simplifies subtraction operations</li>
                  <li>Used in older computer systems for decimal arithmetic</li>
                </ul>
              </div>
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
              src="https://www.youtube.com/embed/sJXTo3EZoxM" 
              title="Binary Codes - BCD, Gray Code, and Excess-3" 
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

export default CodeConversionsPage;