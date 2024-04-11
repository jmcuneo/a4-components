import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import './App.css'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    getGpaData();
  });

  // Function to handle changes in the username input field
  const handleLogOut = (event) => {
    event.preventDefault(event);
    navigate("/");
  }

  // Submit a new entry to the GPA data
  const handleSubmit = async function(event) {    
    event.preventDefault(event);
    const classInput = document.querySelector("#class");
    const gradeInput = document.querySelector("#grade");
    const creditsInput = document.querySelector("#credits");

    // Ensure a correct value
    if (classInput.value === "" || gradeInput.value === "" || 
      creditsInput.value === "" || isNaN(Number(creditsInput.value)))
      return;

    const json = {class: classInput.value, grade: gradeInput.value, credits: creditsInput.value};
    const body = JSON.stringify(json);
    let response = await fetch("/submit", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: body
    });
    getGpaData();
  }

  // Adjust a table entry
  const handleUpdate = async (event) => {
    event.preventDefault(event);
    const rowCount = document.getElementsByClassName("row").length;
    if (rowCount <= 0) return;

    const classInput = document.querySelector("#class");
    const gradeInput = document.querySelector("#grade");
    const creditsInput = document.querySelector("#credits");

    const editInput = document.querySelector("#edit");
    const newInfo = {class: classInput.value, grade: gradeInput.value, credits: creditsInput.value};
    const json = {class: editInput.value, data: newInfo};

    const body = JSON.stringify(json);
    let response = await fetch("/adjust", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: body
    });

    getGpaData();
  }

  // Delete a table entry
  const handleDelete = async (event) => {
    event.preventDefault(event);
    const rowCount = document.getElementsByClassName("row").length;
    if (rowCount <= 0) return;

    const editInput = document.querySelector("#edit");
    const body = editInput.value;
    let response = await fetch("/delete", {
      method: "POST",
      body: body
    });

    getGpaData();
  }
  
  // Function to handle changes in the username input field
  const getGpaData = async () => {
    let response = await fetch("/display", {
      method: "GET",
    });
  
    const text = await response.text();
    if (text !== null) buildTable(JSON.parse(text));
  }

  // Optain the GPA value from the server
  const getGpa = async () => {
    let response = await fetch("/gpa", {
      method: "GET",
    });
  
    const text = await response.text();
    displayGpa(text);
  }

  // Display the GPA value on screen
  const displayGpa = (gpaValue) => {
    let gpaText = document.getElementById("gpa");
    gpaText.innerHTML = `GPA: ${gpaValue}`;
  }

  // Create the GPA table with current data
  const buildTable = (data) => {
    let table = document.getElementById("table");
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    for (let i = 0; i < data.length; i++) {
      addToTable(data[i]);
    }
  }

  // Add a new entry to the GPA data table
  const addToTable = (newData) => {
    // Initialize table info
    let table = document.getElementById("table");
    let numRows = table.rows.length;
    let row = table.insertRow(numRows);
    row.className = "row";

    // Create cels
    let classCell = row.insertCell(0);
    classCell.innerHTML = newData.class;
    let gradeCell = row.insertCell(1);
    gradeCell.innerHTML = newData.grade.toUpperCase();
    let creditsCell = row.insertCell(2);
    creditsCell.innerHTML = newData.credits;

    // Upadte the GPA
    getGpa();
  }
  
  return (
    <>
    <title>CS4241 Assignment 4</title>
    <meta
      name="description"
      content="This website application will allow you to easily calculate your GPA."
    />
    <meta name="language" content="en" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    <section>
      <div className="box">
        <label><b>Class</b></label>
        <input className="input is-info" type="text" id="class"/><br/>
        <label><b>Grade</b> (A, B, C, F)</label>
        <input className="input is-info" type="text" id="grade"/><br/>
        <label><b>Credits</b> (whole numbers only)</label>
        <input className="input is-info" type="text" id="credits"/><br/>
        <button className="button is-rounded is-info" id="submit" onClick={handleSubmit}>Submit Entry</button><br/>
        <label><b>Class To Edit</b> (enter class name)</label>
        <input className="input is-warning" type="text" id="edit"/><br/>
        <button className="button is-rounded is-warning" id="adjust" onClick={handleUpdate}>Adjust Entry</button>
        <button className="button is-rounded is-danger" id="delete" onClick={handleDelete}>Delete Entry</button><br/>
        <button className="button is-small is-link is-inverted" id="logOut" onClick={handleLogOut}>Log Out</button>
      </div>
      <p className="title is-size-3" id="gpa">
        GPA:
      </p>
      <table className="table is-bordered is-striped" id="table">
        <tbody>
          <tr>
            <th>Class</th>
            <th>Grade</th>
            <th>Credits</th>
          </tr>
        </tbody>
      </table>
      <br/>
    </section>
  </>  
  )
}

export default App
