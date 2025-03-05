import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BooleanExpressionPage = () => {
  const [expression, setExpression] = useState('');
  const [simplifiedExpression, setSimplifiedExpression] = useState('');
  const [error, setError] = useState('');
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Function to simplify Boolean expressions
  // This is a simplified implementation that handles some basic cases
  const simplifyExpression = () => {
    if (!expression) {
      setError('Please enter a Boolean expression');
      return;
    }

    setError('');
    
    try {
      // Remove all spaces
      let expr = expression.replace(/\s+/g, '');
      
      // Basic simplification rules
      
      // A + 0 = A
      expr = expr.replace(/([A-Za-z])\+0/g, '$1');
      expr = expr.replace(/0\+([A-Za-z])/g, '$1');
      
      // A + 1 = 1
      expr = expr.replace(/([A-Za-z])\+1/g, '1');
      expr = expr.replace(/1\+([A-Za-z])/g, '1');
      
      // A · 0 = 0
      expr = expr.replace(/([A-Za-z])\*0/g, '0');
      expr = expr.replace(/0\*([A-Za-z])/g, '0');
      
      // A · 1 = A
      expr = expr.replace(/([A-Za-z])\*1/g, '$1');
      expr = expr.replace(/1\*([A-Za-z])/g, '$1');
      
      // A + A = A
      expr = expr.replace(/([A-Za-z])\+\1/g, '$1');
      
      // A · A = A
      expr = expr.replace(/([A-Za-z])\*\1/g, '$1');
      
      // A + A' = 1
      expr = expr.replace(/([A-Za-z])\+\1'/g, '1');
      expr = expr.replace(/([A-Za-z])'\+\1/g, '1');
      
      // A · A' = 0
      expr = expr.replace(/([A-Za-z])\*\1'/g, '0');
      expr = expr.replace(/([A-Za-z])'\*\1/g, '0');
      
      // Double negation: A'' = A
      expr = expr.replace(/([A-Za-z])''/g, '$1');
      
      // De Morgan's laws (simplified versions)
      // (A+B)' = A'·B'
      expr = expr.replace(/\(([A-Za-z])\+([A-Za-z])\)'/g, "$1'*$2'");
      
      // (A·B)' = A'+B'
      expr = expr.replace(/\(([A-Za-z])\*([A-Za-z])\)'/g, "$1'+$2'");
      
      setSimplifiedExpression(expr);
    } catch (err) {
      setError('Error simplifying expression. Please check your syntax.');
    }
  };

  // Examples of Boolean expressions and their simplifications
  const examples = [
    { original: 'A + 0', simplified: 'A' },
    { original: 'A * 1', simplified: 'A' },
    { original: 'A + A', simplified: 'A' },
    { original: 'A * A', simplified: 'A' },
    { original: 'A + A\'', simplified: '1' },
    { original: 'A * A\'', simplified: '0' },
    { original: '(A + B)\'', simplified: 'A\' * B\'' },
    { original: '(A * B)\'', simplified: 'A\' + B\'' }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Boolean Expression Simplification</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simplify Boolean expressions using algebraic rules. Boolean algebra is fundamental to digital logic design
            and helps in creating efficient digital circuits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Simplification Tool */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Expression Simplifier</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Enter Boolean Expression:</label>
              <div className="mb-2 text-sm text-gray-500">
                Use + for OR, * for AND, and ' for NOT (e.g., A + B*C')
              </div>
              <textarea
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                placeholder="Enter a Boolean expression (e.g., A + A*B)"
              />
            </div>
            
            <button
              onClick={simplifyExpression}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Simplify
            </button>
            
            {error && (
              <p className="mt-4 text-red-500">{error}</p>
            )}
            
            {simplifiedExpression && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Simplified Expression:</h3>
                <div className="p-4 bg-gray-50 rounded text-lg font-mono">
                  {simplifiedExpression}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Examples and Rules */}
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-4">Examples & Rules</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Common Simplifications:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Simplified</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {examples.map((example, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">{example.original}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">{example.simplified}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Boolean Algebra Rules:</h3>
              <div className="space-y-3 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Identity Laws:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>A + 0 = A</li>
                    <li>A · 1 = A</li>
                  </ul>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Null Laws:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>A + 1 = 1</li>
                    <li>A · 0 = 0</li>
                  </ul>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Idempotent Laws:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>A + A = A</li>
                    <li>A · A = A</li>
                  </ul>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <strong>Complement Laws:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>A + A' = 1</li>
                    <li>A · A' = 0</li>
                  </ul>
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <strong>De Morgan's Laws:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>(A + B)' = A' · B'</li>
                    <li>(A · B)' = A' + B'</li>
                  </ul>
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
          <h2 className="text-2xl font-semibold mb-4">Understanding Boolean Algebra</h2>
          
          <div className="space-y-6">
            <p className="text-gray-700">
              Boolean algebra is a branch of algebra where the variables have two possible values: true (1) or false (0).
              It forms the foundation of digital logic design and is essential for designing and analyzing digital circuits.
            </p>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Basic Operations</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>AND (·):</strong> The output is true only when all inputs are true.</li>
                <li><strong>OR (+):</strong> The output is true when at least one input is true.</li>
                <li><strong>NOT ('):</strong> The output is the opposite of the input.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Simplification Methods</h3>
              <p className="text-gray-700">
                There are several methods to simplify Boolean expressions:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Algebraic Manipulation:</strong> Using Boolean algebra laws to simplify expressions step by step.</li>
                <li><strong>Karnaugh Maps (K-Maps):</strong> A graphical method that uses adjacent cells to identify and eliminate redundant terms.</li>
                <li><strong>Quine-McCluskey Method:</strong> A tabular method for minimizing Boolean functions, more systematic than K-Maps for complex expressions.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-indigo-700 mb-2">Why Simplify Boolean Expressions?</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><strong>Reduced Circuit Complexity:</strong> Fewer gates mean simpler circuits.</li>
                <li><strong>Lower Cost:</strong> Simpler circuits require fewer components.</li>
                <li><strong>Improved Performance:</strong> Fewer gates result in faster operation and less power consumption.</li>
                <li><strong>Enhanced Reliability:</strong> Simpler circuits are generally more reliable.</li>
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
              src="https://youtu.be/0as464WmfCo?si=H28MAGgsugmqM0hz" 
              title="Boolean Algebra Simplification" 
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

export default BooleanExpressionPage;