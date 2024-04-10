import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import DeliveryLog from './deliveryLog';

const Routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/delivery-log" element={<DeliveryLog />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};


export default Routes;
