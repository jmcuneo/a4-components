import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeliveryLog from './deliveryLog';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/delivery-log" element={<DeliveryLog />} />
      </Routes>
    </Router>
  );
};

export default App;
