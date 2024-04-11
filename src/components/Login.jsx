import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom"
import 'materialize-css/dist/css/materialize.min.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Logging in...');

    try {
      const response = await fetch('//localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Login failed'); // Display the specific error message
        throw new Error('Login failed');
      } 

      const data = await response.json();
      setMessage("Logging In...");
      //const newUrl = `/main?text=${encodeURIComponent(data.username)}`;

      //console.log("Navigating");  
      navigate("/delivery-log");

    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login failed: ' + error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage('Registering');

    try {
      const response = await fetch('//localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! You can now log in.');
      } else {
        setMessage('Registration failed. Please try again: ' + data.message);
      }

    } catch (error) {
      console.error('Registration error:', error);
      setMessage('An error occurred during registration: ' + error);
    }
  };

  return (
    <div className="row" style={{ marginLeft: '20px' }}> 
      <h1 style={{ marginLeft: '30px' }}>Food Delivery Log Sign-In</h1> 
      <form className="col s12" id="loginForm" onSubmit={handleSubmit}>
        <div className="col"> 
        <div className="input-field col s6">
            <div><label style={{ fontSize: '20px', color: 'black' }} htmlFor="username">Username</label></div>
            <input className="validate" type="text" id="username" name="username" data-length="10" required ref={usernameRef}/>
          </div>
          <div className="input-field col s6">
            <div><label style={{ fontSize: '20px', color: 'black' }} htmlFor="password">Password</label></div>
            <input className="validate" type="password" id="password" name="password" required ref={passwordRef}/>
          </div>
          <button style={{ marginLeft: '10px', marginTop: '10px', backgroundColor: 'rgb(3, 252, 98)', color: 'black', fontWeight: 'bold' }} className="btn waves-effect waves-light"type="submit" id="loginButton">Login</button>
          <button style={{ marginLeft: '10px', marginTop: '10px', backgroundColor: 'rgb(178, 114, 238)', color: 'black', fontWeight: 'bold' }} className="btn waves-effect waves-light" type="button" id="registerButton" onClick={handleRegister}>Register</button>
        </div>
      </form>
      <div style={{ fontSize: '20px', marginLeft: '30px', marginTop: '10px' }}>{message}</div> 
    </div>
  );
}

export default Login;
