// FRONT-END (CLIENT) JAVASCRIPT HERE
import React, { useState } from 'react';

const headers = ["Class", "Task", "Due", "Date Added"]

function Home() {
  // const populateHeaders = function()
  // {
  //   tableHead = document.getElementById("dataHead")
  //   tableHead.innerHTML = ""
  //   headers.forEach(element => {
  //     let cell = document.createElement("th")
  //     cell.textContent = element
  //     tableHead.appendChild(cell)
  //   })
  // }

  function Headers() 
  {
    return (
      headers.map((header) => <th key={header}>{header}</th>
      )
    )
  }

  const PopulateTable = async function(response)
  {
    response = await response.json()
    console.log(response)
    let table = document.getElementById("dataBody")
    table.innerHTML = ""
    response.forEach(rowData => {
      let row = document.createElement("tr")

      rowData.forEach(cellData => {
        let cell = document.createElement("td")
        cell.textContent = cellData
        row.appendChild(cell)
      })
      table.appendChild(row)
    })
  }

  const Clear = async function (event) {
    console.log("CLEARING")
    if(event)
    {
      event.preventDefault()
    }

    await fetch("/clear", {
      method: "POST"
    }).then(response => {
      PopulateTable(response)
    })
  }

  const Submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const course = document.getElementById("course"),
      task = document.getElementById("task"),
      time = document.getElementById("due"),
      includeTime = document.getElementById("includeTime"),
      json = {
        data: [course.value, task.value, time.value, includeTime.checked]
      },
      body = JSON.stringify(json)

    await fetch( "/submit", {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body 
    })
    .then(async function (response) {
      PopulateTable(response)
    })
  }

  // window.onload = function () {
  //   const submitButton = document.getElementById("submitButton");
  //   submitButton.onclick = submit;
  //   const clearButton = document.getElementById("clearButton");
  //   clearButton.onclick = clear;
    
  //   fetch("/update", {
  //     method: "POST"
  //   }).then(response => populateTable(response))
  // }


  function Form() {

    React.useEffect(() => {
      fetch("/update", {
        method: "POST"
      }).then(response => PopulateTable(response))
    }, []);

    return (
      <>
        <fieldset className="flex two">
          <span><label> Class: <input type="text" id="course" defaultValue="Class"/></label></span>
          <span><label> Task: <input type="text" id="task" defaultValue="Task" /></label></span>
        </fieldset>

        <fieldset className="flex two">
          <span><label> Due: <input type="text" id="due" defaultValue="Time" /></label></span>
          <span><label>
            <input type="checkbox" id="includeTime"/>
              <span className="checkable">Include Date Added</span>
          </label></span>
        </fieldset>
        <fieldset>
          <button onClick={Submit} id="submitButton">Submit</button>
          <button onClick={Clear} id="clearButton">Clear</button>
        </fieldset>
      </>
    )
  }

  function Table() {
    return (
      <table id="dataTable" className="primary">
        <thead id="dataHead">
          <tr>
            <Headers />
          </tr>
        </thead>
        <tbody id="dataBody"></tbody>
      </table>
    )
  }

  return (
    <div className="off-third">
      <div className="half">
        <h1 className="modal">
          To-Do List
        </h1>

        <Form />

      </div>

      <Table />

    </div>
  );
}

export default Home
