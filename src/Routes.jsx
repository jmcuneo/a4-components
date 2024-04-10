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
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
