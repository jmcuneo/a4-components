import { useState } from 'react'
import './App.css'

function App() {
  
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
    <link rel="stylesheet" href="css/main.css" />
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
        <button className="button is-rounded is-info" id="submit">Submit Entry</button><br/>
        <label><b>Class To Edit</b> (enter class name)</label>
        <input className="input is-warning" type="text" id="edit"/><br/>
        <button className="button is-rounded is-warning" id="adjust">Adjust Entry</button>
        <button className="button is-rounded is-danger" id="delete">Delete Entry</button><br/>
        <button className="button is-small is-link is-inverted" id="logOut">Log Out</button>
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
