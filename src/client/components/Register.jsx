import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      await axios.post("/api/auth/register", { username, password });
      window.location.reload();
    } catch (error) {
      console.error("Register error", error);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div
        className="container bg-white shadow rounded p-4"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="new-username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="new-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="new-password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="btn btn-link">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
