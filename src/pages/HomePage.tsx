import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Binary, 
  CircuitBoard, 
  Code, 
  Cpu, 
  FlipHorizontal,
  FunctionSquare, // Changed from Function to FunctionSquare
  GraduationCap 
} from 'lucide-react';

const HomePage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const topics = [
    {
      title: 'Number Systems',
      description: 'Learn about decimal, binary, octal, and hexadecimal number systems and how to convert between them.',
      icon: <Binary className="h-10 w-10 text-indigo-500" />,
      path: '/number-systems'
    },
    {
      title: 'Logic Gates',
      description: 'Explore the fundamental building blocks of digital circuits: AND, OR, NOT, XOR, and more.',
      icon: <CircuitBoard className="h-10 w-10 text-indigo-500" />,
      path: '/logic-gates'
    },
    {
      title: 'Boolean Expressions',
      description: 'Master Boolean algebra and learn how to simplify complex logical expressions.',
      icon: <FunctionSquare className="h-10 w-10 text-indigo-500" />, // Updated icon usage
      path: '/boolean-expressions'
    },
    {
      title: 'Code Conversions',
      description: 'Convert between different binary codes including Gray Code, BCD, and Excess-3.',
      icon: <Code className="h-10 w-10 text-indigo-500" />,
      path: '/code-conversions'
    },
    {
      title: 'Complements',
      description: 'Understand 1\'s and 2\'s complements and their applications in digital arithmetic.',
      icon: <FlipHorizontal className="h-10 w-10 text-indigo-500" />,
      path: '/complements'
    },
    {
      title: 'Sequential Circuits',
      description: 'Learn about flip-flops, registers, counters, and other sequential digital components.',
      icon: <Cpu className="h-10 w-10 text-indigo-500" />,
      path: '/sequential-circuits'
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-90"></div>
        <div 
          className="relative h-[70vh] flex items-center justify-center bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Digital Logic Design
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Master the fundamentals of digital systems through interactive learning
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                to="/exam" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 inline-block mr-4"
              >
                Take Exam
              </Link>
              <Link 
                to="/number-systems" 
                className="bg-transparent hover:bg-white hover:text-indigo-900 text-white font-bold py-3 px-8 rounded-full border-2 border-white transition-colors duration-300 inline-block"
              >
                Start Learning
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Digital Logic Design</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This interactive course will guide you through the fundamental concepts of digital logic design,
              from basic number systems to complex sequential circuits. Whether you're a beginner or looking to refresh your knowledge,
              our interactive tools and comprehensive explanations will help you master these essential concepts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Topics</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dive into various aspects of digital logic design through our interactive modules.
              Each topic includes detailed explanations, interactive tools, and practice exercises.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {topics.map((topic, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={topic.path}>
                  <div className="p-6">
                    <div className="mb-4">{topic.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
                    <p className="text-gray-600">{topic.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Exam Section */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Test Your Knowledge</h2>
              <p className="text-lg text-indigo-200 mb-6">
                Ready to challenge yourself? Take our comprehensive exam with questions ranging from easy to hard difficulty levels.
                Get instant feedback and track your progress as you master digital logic design concepts.
              </p>
              <Link 
                to="/exam" 
                className="bg-white text-indigo-900 hover:bg-indigo-100 font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 inline-flex items-center"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Start Exam
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-indigo-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Exam Features:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-indigo-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Three difficulty levels: Easy, Medium, and Hard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>30 questions per difficulty level</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Instant feedback with detailed explanations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Visual results with performance analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;