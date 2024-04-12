import React, { useState, useEffect } from 'react'

const Todo = props => (
  <li>{props.name} : 
    <input 
      type="checkbox" 
      defaultChecked={props.completed} 
      onChange={ e => props.onclick( props.name, e.target.checked ) }/>
  </li>
)

const Entry = entry => {
  function handleGuess(guess) {
    if (guess != null) {
      if(guess) {
        return "Correct"
      } else {
        return "Incorrect"
      }      
    }
  }

  function handleColor(guess) {
    if (guess != null) {
      if(guess) {
        return {color: "green"}
      } else {
        return {color: "red"}
      }      
    }
  }

  return (
    <tr className="dataTR">
      <td className="entryID">{entry.id}</td>
      <td>{entry.val1}</td>
      <td>{entry.val2}</td>
      <td>{entry.op}</td>
      <td>{entry.output}</td>
      <td style={handleColor(entry.guess)}>{handleGuess(entry.guess)}</td>
      <td>
        <button onClick={ e => entry.del(entry.id, e)} className="deleteButton" id={entry.id}>Delete</button>
      </td>
      <td>
        <button onClick={ e => entry.mod(entry.id, e)} className="modButton" id={entry.id}>Modify</button>
      </td>
    </tr>    
  )

}

const App = () => {
  let [showInput, setInput] = useState(true);
  let [showModify, setModify] = useState(false);
  let [saveID, setID] = useState(-1)

  // const [todos, setTodos] = useState([ ]) 
  const [entries, setTable] = useState([ ]) 

  function modify(id, e) {
    e.preventDefault
    setInput(false)
    setModify(true)
    setID(id)
  }

  async function modSave () {
    //Get same values (except guess) as new item. No items required
    const val1 = document.querySelector( "#newFirst" ),
          val2 = document.querySelector( "#newSec" ),
          op = radioValue("newOP"),
          answer = document.querySelector( "#forceAnswer" ),
          json = {index: saveID, val1: val1.value, val2: val2.value, op: op, output: answer.value},
          body = JSON.stringify( json )
  
    const response = await fetch( "/modify", {
      method:"POST",
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })

    const resp = await response.json()
    setTable( resp )
    setInput(true)
    setModify(false)
    setID(-1)
  }

  function radioValue (name) {
    var elem = document.getElementsByName(name);
    for (let i = 0; i < elem.length; i++) {
        if (elem[i].checked){ return elem[i].value }
    }
    return null
  }

  async function add(e) {
    e.preventDefault
    const val1 = document.querySelector( "#firstVal" ), //First number (required)
          val2 = document.querySelector( "#secVal" ), //Second value (required)
          op = radioValue("operator"), //Operator (required)
          guess = document.querySelector( "#guess" ), //Answer guess (optional)
          json = { val1: val1.value, val2: val2.value, op: op, guess: guess.value},
          body = JSON.stringify( json )

    const response = await fetch( '/add', {
        method:'POST',
        body: body,
        headers: { 'Content-Type': 'application/json' }
      })
    
    // .then( response => response.json() )
    //     .then( json => {  
    //       setTable( json )
    //       console.log("Content added: " + JSON.stringify(json))
    //     })

    const resp = await response.json()
    setTable( resp )
  }

  function remove(id, e) {
    e.preventDefault
    let body = JSON.stringify(id) //Send over the id (index) of the item to delete

    fetch( "/remove", {
      method:"POST",
      body 
    }).then( response => response.json() )
        .then( json => {
          setTable( json )
        })
  }
  
  useEffect(()=> {
    fetch( '/read' ).then( response => response.json() )
      .then( json => {  
          setTable( json ) 
          console.log("Page read, table set: " + JSON.stringify(json))          
      })
  }, [] )
    
  useEffect( ()=> {
    document.title = `The Worst Calc`
  }, [])

  return (
    <div className="App">
      <header>
        <h1>The Worst Calculator</h1>
      </header>
      { showInput &&
        <div className="forms">
          <form>
            <label htmlFor="firstVal">1st Value: </label>
            <input type="number" id="firstVal"/>
            <br/>
            <label htmlFor="secVal">2nd Value: </label>
            <input type="number" id="secVal"/>
            <br/>
            <div className="opForm">
              <h3>Choose an operator:</h3>
              <input type="radio" name="operator" id="opA" value="+" defaultChecked/>
              <label htmlFor="opA">+</label>
              <br/>
              <input type="radio" name="operator" id="opS" value="-"/>
              <label htmlFor="opS">-</label>
              <br/>
              <input type="radio" name="operator" id="opD" value="/"/>
              <label htmlFor="opD">/</label>
              <br/>
              <input type="radio" name="operator" id="opM" value="*"/>
              <label htmlFor="opM">*</label>
            </div>
            <label htmlFor="guess">Optional Guess: </label>
            <input type="number" id="guess"/>
            <br/>

            <button onClick={ e => add(e)} className="submitButton">Submit</button>
          </form>
        </div>
      }
      <div className="sTable">
        <table id="serverTable">
          <thead>
            <tr className="tableLabels">
              <th>ID</th>
              <th>First Value</th>
              <th>Second Value</th>
              <th>Operator</th>
              <th>Answer</th>
              <th>Guess Correctness</th>
            </tr>            
          </thead>
          <tbody>
          { entries.map( (entry,i) => <Entry  key={i}
                                              id={i} 
                                              val1={entry.val1} 
                                              val2={entry.val2} 
                                              op={entry.op} 
                                              output={entry.output}  
                                              guess={entry.guess}
                                              del={remove}
                                              mod={modify}  /> ) }
          </tbody>
        </table>
      </div>
      { showModify &&
        <div id="modForm">
          <form>
            <label htmlFor="newFirst">New 1st Value: </label>
            <input type="number" id="newFirst"/>
            <br/>
            <label htmlFor="newSec">New 2nd Value: </label>
            <input type="number" id="newSec"/>
            <br/>
            <div className="opForm">
              <h3>New Operator:</h3>
              <input type="radio" name="newOP" id="newPlus" value="+"/>
              <label htmlFor="newPlus">+</label>
              <br/>
              <input type="radio" name="newOP" id="newMinus" value="-"/>
              <label htmlFor="newMinus">-</label>
              <br/>
              <input type="radio" name="newOP" id="newDiv" value="/"/>
              <label htmlFor="newDiv">/</label>
              <br/>
              <input type="radio" name="newOP" id="newMult" value="*"/>
              <label htmlFor="newMult">*</label>
            </div>
            <label htmlFor="forceAnswer">Assign Correct Answer: </label>
            <input type="number" id="forceAnswer"/>
            <br/>

            <button className="saveButton" onClick={ e => modSave() }>Save</button>
          </form>
        </div>
      }
    </div>
  )
}

export default App   

{/* <input type='text' /><button onClick={ e => add()}>add</button>
      <ul>
        { todos.map( (todo,i) => <Todo key={i} name={todo.name} completed={todo.completed} onclick={ toggle } /> ) }
     </ul> 
    </div>
    </input> */}