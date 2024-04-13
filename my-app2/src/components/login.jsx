import React from "react";
import { useNavigate,Navigate, withRouter } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
    const login = function(event){


        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
      
        fetch('https://assignment4ethanmoynihan-927c342a5e06.herokuapp.com/login', {
          method: 'POST',
          body: JSON.stringify({username: username, password: password})
        }).then(response => {
            if (response.ok) {
                // Redirect to homepage
                
                
                response.json().then(data => {
                  // Store the username from the response
                  localStorage.setItem('userName', username);
                  console.log(username);
                  
                  navigate('/Home');
                  return '/Home';
      
              });
              
          } else {
            response.json().then(function(json){
              // bad pass/user
              
              alert('Invalid: ');// + json.message);
            }
            )
          }
      })
      .catch(error => {
        console.error('Error:', error)
      });
      
      
      }
    
    const createAccount = function(event){
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
      
        fetch('https://assignment4ethanmoynihan-927c342a5e06.herokuapp.com/createAccount', {
          method: 'POST',
          body: JSON.stringify({username: username, password: password})
        }).then(response => {
          if (response.ok) {
              // Redirect to homepage
              response.json().then(data => {
                // Store the username from the response
                localStorage.setItem('userName', username);
                console.log(username);

                navigate('/Home');
    
            });
          } else {
            response.json().then(function(json){
              // bad pass/user
              alert('Invalid')
              //alert('Invalid: ' + json.message);
            })
              
          }
      })
      .catch(error => console.error('Error:', error));
      
    }
    
    return (
    <div>
    <title>Homepage Assignment 3</title>
  
      <header>
      <meta name="header" content="login page of Assignment 3"></meta>
        <form id="loginForm" onSubmit={ e => login()}>
          <meta name="loginForm" content="Username and password boxes for login"></meta>
            <label htmlFor="username">Username:</label><br></br>
            <input type="text" id="username" placeholder="Username" name="username"></input><br></br>
            <label htmlFor="password">Password:</label><br></br>
            <input type="password" id="password" placeholder="Password" name="password"></input><br></br>
            <input type="button" onClick={ e => login()} value="Login"></input>
        </form>
        <button id="create account" onClick={e=> createAccount()}><meta name="Create acount button" content="Click this button with the username and pasword filled in to create an account"></meta>
           Create Acount</button>
      </header>
      </div>)
}
  
export default Login;