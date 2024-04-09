import './App.css';
import TestComponent from './TestComponent';
import React, { useState, useEffect } from 'react';
import OptionsComponent from './OptionsComponent';
import TableComponent from './TableComponent';

function App() {
  //loads state from mongodb 
  //this is an immuable function - we use to set state = name is the variable that stores the state, setName is the function we use to set the state
  const [name, setName] = useState("")
  const [appdata, setAppdata] = useState([]);

  //ex///
  const calculate = async function (event) {
    const inputClass = document.querySelector("#class"),
      inputGrade = document.querySelector("#grade"),
      inputCredits = document.querySelector("#credits"),
      json = { class: inputClass.value, grade: inputGrade.value, credits: inputCredits.value },
      body = JSON.stringify(json)

    const response = await fetch("/calculate", {
      method: "POST",
      body
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      document.getElementById("gpa").innerHTML = json;
      setName(json);
    })

    inputClass.value = ""
    inputGrade.value = ""
    inputCredits.value = ""

    const appdataResponse = await fetch("/appdata", {
      method: "GET",
    });

    const appdata = await appdataResponse.json()
    setAppdata(appdata);

    //updateTable(appdata)
  }

  const deleteID = async function (event) {

    const inputID = document.querySelector("#delete"),
      json = { id: inputID.value },
      body = JSON.stringify(json)

    const response = await fetch("/calculate", {
      method: "DELETE",
      body
    }).then(function (response) {
      if (response.status === 204) {
        inputID.value = ""
        const nothingInArray = []
        setName(0);
        setAppdata(nothingInArray);
        //updateTable(nothingInArray)
        return;
      }
      return response.json();
    }).then(function (json) {
      console.log(json)
      if (json === undefined) {
        json = 0
      }
      document.getElementById("gpa").innerHTML = json;
      setName(json);
    })

    inputID.value = ""

    const appdataResponse = await fetch("/appdata", {
      method: "GET",
    });

    const appdata = await appdataResponse.json()
    setAppdata(appdata);

    //updateTable(appdata)
  }

  const modifyID = async function (event) {

    const inputID = document.querySelector("#idModify"),
      inputClass = document.querySelector("#classModify"),
      inputGrade = document.querySelector("#gradeModify"),
      inputCredits = document.querySelector("#creditsModify"),
      json = { class: inputClass.value, grade: inputGrade.value, credits: inputCredits.value, id: inputID.value },
      body = JSON.stringify(json)

    const response = await fetch("/calculate", {
      method: "PUT",
      body
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      document.getElementById("gpa").innerHTML = json;
      setName(json);
    })

    inputID.value = ""
    inputClass.value = ""
    inputGrade.value = ""
    inputCredits.value = ""

    const appdataResponse = await fetch("/appdata", {
      method: "GET",
    });

    const appdata = await appdataResponse.json();
    setAppdata(appdata)

    //updateTable(appdata);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          GPA Calculator
        </h1>

        <hr
          style={{
            background: 'white',
            height: "3px",
            border: "none",
          }}
        />

        <br></br>

        <p>To add classes to the table and calculate your GPA, fill in the following:</p>

        <div className="addContainer">
          <label htmlFor="class">Class Name*:</label>
          <input type="text" id="class" name="class" className="input" />
          <label htmlFor="grade">Grade*:</label>
          <OptionsComponent />
          <label htmlFor="credits">Credits*:</label>
          <input type="number" id="credits" name="credits" className="input" />
          <button onClick={() => {
            calculate()
          }}> Calculate</button >
        </div>

        <hr
          style={{
            background: 'white',
            height: "3px",
            border: "none",
          }}
        />

        <br></br>

        <p>See the table for your logged entries and GPA calculation:</p>
        <TableComponent appdata={appdata} />

        <br></br>

        <div>Your cumulative GPA is: <h3 id="gpa">{name}</h3></div>
        <br></br>

        <hr
          style={{
            background: 'white',
            height: "3px",
            border: "none",
          }}
        />

        <br></br>
        <p>To delete an entry, enter the corresponding ID from the table:</p>
        <div className="deleteContainer">
          <label htmlFor="delete">ID #*:</label>
          <input type="number" id="delete" name="delete" className="input" />
          <button onClick={() => {
            deleteID()
          }}>Delete</button>
        </div>


        <hr
          style={{
            background: 'white',
            height: "3px",
            border: "none",
          }}
        />

        <br></br>
        <p>To modify an entry, enter the following criteria:</p>
        <div className="modifyContainer">
          <label htmlFor="idModify">ID*:</label>
          <input type="number" id="idModify" name="id" className="input" />
          <label htmlFor="classModify">Class Name*:</label>
          <input type="text" id="classModify" name="class" className="input" />
          <label htmlFor="gradeModify">Grade*:</label>
          <select name="gradeModify" id="gradeModify">
            <option value="">--Choose an option--</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
          <label htmlFor="creditsModify">Credits*:</label>
          <input type="number" id="creditsModify" name="credits" className="input" />
          <button onClick={() => {
            modifyID();
          }}>Modify Class</button>
        </div>
        <br></br>
      </header>
    </div>
  );
}



export default App;
