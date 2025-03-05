import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LogicGatesPage = () => {
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);
  const [gateType, setGateType] = useState<string>('AND');
  const [output, setOutput] = useState<boolean>(false);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Calculate output based on inputs and gate type
  useEffect(() => {
    switch (gateType) {
      case 'AND':
        setOutput(inputA && inputB);
        break;
      case 'OR':
        setOutput(inputA || inputB);
        break;
      case 'NOT':
        setOutput(!inputA);
        break;
      case 'NAND':
        setOutput(!(inputA && inputB));
        break;
      case 'NOR':
        setOutput(!(inputA || inputB));
        break;
      case 'XOR':
        setOutput(inputA !== inputB);
        break;
      case 'XNOR':
        setOutput(inputA === inputB);
        break;
      default:
        setOutput(false);
    }
  }, [inputA, inputB, gateType]);

  // Truth table data for all gates
  const truthTableData = [
    { a: false, b: false, and: false, or: false, not: true, nand: true, nor: true, xor: false, xnor: true },
    { a: false, b: true, and: false, or: true, not: true, nand: true, nor: false, xor: true, xnor: false },
    { a: true, b: false, and: false, or: true, not: false, nand: true, nor: false, xor: true, xnor: false },
    { a: true, b: true, and: true, or: true, not: false, nand: false, nor: false, xor: false, xnor: true }
  ];

  // Gate circuit diagrams (SVG paths)
  const getGateSymbol = () => {
    switch (gateType) {
      case 'AND':
        return (
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path d="M30,10 L30,50 L50,50 Q70,30 50,10 L30,10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="10" cy="20" r={inputA ? "4" : "3"} fill={inputA ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="10" cy="40" r={inputB ? "4" : "3"} fill={inputB ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="90" cy="30" r={output ? "4" : "3"} fill={output ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      case 'OR':
        return (
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path d="M30,10 Q50,30 30,50 L30,10 Q45,10 60,30 Q45,50 30,50" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="2" />
            <line x1="60" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="10" cy="20" r={inputA ? "4" : "3"} fill={inputA ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="10" cy="40" r={inputB ? "4" : "3"} fill={inputB ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="90" cy="30" r={output ? "4" : "3"} fill={output ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      case 'NOT':
        return (
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path d="M30,10 L30,50 L60,30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="65" cy="30" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="10" y1="30" x2="30" y2="30" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="10" cy="30" r={inputA ? "4" : "3"} fill={inputA ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="90" cy="30" r={output ? "4" : "3"} fill={output ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      case 'NAND':
        return (
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path d="M30,10 L30,50 L50,50 Q70,30 50,10 L30,10 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="75" cy="30" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="10" cy="20" r={inputA ? "4" : "3"} fill={inputA ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="10" cy="40" r={inputB ? "4" : "3"} fill={inputB ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="90" cy="30" r={output ? "4" : "3"} fill={output ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      case 'NOR':
        return (
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path d="M30,10 Q50,30 30,50 L30,10 Q45,10 60,30 Q45,50 30,50" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="65" cy="30" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="40" x2="30" y2="40" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="10" cy="20" r={inputA ? "4" : "3"} fill={inputA ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="10" cy="40" r={inputB ? "4" : "3"} fill={inputB ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="90" cy="30" r={output ? "4" : "3"} fill={output ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      case 'XOR':
        return (
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path d="M25,10 Q45,30 25,50 L25,10 Q40,10 55,30 Q40,50 25,50" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20,10 Q40,30 20,50" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="2" />
            <line x1="55" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="10" cy="20" r={inputA ? "4" : "3"} fill={inputA ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="10" cy="40" r={inputB ? "4" : "3"} fill={inputB ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="90" cy="30" r={output ? "4" : "3"} fill={output ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      case 'XNOR':
        return (
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path d="M25,10 Q45,30 25,50 L25,10 Q40,10 55,30 Q40,50 25,50" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M20,10 Q40,30 20,50" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="60" cy="30" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="10" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="2" />
            <line x1="10" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="2" />
            <line x1="65" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="10" cy="20" r={inputA ? "4" : "3"} fill={inputA ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="10" cy="40" r={inputB ? "4" : "3"} fill={inputB ? "#4F46E5" : "#E5E7EB"} />
            <circle cx="90" cy="30" r={output ? "4" : "3"} fill={output ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Logic Gates Simulator</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the fundamental building blocks of digital circuits. Logic gates perform basic logical functions
            and are the foundation of all digital systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Logic Gate Simulator */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Logic Gate Simulator</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select Logic Gate:</label>
              <select
                value={gateType}
                onChange={(e) => setGateType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="AND">AND Gate</option>
                <option value="OR">OR Gate</option>
                <option value="NOT">NOT Gate</option>
                <option value="NAND">NAND Gate</option>
                <option value="NOR">NOR Gate</option>
                <option value="XOR">XOR Gate</option>
                <option value="XNOR">XNOR Gate</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Input A:</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setInputA(false)}
                    className={`w-1/2 py-2 rounded-l ${!inputA ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    0
                  </button>
                  <button
                    onClick={() => setInputA(true)}
                    className={`w-1/2 py-2 rounded-r ${inputA ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    1
                  </button>
                </div>
              </div>
              
              {gateType !== 'NOT' && (
                <div>
                  <label className="block text-gray-700 mb-2">Input B:</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setInputB(false)}
                      className={`w-1/2 py-2 rounded-l ${!inputB ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      0
                    </button>
                    <button
                      onClick={() => setInputB(true)}
                      className={`w-1/2 py-2 rounded-r ${inputB ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      1
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Output:</label>
              <div className={`p-4 rounded text-center font-bold text-white ${output ? 'bg-indigo-600' : 'bg-gray-500'}`}>
                {output ? '1' : '0'}
              </div>
            </div>
            
            <div className="h-48 text-indigo-800">
              {getGateSymbol()}
            </div>
          </motion.div>
          
          {/* Truth Table */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Truth Table</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input A</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Input B</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Output</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {truthTableData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.a ? '1' : '0'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.b ? '1' : '0'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {gateType === 'AND' && (row.and ? '1' : '0')}
                        {gateType === 'OR' && (row.or ? '1' : '0')}
                        {gateType === 'NOT' && (row.a ? (row.not ? '1' : '0') : (row.not ? '1' : '0'))}
                        {gateType === 'NAND' && (row.nand ? '1' : '0')}
                        {gateType === 'NOR' && (row.nor ? '1' : '0')}
                        {gateType === 'XOR' && (row.xor ? '1' : '0')}
                        {gateType === 'XNOR' && (row.xnor ? '1' : '0')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-2">Gate Description</h3>
              <div className="p-4 bg-gray-50 rounded">
                {gateType === 'AND' && (
                  <p>The AND gate outputs 1 only when all inputs are 1. Otherwise, it outputs 0.</p>
                )}
                {gateType === 'OR' && (
                  <p>The OR gate outputs 1 when at least one input is 1. It outputs 0 only when all inputs are 0.</p>
                )}
                {gateType === 'NOT' && (
                  <p>The NOT gate (inverter) outputs the opposite of its input: 0 becomes 1, and 1 becomes 0.</p>
                )}
                {gateType === 'NAND' && (
                  <p>The NAND gate is an AND gate followed by a NOT gate. It outputs 0 only when all inputs are 1.</p>
                )}
                {gateType === 'NOR' && (
                  <p>The NOR gate is an OR gate followed by a NOT gate. It outputs 1 only when all inputs are 0.</p>
                )}
                {gateType === 'XOR' && (
                  <p>The XOR (Exclusive OR) gate outputs 1 when the inputs are different, and 0 when they are the same.</p>
                )}
                {gateType === 'XNOR' && (
                  <p>The XNOR gate is an XOR gate followed by a NOT gate. It outputs 1 when the inputs are the same.</p>
                )}
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
          <h2 className="text-2xl font-semibold mb-4">Understanding Logic Gates</h2>
          
          <div className="space-y-6">
            <p className="text-gray-700">
              Logic gates are the basic building blocks of digital circuits. They implement Boolean functions,
              taking one or more binary inputs and producing a single binary output based on a specific logical operation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Basic Gates</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>AND Gate:</strong> Outputs 1 only when all inputs are 1.</li>
                  <li><strong>OR Gate:</strong> Outputs 1 when at least one input is 1.</li>
                  <li><strong>NOT Gate:</strong> Inverts the input (0 becomes 1, 1 becomes 0).</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-indigo-700 mb-2">Universal Gates</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>NAND Gate:</strong> Combination of AND followed by NOT.</li>
                  <li><strong>NOR Gate:</strong> Combination of OR followed by NOT.</li>
                  <li>These are called "universal" because any logical function can be implemented using only NAND or only NOR gates.</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Applications</h3>
              <p className="text-gray-700">
                Logic gates are used to build more complex digital circuits such as:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Adders and subtractors</li>
                <li>Multiplexers and demultiplexers</li>
                <li>Encoders and decoders</li>
                <li>Flip-flops and latches</li>
                <li>Memory cells</li>
                <li>Processors and microcontrollers</li>
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
              src="https://www.youtube.com/embed/gI-qXk7XojA" 
              title="Logic Gates, Truth Tables, Boolean Algebra" 
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

export default LogicGatesPage;