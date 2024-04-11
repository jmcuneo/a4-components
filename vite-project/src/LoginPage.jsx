import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();
  
  // Function to handle login button click
  const handleLogin = async (event) => {
    event.preventDefault(event);
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    if (usernameInput.value === "" || passwordInput.value === "") return;

    const json = {username: usernameInput.value, password: passwordInput.value};
    const body = JSON.stringify(json);

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    const text = await response.text();
    if (text === "true") {
      // Login successful
      navigate("/calc");
    } else {
      // Login unsuccessful
      const incorrectLabel = document.getElementById("incorrect");
      incorrectLabel.innerHTML = "The password you entered was incorrect."
    }
  }
  
  return (
  <>
    <title>CS4241 Assignment 4</title>
    <meta
      name="description"
      content="This website application will allow you to easily calculate your GPA."
    />
    <meta name="language" content="en"/>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Audiowide"
    />
    {/* get rid of favicon error */}
    <link rel="icon" href="data:;base64,iVBORw0KGgo="/>
    <h1 className="title is-size-1">GPA Calculator</h1>
    <section className="hero is-fullheight">
      <div className="box">
        <label><b>Username</b></label>
        <input className="input is-info" type="text" id="username"/><br/>
        <label><b>Password</b></label>
        <input className="input is-info" type="text" id="password"/><br/>
        <div className="grid">
          <button className="button is-rounded is-primary" id="login" onClick={handleLogin}>Login</button>
          <label className="notice" id="incorrect"/><label/>
        </div>
      </div>
    </section>
  </>
  )
}

export default App
