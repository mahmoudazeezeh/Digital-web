import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Timer, Award, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  image?: string;
}

const ExamPage = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Sample questions: 15 for each level (easy, medium, hard)
  // In a real application, these questions would be fetched from a database
  const sampleQuestions: Question[] = [
    // Easy questions (15)
    {
      id: 1,
      question: 'What is the binary representation of the decimal number 13?',
      options: ['1101', '1011', '1110', '1111'],
      correctAnswer: 0,
      explanation: 'The decimal number 13 is represented as 1101 in binary (8+4+0+1=13).',
      difficulty: 'easy'
    },
    {
      id: 2,
      question: 'Which logic gate performs the NOT operation?',
      options: ['AND', 'OR', 'NOT', 'XOR'],
      correctAnswer: 2,
      explanation: 'The NOT gate inverts the input value.',
      difficulty: 'easy'
    },
    {
      id: 3,
      question: 'What is the logical value for true in digital circuits?',
      options: ['0', '1', '2', '10'],
      correctAnswer: 1,
      explanation: 'In digital systems, true is represented by 1.',
      difficulty: 'easy'
    },
    {
      id: 4,
      question: 'What is the fundamental component in digital circuits?',
      options: ['Transistor', 'Resistor', 'Capacitor', 'Inductor'],
      correctAnswer: 0,
      explanation: 'The transistor is the basic building block in digital circuits.',
      difficulty: 'easy'
    },
    {
      id: 5,
      question: 'Which gate outputs 1 only when all inputs are 1?',
      options: ['OR', 'NAND', 'AND', 'NOR'],
      correctAnswer: 2,
      explanation: 'The AND gate outputs 1 only if every input is 1.',
      difficulty: 'easy'
    },
    {
      id: 6,
      question: 'What is the binary representation of the decimal number 5?',
      options: ['101', '110', '011', '100'],
      correctAnswer: 0,
      explanation: 'The number 5 is represented as 101 in binary (4+0+1=5).',
      difficulty: 'easy'
    },
    {
      id: 7,
      question: 'What is the role of an Integrated Circuit (IC) in digital circuits?',
      options: ['Power regulation', 'Logical operations', 'Energy storage', 'Frequency modulation'],
      correctAnswer: 1,
      explanation: 'An IC executes logical and arithmetic operations in digital circuits.',
      difficulty: 'easy'
    },
    {
      id: 8,
      question: 'Which of the following can be considered a digital input?',
      options: ['Analog sensor', 'Photocell', 'Switch', 'Speaker'],
      correctAnswer: 2,
      explanation: 'A switch can be used as a digital input (on/off).',
      difficulty: 'easy'
    },
    {
      id: 9,
      question: 'Which component is used to store information in digital memory?',
      options: ['Transistor', 'Diode', 'Capacitor', 'Resistor'],
      correctAnswer: 2,
      explanation: 'Capacitors store charge, and thus information in some digital memory types.',
      difficulty: 'easy'
    },
    {
      id: 10,
      question: 'Which of the following is an XOR gate?',
      options: ['Outputs 1 if inputs are similar', 'Outputs 1 if inputs are different', 'Always outputs 0', 'Always outputs 1'],
      correctAnswer: 1,
      explanation: 'An XOR gate outputs 1 only when its inputs are different.',
      difficulty: 'easy'
    },
    {
      id: 11,
      question: 'Which gate is the inverse of an AND gate?',
      options: ['NAND', 'NOR', 'XOR', 'NOT'],
      correctAnswer: 0,
      explanation: 'The NAND gate is the inversion of the AND gate.',
      difficulty: 'easy'
    },
    {
      id: 12,
      question: 'What is the binary form of the decimal number 9?',
      options: ['1001', '1010', '1100', '1110'],
      correctAnswer: 0,
      explanation: '9 in binary is 1001 (8+0+0+1=9).',
      difficulty: 'easy'
    },
    {
      id: 13,
      question: 'What does the NOT gate do?',
      options: ['Inverts the input value', 'Adds two values', 'Subtracts two values', 'Compares two values'],
      correctAnswer: 0,
      explanation: 'The NOT gate inverts its input from 0 to 1 or vice versa.',
      difficulty: 'easy'
    },
    {
      id: 14,
      question: 'What is the binary representation of the decimal number 2?',
      options: ['10', '11', '01', '00'],
      correctAnswer: 0,
      explanation: 'The decimal number 2 is represented as 10 in binary.',
      difficulty: 'easy'
    },
    {
      id: 15,
      question: 'Which process is used to convert an analog signal to a digital signal?',
      options: ['Frequency modulation', 'Analog-to-digital conversion', 'Amplification', 'Rectification'],
      correctAnswer: 1,
      explanation: 'An Analog-to-Digital Converter (ADC) converts analog signals to digital form.',
      difficulty: 'easy'
    },

    // Medium questions (15)
    {
      id: 16,
      question: 'What is the difference between NAND and NOR gates?',
      options: [
        'NAND outputs 1 when any input is 0',
        'NOR outputs 1 when any input is 0',
        'NAND is the inversion of AND while NOR is the inversion of OR',
        'They function in the same way'
      ],
      correctAnswer: 2,
      explanation: 'A NAND gate is the inversion of an AND gate, while a NOR gate is the inversion of an OR gate.',
      difficulty: 'medium'
    },
    {
      id: 17,
      question: 'How is a transistor used as a switch in digital circuits?',
      options: ['By turning it on and off', 'By adjusting its resistance', 'By increasing current flow', 'By reducing voltage'],
      correctAnswer: 0,
      explanation: 'A transistor functions as a switch by being turned on or off.',
      difficulty: 'medium'
    },
    {
      id: 18,
      question: 'What is the difference between RAM and ROM?',
      options: [
        'RAM is static while ROM is modifiable',
        'RAM is volatile while ROM is non-volatile',
        'RAM is read-only and ROM is write-only',
        'There is no difference'
      ],
      correctAnswer: 1,
      explanation: 'RAM is volatile and loses its contents when power is lost, while ROM is non-volatile.',
      difficulty: 'medium'
    },
    {
      id: 19,
      question: 'What is the role of a clock generator in digital circuits?',
      options: ['Regulating voltage', 'Sequencing events', 'Increasing speed', 'Reducing heat'],
      correctAnswer: 1,
      explanation: 'A clock generator provides timing pulses to control the sequence of operations in the circuit.',
      difficulty: 'medium'
    },
    {
      id: 20,
      question: 'What does the term "bus" refer to in digital computing systems?',
      options: ['A set of wires for data transfer', 'An operating system', 'A graphics processor', 'A user interface'],
      correctAnswer: 0,
      explanation: 'A bus is a group of wires used to transfer data between components.',
      difficulty: 'medium'
    },
    {
      id: 21,
      question: 'What is the binary representation of the decimal number 12?',
      options: ['1100', '1010', '1110', '1001'],
      correctAnswer: 0,
      explanation: 'The decimal number 12 is represented as 1100 in binary (8+4+0+0=12).',
      difficulty: 'medium'
    },
    {
      id: 22,
      question: 'Which circuits are used to convert serial data to parallel data?',
      options: ['Multiplexer', 'Demultiplexer', 'Shift Register', 'Encoder'],
      correctAnswer: 2,
      explanation: 'Shift registers convert serial data into parallel data.',
      difficulty: 'medium'
    },
    {
      id: 23,
      question: 'What distinguishes the XOR gate from other gates?',
      options: [
        'It outputs 1 if the inputs are similar',
        'It outputs 1 if the inputs are different',
        'It always outputs 0',
        'It acts like an AND gate'
      ],
      correctAnswer: 1,
      explanation: 'The XOR gate outputs 1 only when its inputs differ.',
      difficulty: 'medium'
    },
    {
      id: 24,
      question: 'What is the primary use of counter circuits in digital systems?',
      options: ['Time keeping', 'Counting events', 'Voltage regulation', 'Data storage'],
      correctAnswer: 1,
      explanation: 'Counters are used to count events or pulses.',
      difficulty: 'medium'
    },
    {
      id: 25,
      question: 'What is the difference between SRAM and DRAM?',
      options: [
        'SRAM is faster and more expensive',
        'DRAM is faster and more expensive',
        'SRAM consumes less power',
        'There is no difference'
      ],
      correctAnswer: 0,
      explanation: 'SRAM is faster but more expensive compared to DRAM.',
      difficulty: 'medium'
    },
    {
      id: 26,
      question: 'Which of the following represents a valid hexadecimal number?',
      options: ['0x1A', '0b1010', '0o17', '0d123'],
      correctAnswer: 0,
      explanation: '0x1A is the hexadecimal representation for the number 26.',
      difficulty: 'medium'
    },
    {
      id: 27,
      question: 'What is the purpose of a multiplexer in digital circuits?',
      options: [
        'Data splitting',
        'Combining multiple signals into one data path',
        'Converting analog signals',
        'Data storage'
      ],
      correctAnswer: 1,
      explanation: 'A multiplexer combines several signals into a single data line.',
      difficulty: 'medium'
    },
    {
      id: 28,
      question: 'Which technique is used to reduce power consumption in digital circuits?',
      options: [
        'Cooling methods',
        'Dynamic range technique',
        'Partial shutdown (Power Gating)',
        'Amplification'
      ],
      correctAnswer: 2,
      explanation: 'Power gating is used to reduce power consumption by partially shutting down parts of the circuit.',
      difficulty: 'medium'
    },
    {
      id: 29,
      question: 'What is the function of a decoder in digital systems?',
      options: [
        'Convert binary signals to analog signals',
        'Translate binary code into a comprehensible format',
        'Encode data',
        'Regulate voltage'
      ],
      correctAnswer: 1,
      explanation: 'A decoder converts binary codes into a more understandable or specific output format.',
      difficulty: 'medium'
    },
    {
      id: 30,
      question: 'What characterizes serial interfaces in digital systems?',
      options: [
        'Data is transferred in parallel',
        'Data is transferred sequentially over time',
        'They use many wires',
        'They are not configurable'
      ],
      correctAnswer: 1,
      explanation: 'Serial interfaces transfer data sequentially over a single or few wires.',
      difficulty: 'medium'
    },

    // Hard questions (15)
    {
      id: 31,
      question: 'Explain how a DRAM cell works and mention a key component for its refresh process.',
      options: [
        'Using capacitors to store and discharge charge',
        'Using transistors to store data',
        'Using only XOR gates',
        'Using resistors'
      ],
      correctAnswer: 0,
      explanation: 'DRAM uses capacitors to store charge and requires periodic refreshing of each cell.',
      difficulty: 'hard'
    },
    {
      id: 32,
      question: 'What is the role of noise reduction techniques in high-speed digital circuit design?',
      options: [
        'Improving performance and reducing errors',
        'Increasing power consumption',
        'Converting signals to analog',
        'Increasing noise'
      ],
      correctAnswer: 0,
      explanation: 'Noise reduction techniques enhance signal quality and reduce transmission errors in high-speed circuits.',
      difficulty: 'hard'
    },
    {
      id: 33,
      question: 'How can effective synchronization be achieved between multiple digital circuits in a complex system?',
      options: [
        'By using PLL circuits',
        'By using resistors only',
        'By increasing voltage',
        'By using analog converters'
      ],
      correctAnswer: 0,
      explanation: 'Phase Locked Loop (PLL) circuits are used for effective synchronization in complex systems.',
      difficulty: 'hard'
    },
    {
      id: 34,
      question: 'Explain the concept of "timing constraint" in digital system design.',
      options: [
        'It is the time required to load a page',
        'It is the minimum time needed for a signal to propagate to ensure proper operation',
        'It is the response time for user interactions',
        'It is the duration for power saving'
      ],
      correctAnswer: 1,
      explanation: 'Timing constraints define the minimum propagation time needed to ensure stable signal transitions within the circuit.',
      difficulty: 'hard'
    },
    {
      id: 35,
      question: 'What is the difference between sequential design and combinational design?',
      options: [
        'Sequential design relies on memory elements',
        'Combinational design relies on timing sequences',
        'Neither depends on time',
        'There is no difference'
      ],
      correctAnswer: 0,
      explanation: 'Sequential design uses memory and timing elements, whereas combinational design is based solely on logic gates.',
      difficulty: 'hard'
    },
    {
      id: 36,
      question: 'How do designers address glitches in digital circuits?',
      options: [
        'By using analog filters',
        'By applying digital filtering techniques and careful design',
        'By increasing voltage',
        'By increasing clock speed'
      ],
      correctAnswer: 1,
      explanation: 'Digital filtering techniques and precise design practices help minimize glitches in circuits.',
      difficulty: 'hard'
    },
    {
      id: 37,
      question: 'What is the principle behind FPGA operation in digital circuit design?',
      options: [
        'Programming fixed components',
        'Reconfiguring its internal architecture to form custom circuits',
        'Using only pre-made circuits',
        'Manually adjusting voltage levels'
      ],
      correctAnswer: 1,
      explanation: 'An FPGA allows for reprogramming of its internal architecture to implement custom digital circuits.',
      difficulty: 'hard'
    },
    {
      id: 38,
      question: 'Explain how parallelism is achieved in data processing within digital circuits.',
      options: [
        'By only increasing clock frequency',
        'By using multiple processing units concurrently',
        'By reducing the number of inputs',
        'Parallelism is not achievable in digital circuits'
      ],
      correctAnswer: 1,
      explanation: 'Using multiple processing units concurrently enables parallel data processing in digital circuits.',
      difficulty: 'hard'
    },
    {
      id: 39,
      question: 'What is one of the main challenges when designing high-frequency circuits?',
      options: [
        'Heat management',
        'Minimizing circuit size',
        'Increasing the number of wires',
        'Improving sound quality'
      ],
      correctAnswer: 0,
      explanation: 'Managing heat dissipation is one of the key challenges in high-frequency circuit design.',
      difficulty: 'hard'
    },
    {
      id: 40,
      question: 'How does propagation delay affect digital circuit performance?',
      options: [
        'It speeds up the circuit',
        'It reduces response time and affects synchronization',
        'It has no effect',
        'It increases power consumption'
      ],
      correctAnswer: 1,
      explanation: 'Propagation delay can adversely affect circuit synchronization and response time.',
      difficulty: 'hard'
    },
    {
      id: 41,
      question: 'What is the role of an ADC in digital circuits?',
      options: [
        'Converting analog signals to digital',
        'Converting digital signals to analog',
        'Storing data',
        'Generating clock pulses'
      ],
      correctAnswer: 0,
      explanation: 'An Analog-to-Digital Converter (ADC) converts analog signals into digital form.',
      difficulty: 'hard'
    },
    {
      id: 42,
      question: 'What makes designing digital circuits for vehicles more complex compared to other electronics?',
      options: [
        'Fewer components are used',
        'Multiple timing and operational standards',
        'Lower power requirements',
        'Easier cooling methods'
      ],
      correctAnswer: 1,
      explanation: 'The complexity arises from the multiple timing and operational requirements in automotive digital circuits.',
      difficulty: 'hard'
    },
    {
      id: 43,
      question: 'Briefly explain the concept of "resynchronization" in digital circuits.',
      options: [
        'It is resetting the power supply',
        'It is the process of re-synchronizing digital signals to avoid errors',
        'It is a technique to speed up the circuit',
        'It is changing the clock frequency'
      ],
      correctAnswer: 1,
      explanation: 'Resynchronization involves re-aligning digital signals to prevent timing errors.',
      difficulty: 'hard'
    },
    {
      id: 44,
      question: 'What is the primary effect of the "loading" phenomenon on digital circuit performance?',
      options: [
        'Increases power consumption',
        'Reduces signal transition speed',
        'Causes audio distortion',
        'Improves voltage stability'
      ],
      correctAnswer: 1,
      explanation: 'Loading affects the speed of signal propagation, leading to delays in response times.',
      difficulty: 'hard'
    },
    {
      id: 45,
      question: 'What is the operating principle of noise filtering circuits in digital systems?',
      options: [
        'Using RC circuits to reduce interference',
        'Randomly increasing frequency',
        'Decoupling components',
        'Temporarily storing data'
      ],
      correctAnswer: 0,
      explanation: 'RC circuits are used in noise filtering to reduce interference and improve signal clarity.',
      difficulty: 'hard'
    }
  ];

  useEffect(() => {
    if (examStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [examStarted, timeLeft]);

  const startExam = (selectedDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(selectedDifficulty);
    const filteredQuestions = sampleQuestions.filter(q => q.difficulty === selectedDifficulty);
    // Select only the first 15 questions for the chosen difficulty
    setQuestions(filteredQuestions.slice(0, 15));
    setExamStarted(true);
    setSelectedAnswers(new Array(15).fill(-1));
    setTimeLeft(900); // 15 minutes in seconds
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = questions.reduce((count, question, index) => {
      return count + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    setScore(correctAnswers);
    setExamSubmitted(true);
  };

  const resetExam = () => {
    setDifficulty(null);
    setExamStarted(false);
    setExamSubmitted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScore(0);
    setTimeLeft(900);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <GraduationCap className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Digital Logic Design Exam</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Test your knowledge of digital logic design concepts. Choose your difficulty level to begin.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => startExam(level)}
                className={`p-6 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 ${
                  level === 'easy' ? 'bg-green-500 hover:bg-green-600' :
                  level === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' :
                  'bg-red-500 hover:bg-red-600'
                } text-white`}
              >
                <h2 className="text-2xl font-bold mb-2 capitalize">{level}</h2>
                <p className="text-sm opacity-90">15 questions • 15 minutes</p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  if (examSubmitted) {
    const percentage = (score / questions.length) * 100;
    const getScoreColor = () => {
      if (percentage >= 80) return 'bg-green-100 text-green-800';
      if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
      return 'bg-red-100 text-red-800';
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="text-center mb-8">
              <Award className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Exam Results</h2>
              <div className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${getScoreColor()}`}>
                Score: {score}/{questions.length} ({percentage.toFixed(1)}%)
              </div>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-3">
                    {index + 1}. {question.question}
                  </p>
                  {question.image && (
                    <img 
                      src={question.image} 
                      alt={`Question ${index + 1}`} 
                      className="mb-3 rounded-lg"
                    />
                  )}
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex}
                        className={`p-2 rounded ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-100 text-green-800'
                            : selectedAnswers[index] === optionIndex
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-50'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={resetExam}
              className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Take Another Exam
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {difficulty} Level Exam
            </h2>
            <div className="flex items-center text-gray-600">
              <Timer className="h-5 w-5 mr-2" />
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{selectedAnswers.filter(a => a !== -1).length} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {questions[currentQuestionIndex] && (
            <div>
              <p className="text-lg font-medium text-gray-900 mb-6">
                {questions[currentQuestionIndex].question}
              </p>
              
              {questions[currentQuestionIndex].image && (
                <img 
                  src={questions[currentQuestionIndex].image} 
                  alt={`Question ${currentQuestionIndex + 1}`} 
                  className="mb-6 rounded-lg"
                />
              )}

              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg transition-colors ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'bg-indigo-100 border-2 border-indigo-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
