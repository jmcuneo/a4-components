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
  return (
    <tr className="dataTR">
      <td className="entryID">{entry.id}</td>
      <td>{entry.val1}</td>
      <td>{entry.val2}</td>
      <td>{entry.op}</td>
      <td>{entry.output}</td>
      <td>{entry.guess}</td>
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
  // const [todos, setTodos] = useState([ ]) 
  const [entries, setTable] = useState([ ]) 

  // function modify( name, completed ) {
  //   fetch( '/change', {
  //     method:'POST',
  //     body: JSON.stringify({ name, completed }),
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  // }

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
                                              mod={remove}  /> ) }
          </tbody>
        </table>
      </div>
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