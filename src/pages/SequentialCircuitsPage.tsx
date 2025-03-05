import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SequentialCircuitsPage = () => {
  const [flipFlopType, setFlipFlopType] = useState('jk');
  const [inputJ, setInputJ] = useState(false);
  const [inputK, setInputK] = useState(false);
  const [inputD, setInputD] = useState(false);
  const [inputT, setInputT] = useState(false);
  const [currentState, setCurrentState] = useState(false);
  const [nextState, setNextState] = useState(false);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Calculate next state based on flip-flop type and inputs
  const calculateNextState = () => {
    let next = false;
    
    switch (flipFlopType) {
      case 'jk':
        if (inputJ && inputK) {
          next = !currentState; // Toggle
        } else if (inputJ) {
          next = true;
        } else if (inputK) {
          next = false;
        } else {
          next = currentState; // No change
        }
        break;
      case 'd':
        next = inputD;
        break;
      case 't':
        if (inputT) {
          next = !currentState; // Toggle
        } else {
          next = currentState; // No change
        }
        break;
      default:
        next = currentState;
    }
    
    setNextState(next);
  };

  // Handle clock pulse
  const handleClockPulse = () => {
    calculateNextState();
    setCurrentState(nextState);
  };

  // Reset flip-flop
  const handleReset = () => {
    setCurrentState(false);
    setNextState(false);
  };

  // Get flip-flop circuit diagram based on type
  const getFlipFlopDiagram = () => {
    switch (flipFlopType) {
      case 'jk':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect x="60" y="20" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="100" y="60" textAnchor="middle" dominantBaseline="middle" fontSize="14">JK FF</text>
            <text x="100" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="12">CLK</text>
            
            {/* Inputs */}
            <line x1="30" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="2" />
            <text x="45" y="25" textAnchor="middle" dominantBaseline="middle" fontSize="12">J</text>
            <circle cx="30" cy="30" r={inputJ ? "4" : "3"} fill={inputJ ? "#4F46E5" : "#E5E7EB"} />
            
            <line x1="30" y1="90" x2="60" y2="90" stroke="currentColor" strokeWidth="2" />
            <text x="45" y="95" textAnchor="middle" dominantBaseline="middle" fontSize="12">K</text>
            <circle cx="30" cy="90" r={inputK ? "4" : "3"} fill={inputK ? "#4F46E5" : "#E5E7EB"} />
            
            {/* Clock */}
            <line x1="30" y1="60" x2="60" y2="60" stroke="currentColor" strokeWidth="2" />
            <path d="M40,55 L50,60 L40,65" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Outputs */}
            <line x1="140" y1="30" x2="170" y2="30" stroke="currentColor" strokeWidth="2" />
            <text x="155" y="25" textAnchor="middle" dominantBaseline="middle" fontSize="12">Q</text>
            <circle cx="170" cy="30" r={currentState ? "4" : "3"} fill={currentState ? "#4F46E5" : "#E5E7EB"} />
            
            <line x1="140" y1="90" x2="170" y2="90" stroke="currentColor" strokeWidth="2" />
            <text x="155" y="95" textAnchor="middle" dominantBaseline="middle" fontSize="12">Q'</text>
            <circle cx="170" cy="90" r={!currentState ? "4" : "3"} fill={!currentState ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      case 'd':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect x="60" y="20" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="100" y="60" textAnchor="middle" dominantBaseline="middle" fontSize="14">D FF</text>
            <text x="100" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="12">CLK</text>
            
            {/* Inputs */}
            <line x1="30" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
            <text x="45" y="35" textAnchor="middle" dominantBaseline="middle" fontSize="12">D</text>
            <circle cx="30" cy="40" r={inputD ? "4" : "3"} fill={inputD ? "#4F46E5" : "#E5E7EB"} />
            
            {/* Clock */}
            <line x1="30" y1="60" x2="60" y2="60" stroke="currentColor" strokeWidth="2" />
            <path d="M40,55 L50,60 L40,65" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Outputs */}
            <line x1="140" y1="40" x2="170" y2="40" stroke="currentColor" strokeWidth="2" />
            <text x="155" y="35" textAnchor="middle" dominantBaseline="middle" fontSize="12">Q</text>
            <circle cx="170" cy="40" r={currentState ? "4" : "3"} fill={currentState ? "#4F46E5" : "#E5E7EB"} />
            
            <line x1="140" y1="80" x2="170" y2="80" stroke="currentColor" strokeWidth="2" />
            <text x="155" y="85" textAnchor="middle" dominantBaseline="middle" fontSize="12">Q'</text>
            <circle cx="170" cy="80" r={!currentState ? "4" : "3"} fill={!currentState ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      case 't':
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect x="60" y="20" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
            <text x="100" y="60" textAnchor="middle" dominantBaseline="middle" fontSize="14">T FF</text>
            <text x="100" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="12">CLK</text>
            
            {/* Inputs */}
            <line x1="30" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="2" />
            <text x="45" y="35" textAnchor="middle" dominantBaseline="middle" fontSize="12">T</text>
            <circle cx="30" cy="40" r={inputT ? "4" : "3"} fill={inputT ? "#4F46E5" : "#E5E7EB"} />
            
            {/* Clock */}
            <line x1="30" y1="60" x2="60" y2="60" stroke="currentColor" strokeWidth="2" />
            <path d="M40,55 L50,60 L40,65" fill="none" stroke="currentColor" strokeWidth="1" />
            
            {/* Outputs */}
            <line x1="140" y1="40" x2="170" y2="40" stroke="currentColor" strokeWidth="2" />
            <text x="155" y="35" textAnchor="middle" dominantBaseline="middle" fontSize="12">Q</text>
            <circle cx="170" cy="40" r={currentState ? "4" : "3"} fill={currentState ? "#4F46E5" : "#E5E7EB"} />
            
            <line x1="140" y1="80" x2="170" y2="80" stroke="currentColor" strokeWidth="2" />
            <text x="155" y="85" textAnchor="middle" dominantBaseline="middle" fontSize="12">Q'</text>
            <circle cx="170" cy="80" r={!currentState ? "4" : "3"} fill={!currentState ? "#4F46E5" : "#E5E7EB"} />
          </svg>
        );
      default:
        return null;
    }
  };

  // Truth tables for different flip-flops
  const getTruthTable = () => {
    switch (flipFlopType) {
      case 'jk':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">J</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">K</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q(t)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q(t+1)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">No change</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">No change</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Reset</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Reset</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Set</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Set</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Toggle</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Toggle</td>
              </tr>
            </tbody>
          </table>
        );
      case 'd':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q(t+1)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Reset</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Set</td>
              </tr>
            </tbody>
          </table>
        );
      case 't':
        return (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">T</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q(t)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q(t+1)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">No change</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">No change</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Toggle</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">1</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Toggle</td>
              </tr>
            </tbody>
          </table>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sequential Circuits & Flip-Flops</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore sequential circuits and flip-flops, the building blocks of memory and state in digital systems.
            Unlike combinational circuits, sequential circuits have memory and their outputs depend on both current inputs and previous states.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Flip-Flop Simulator */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Flip-Flop Simulator</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select Flip-Flop Type:</label>
              <select
                value={flipFlopType}
                onChange={(e) => setFlipFlopType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="jk">JK Flip-Flop</option>
                <option value="d">D Flip-Flop</option>
                <option value="t">T Flip-Flop</option>
              </select>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Inputs:</h3>
              
              {flipFlopType === 'jk' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Input J:</label>
                    <div className="flex items-center">
                      <button
                        onClick={() => setInputJ(false)}
                        className={`w-1/2 py-2 rounded-l ${!inputJ ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        0
                      </button>
                      <button
                        onClick={() => setInputJ(true)}
                        className={`w-1/2 py-2 rounded-r ${inputJ ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        1
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Input K:</label>
                    <div className="flex items-center">
                      <button
                        onClick={() => setInputK(false)}
                        className={`w-1/2 py-2 rounded-l ${!inputK ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        0
                      </button>
                      <button
                        onClick={() => setInputK(true)}
                        className={`w-1/2 py-2 rounded-r ${inputK ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        1
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {flipFlopType === 'd' && (
                <div>
                  <label className="block text-gray-700 mb-1">Input D:</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setInputD(false)}
                      className={`w-1/2 py-2 rounded-l ${!inputD ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      0
                    </button>
                    <button
                      onClick={() => setInputD(true)}
                      className={`w-1/2 py-2 rounded-r ${inputD ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      1
                    </button>
                  </div>
                </div>
              )}
              
              {flipFlopType === 't' && (
                <div>
                  <label className="block text-gray-700 mb-1">Input T:</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setInputT(false)}
                      className={`w-1/2 py-2 rounded-l ${!inputT ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      0
                    </button>
                    <button
                      onClick={() => setInputT(true)}
                      className={`w-1/2 py-2 rounded-r ${inputT ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      1
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Current State:</h3>
              <div className={`p-4 rounded text-center font-bold text-white ${currentState ? 'bg-indigo-600' : 'bg-gray-500'}`}>
                Q = {currentState ? '1' : '0'}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Next State:</h3>
              <div className={`p-4 rounded text-center font-bold text-white ${nextState ? 'bg-indigo-600' : 'bg-gray-500'}`}>
                Q(next) = {nextState ? '1' : '0'}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={calculateNextState}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Calculate Next State
              </button>
              <button
                onClick={handleClockPulse}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Apply Clock Pulse
              </button>
            </div>
            
            <button
              onClick={handleReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Reset
            </button>
            
            <div className="h-48 mt-6 text-indigo-800">
              {getFlipFlopDiagram()}
            </div>
          </motion.div>
          
          {/* Truth Table */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Truth Table & Information</h2>
            
            <div className="mb-6 overflow-x-auto">
              {getTruthTable()}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Flip-Flop Description:</h3>
              <div className="p-4 bg-gray-50 rounded">
                {flipFlopType === 'jk' && (
                  <div>
                    <h4 className="font-medium text-indigo-700 mb-1">JK Flip-Flop</h4>
                    <p className="text-gray-700">
                      The JK flip-flop is a universal flip-flop that can be configured to work as any other type.
                      It has two inputs, J (Set) and K (Reset), and its behavior depends on both inputs:
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-gray-700">
                      <li>When J=0, K=0: No change (maintains current state)</li>
                      <li>When J=0, K=1: Reset (output becomes 0)</li>
                      <li>When J=1, K=0: Set (output becomes 1)</li>
                      <li>When J=1, K=1: Toggle (output inverts)</li>
                    </ul>
                  </div>
                )}
                
                {flipFlopType === 'd' && (
                  <div>
                    <h4 className="font-medium text-indigo-700 mb-1">D Flip-Flop</h4>
                    <p className="text-gray-700">
                      The D (Data) flip-flop is the simplest type with only one input. It's often used as a basic
                      memory element or delay line. The output simply follows the input at the clock edge:
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-gray-700">
                      <li>When D=0: Output becomes 0</li>
                      <li>When D=1: Output becomes 1</li>
                    </ul>
                  </div>
                )}
                
                {flipFlopType === 't' && (
                  <div>
                    <h4 className="font-medium text-indigo-700 mb-1">T Flip-Flop</h4>
                    <p className="text-gray-700">
                      The T (Toggle) flip-flop has one input that controls whether the output toggles or remains unchanged.
                      It's commonly used in counters and frequency dividers:
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-gray-700">
                      <li>When T=0: No change (maintains current state)</li>
                      <li>When T=1: Toggle (output inverts)</li>
                    </ul>
                  </div>
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
          <h2 className="text-2xl font-semibold mb-4">Understanding Sequential Circuits</h2>
          
          <div className="space-y-6">
            <p className="text-gray-700">
              Sequential circuits are digital circuits whose outputs depend not only on the current inputs but also on the
              past inputs (history). They have memory elements that store information about previous states, making them
              fundamental for creating systems with memory and state.
            </p>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Flip-Flops vs. Latches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Latches</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Level-sensitive devices</li>
                    <li>Change state whenever inputs change (while enabled)</li>
                    <li>Simpler but less stable in complex systems</li>
                    <li>Examples: SR Latch, D Latch</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Flip-Flops</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Edge-triggered devices</li>
                    <li>Change state only at specific clock transitions</li>
                    <li>More stable and predictable in complex systems</li>
                    <li>Examples: JK, D, T Flip-Flops</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Applications of Sequential Circuits</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Registers:</strong> Store multiple bits of data using arrays of flip-flops.</li>
                <li><strong>Counters:</strong> Count events or clock pulses, used in timers and frequency dividers.</li>
                <li><strong>Memory Units:</strong> RAM, ROM, and other memory types use sequential elements.</li>
                <li><strong>State Machines:</strong> Control systems that transition between defined states based on inputs.</li>
                <li><strong>Shift Registers:</strong> Move data serially through a series of flip-flops.</li>
                <li><strong>Synchronizers:</strong> Prevent metastability when signals cross clock domains.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Synchronous vs. Asynchronous Circuits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Synchronous</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>All state changes occur at the same time (clock edge)</li>
                    <li>More predictable behavior</li>
                    <li>Easier to design and analyze</li>
                    <li>Used in most modern digital systems</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Asynchronous</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>State changes can occur at any time</li>
                    <li>No global clock signal</li>
                    <li>Can be faster but harder to design</li>
                    <li>More susceptible to timing issues</li>
                  </ul>
                </div>
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
              src="https://www.youtube.com/embed/FKvnmxte98A" 
              title="Flip-Flops and Sequential Circuits" 
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

export default SequentialCircuitsPage;