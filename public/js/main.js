// FRONT-END (CLIENT) JAVASCRIPT HERE

import React, { useState, useEffect } from 'react';
import ReactDom from "react-dom";

ReactDom.render(App(), document.getElementById("root"))

function studentForm () {
  const [name, setName] = useState("")
  const [credits, setCredits] = useState("")

  const submit = async (event) => {
    event.preventDefault()

    name.value.trim()
    parseInt(credits.value.trim())

    if (name === "" || isNaN(parseInt(credits.value.trim())) || credits < 0){
      alert("Please enter a valid name and credits.")
      return
    }

    const json = {name, credits};
    const body = JSON.stringify(json);

    const response = await fetch( "/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body
    })

    const data = await response.json()
    console.log(data)

    setName("")
    setCredits("")

    }

    return (
        <div>
          <h1>
            Create or Update Student
          </h1>
            <form onSubmit={submit}>
              <div className="inputfield">
                <label htmlFor="yourname">Name</label>
                <input type="text" id="yourname" name="yourname" value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>
              <div className="inputfield">
                <label htmlFor="yourcredits">Number of Credits</label>
                <input type="text" id="yourcredits" name="yourcredits" value={credits} onChange={(e) => setCredits(e.target.value)} required/>
              </div>
              <button id="submit" type="submit" style="margin-bottom: 10px">Submit</button>
            </form>
            <p className="note" style="font-size: 12px">
              *To create a student, enter their name and how many credits they currently have<br/>
              *To update a student, enter the name exactly as it is stored in the table and enter what the credits are
              to be changed to
            </p>
        </div>
    )
}

function studentTable({studentData, fetchStudentData}){
  const deleteStudent = async (studentName)=> {
    const response = await fetch( "/delete", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: studentName})
    })

    const data = await response.json()
    console.log(data)

    fetchStudentData()
  }

  const formatHeader = (header) => {
    switch(header.toLowerCase()){
      case "name":
        return "Name"
      case "credits":
        return "Credits"
      case "classstanding":
        return "Class Standing"
      case "classof":
        return "Class Of"
      default:
        return header
    }
  }

  return (
      <div>
        <h1>
          Student Database
        </h1>
        <table id="studentTable">
          <tbody>
            {studentData.length > 0 && (
              <tr>
                {Object.keys(studentData[0]).filter(header => header !== "_id").map((header, index) => (
                    <th key={index}>{formatHeader(header)}</th>
                ))}
              </tr>
            )}
            {studentData.map((student, index) => (
                <tr key={index}>
                  {Object.keys(student).filter(header => header !== "_id").map((header, index) => (
                      <td key={index}>{student[header]}</td>
                  ))}
                  <td>
                    <button onClick={() => deleteStudent((student.name))}>Delete</button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default function App () {
  const [studentData, setStudentData] = useState([])

  const fetchStudentData = async function() {
    const response = await fetch("/studentData")
    const studentData = await response.json()
    setStudentData(studentData)
  }

  useEffect(() => {
    fetchStudentData().then(() => {
      console.log("Student data fetch successfully")
    }).catch((error) => {
      console.error("Error fetching student data: ", error)
    })
  }, [])

  return (
      <div className="App">
        <studentForm />
        <studentTable studentData={studentData} fetchStudentData={fetchStudentData} />
      </div>
  )

}