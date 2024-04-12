import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

console.log("STARTED")

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
console.log("RENDERING")