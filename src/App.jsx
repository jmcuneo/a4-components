import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeliveryLog from './components/deliveryLog';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route
        exact
        path="/login"
        element={<Login />}
      />
      <Route
        exact
        path="/delivery-log"
        element={<DeliveryLog />}
      />
      <Route
        exact
        path="/"
        element={<Login />}
      />
      </Routes>
    </Router>
  );
};

export default App;
