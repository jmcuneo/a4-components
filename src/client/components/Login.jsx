import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (verifyAuth) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      if (response.data.isAuthenticated) {
        verifyAuth();
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Login failed: " + error.response.data.message);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div
        className="container bg-white shadow rounded p-4"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="btn btn-link">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
