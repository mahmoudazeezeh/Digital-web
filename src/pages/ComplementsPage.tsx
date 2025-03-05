import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ComplementsPage = () => {
  const [binaryInput, setBinaryInput] = useState('');
  const [onesComplement, setOnesComplement] = useState('');
  const [twosComplement, setTwosComplement] = useState('');
  const [error, setError] = useState('');
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Validate binary input
  const isValidBinary = (value: string) => {
    return /^[01]+$/.test(value);
  };

  // Calculate 1's complement
  const calculateOnesComplement = (binary: string) => {
    return binary.split('').map(bit => bit === '0' ? '1' : '0').join('');
  };

  // Calculate 2's complement
  const calculateTwosComplement = (binary: string) => {
    const onesComp = calculateOnesComplement(binary);
    
    // Add 1 to the 1's complement
    let carry = 1;
    const result = [];
    
    for (let i = onesComp.length - 1; i >= 0; i--) {
      const sum = parseInt(onesComp[i]) + carry;
      result.unshift(sum % 2);
      carry = Math.floor(sum / 2);
    }
    
    // If there's still a carry, add it to the front
    if (carry > 0) {
      result.unshift(carry);
    }
    
    return result.join('');
  };

  // Handle calculation
  const handleCalculate = () => {
    if (!binaryInput) {
      setError('Please enter a binary number');
      setOnesComplement('');
      setTwosComplement('');
      return;
    }

    if (!isValidBinary(binaryInput)) {
      setError('Input must be a binary number (0s and 1s only)');
      setOnesComplement('');
      setTwosComplement('');
      return;
    }

    setError('');
    
    try {
      const ones = calculateOnesComplement(binaryInput);
      const twos = calculateTwosComplement(binaryInput);
      
      setOnesComplement(ones);
      setTwosComplement(twos);
    } catch (err) {
      setError('Calculation error. Please check your input.');
      setOnesComplement('');
      setTwosComplement('');
    }
  };

  // Example complements
  const examples = [
    { binary: '1010', ones: '0101', twos: '0110' },
    { binary: '1100', ones: '0011', twos: '0100' },
    { binary: '0101', ones: '1010', twos: '1011' },
    { binary: '1111', ones: '0000', twos: '0001' }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Binary Complements</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate 1's complement and 2's complement of binary numbers. Complements are essential
            in digital systems for representing negative numbers and performing subtraction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Complement Calculator */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Complement Calculator</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Enter Binary Number:</label>
              <input
                type="text"
                value={binaryInput}
                onChange={(e) => setBinaryInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter a binary number (e.g., 1010)"
              />
            </div>
            
            <button
              onClick={handleCalculate}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Calculate Complements
            </button>
            
            {error && (
              <p className="mt-4 text-red-500">{error}</p>
            )}
            
            {onesComplement && twosComplement && (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">1's Complement:</h3>
                  <div className="p-4 bg-gray-50 rounded text-lg font-mono">
                    {onesComplement}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">2's Complement:</h3>
                  <div className="p-4 bg-gray-50 rounded text-lg font-mono">
                    {twosComplement}
                  </div>
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
              <h3 className="font-semibold text-gray-700 mb-2">Example Complements:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Binary</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">1's Complement</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2's Complement</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {examples.map((example, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">{example.binary}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">{example.ones}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">{example.twos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Complement Descriptions:</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium text-indigo-700">1's Complement</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    The 1's complement of a binary number is obtained by changing all 0s to 1s and all 1s to 0s.
                    It's essentially the bitwise NOT operation.
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium text-indigo-700">2's Complement</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    The 2's complement of a binary number is obtained by adding 1 to its 1's complement.
                    It's widely used for representing negative numbers in digital systems.
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
          <h2 className="text-2xl font-semibold mb-4">Understanding Binary Complements</h2>
          
          <div className="space-y-6">
            <p className="text-gray-700">
              Binary complements are essential in digital systems for representing negative numbers and performing
              arithmetic operations, especially subtraction. The two main complement systems are 1's complement and 2's complement.
            </p>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">1's Complement</h3>
              <p className="text-gray-700 mb-2">
                The 1's complement of a binary number is formed by inverting each bit (changing 0s to 1s and 1s to 0s).
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">Properties:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Simple to compute (just flip all bits)</li>
                  <li>Has two representations of zero: +0 (all 0s) and -0 (all 1s)</li>
                  <li>Subtraction can be performed by adding the 1's complement of the subtrahend</li>
                  <li>Requires end-around carry for correct results in some operations</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">2's Complement</h3>
              <p className="text-gray-700 mb-2">
                The 2's complement of a binary number is formed by adding 1 to its 1's complement.
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">Properties:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Most commonly used representation for signed integers in computers</li>
                  <li>Has only one representation of zero</li>
                  <li>Subtraction can be performed by adding the 2's complement of the subtrahend</li>
                  <li>No need for end-around carry</li>
                  <li>Range is asymmetric: can represent one more negative number than positive</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Applications</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Representing Negative Numbers:</strong> 2's complement is the standard method for representing signed integers in computers.</li>
                <li><strong>Subtraction:</strong> Subtraction can be performed using addition by converting the subtrahend to its 2's complement.</li>
                <li><strong>Error Detection:</strong> Complements are used in various error detection schemes.</li>
                <li><strong>Digital Arithmetic:</strong> Simplifies the implementation of arithmetic operations in digital circuits.</li>
              </ul>
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
              src="https://www.youtube.com/embed/4qH4unVtJkE" 
              title="1's and 2's Complement" 
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

export default ComplementsPage;