import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NumberSystemPage from './pages/NumberSystemPage';
import LogicGatesPage from './pages/LogicGatesPage';
import BooleanExpressionPage from './pages/BooleanExpressionPage';
import CodeConversionsPage from './pages/CodeConversionsPage';
import ComplementsPage from './pages/ComplementsPage';
import SequentialCircuitsPage from './pages/SequentialCircuitsPage';
import ExamPage from './pages/ExamPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/number-systems" element={<NumberSystemPage />} />
            <Route path="/logic-gates" element={<LogicGatesPage />} />
            <Route path="/boolean-expressions" element={<BooleanExpressionPage />} />
            <Route path="/code-conversions" element={<CodeConversionsPage />} />
            <Route path="/complements" element={<ComplementsPage />} />
            <Route path="/sequential-circuits" element={<SequentialCircuitsPage />} />
            <Route path="/exam" element={<ExamPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;