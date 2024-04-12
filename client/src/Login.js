// FRONT-END (CLIENT) JAVASCRIPT HERE
import React from 'react';
import { useNavigate } from 'react-router-dom';

// window.onload = function () {
//   const logInButton = document.getElementById("logInButton")
//   logInButton.onclick = logIn
// }

function Login () {

  const navigate = useNavigate()

  const RequestLogIn = async function (event) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const username = document.getElementById("username").value,
      password = document.getElementById("password").value,
      json = {
        username: username,
        password: password
      },
      body = JSON.stringify(json)

    await fetch("/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(response => response.text()).then(text => {
        console.log(text)
        if (text === "correct") {
          navigate("/home")
        }
        else if (text === "new account") {
          alert("This account does not exist, so a new account was created with these credentials")
          navigate("/home")
        }
        else if (text === "incorrect") {
          alert("Incorrect Password")
        }
        else {
          alert(text)
        }
      })
  }

  return (
  <div className="off-third">
    <div className="half">
      <h1 className="modal">
        To-Do List
      </h1>
      <fieldset className="flex two">
        <span><input type="text" id="username" placeholder="username" /></span>
        <span><input type="password" id="password" placeholder="password" /></span>
      </fieldset>
      <button id="logInButton" onClick = {RequestLogIn}>Log In</button>
    </div>
  </div>
  )
}

export default Login