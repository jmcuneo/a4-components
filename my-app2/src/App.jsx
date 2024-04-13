import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import Results from './components/Results';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />

        <Route path="/Results" element={<Results />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
