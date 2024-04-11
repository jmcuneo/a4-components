import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// import Home from "./Home"; // Your home page component
// import Login from "./Login"; // Your login component
// import Register from "./Register"; // Your register component

// Hook to check authentication status
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get("/auth/check");
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  return { isAuthenticated, isLoading };
};

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a loading indicator or handle the loading state appropriately until the auth status is determined
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <h1>Login</h1>}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <h1>Register</h1>}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? <h1>Home Page</h1> : <Navigate to="/login" />
          }
        />
        {/* Redirect all other routes based on authentication status */}
        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
