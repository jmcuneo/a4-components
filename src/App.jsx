import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <script src="origMain.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Rum+Raisin&display=swap" rel="stylesheet"></link>
        <h1>How many more credits do your students need?</h1>
        <p>This website will calculate how many credits your students need to graduate.</p>
        <p>Please enter one student at a time.</p>

        <form>
            <p>
                <label htmlFor="student-name">Student Name:</label>
                <input type="text" id="student-name" name="student-name"></input>
            </p>

            <p>
                <label htmlFor="credits">Credits Earned:</label>
                <input type="text" id="credits" name="credits"></input>
            </p>
            <p>
                <label htmlFor="grade">Credits Needed:</label>
                <input type="text" id="grade" name="grade"></input>
            </p>


            <button>Submit</button>
        </form>

        <div id="resultTable">
            <h2 className="centerText">Your Students</h2>
            <table id="students" className="center">
            </table>
        </div>
    </>
  )
}

export default App
