import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './LoginPage';
import CalculatorPage from './CalculatorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/calc" element={<CalculatorPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
