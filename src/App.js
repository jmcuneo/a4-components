
import './App.css';
import React, {useEffect} from "react";

function App() {
  let rowNumber = 1;
  let data;
  let isModified = false; //bool for getData and modify to fix table

  function addRow(id, model, year, mpg, fuelTank){ //adds row to table
    let table = document.getElementById("table");
    let row = table.insertRow();

    let tillEmpty = mpg * fuelTank;

    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    let cell5 = row.insertCell(5);

    cell0.innerHTML = id.toString();
    cell1.innerHTML = model;
    cell2.innerHTML = year.toString();
    cell3.innerHTML = mpg.toString();
    cell4.innerHTML = fuelTank.toString();
    cell5.innerHTML = tillEmpty.toString();
  }

  function rowDelete(num){
    let table = document.getElementById("table");
    if(num > 0 && num < rowNumber){
      table.deleteRow(num);
      updateIDs();
    }


    //document.getElementById("table").rowDelete(num);
  }

  function updateIDs(){
    let table = document.getElementById("table");
    for(let i = 1; i <table.rows.length; i++){
      let row = table.rows[i];
      let cells = row.cells;
      cells[0].innerHTML = i;
    }
  }
  const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    const input1 = document.querySelector( "#model" ),
        input2 = document.querySelector("#year"),
        input3 = document.querySelector("#mpg"),
        input4 = document.querySelector("#fuelLoad"),
        json = {Id: rowNumber, model: capitalFirstLetter(input1.value), year: input2.value, mpg: input3.value, fuelLoad: input4.value, tillEmpty: input3.value * input4.value},
        body = JSON.stringify(json)

    const response = await fetch( "/submit", {
      method:"POST",
      body
    })

    if(isNaN(parseInt(json.year)) ||
        isNaN(parseInt(json.mpg)) ||
        isNaN(parseInt(json.fuelLoad))
    ) {

    } else{
      addRow(json.Id, json.model, json.year, json.mpg, json.fuelLoad );
      data.push(json);
      rowNumber++;
    }

    console.log(rowNumber)
    const text = await response.text();
    console.log( "text:", text )
  }

//Helper for capitalizing car name
  function capitalFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const remove = async function (event) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const inputID = document.querySelector("#id"),
        json = {"id": inputID.value},
        body = JSON.stringify(json)
    const response = await fetch( "/delete", {
      method:"DELETE",
      body
    })

    const text = await response.text()

    console.log( "text:", text )

    if(isNaN(inputID.value)|| inputID.value === "" || parseInt(inputID.value) <= 0 || parseInt(inputID.value) > rowNumber){

    } else{

      rowDelete(inputID.value)
      rowNumber--;
    }
  }
  const modify = async function(event){
    event.preventDefault()

    isModified = true;

    const input0 = document.querySelector("#id2"),
        input1 = document.querySelector( "#model2" ),
        input2 = document.querySelector("#year2"),
        input3 = document.querySelector("#mpg2"),
        input4 = document.querySelector("#fuelLoad2"),
        json = {Id: input0.value, model: capitalFirstLetter(input1.value), year: input2.value, mpg: input3.value, fuelLoad: input4.value, tillEmpty: input3.value * input4.value},
        body = JSON.stringify(json)

    const response = await fetch( "/modify", {
      method:"PUT",
      body
    })

    const text = await response.text()

    console.log( "text:", text )

    if( isNaN(parseInt(json.Id)) ||
        parseInt(json.Id) <= 0 ||
        parseInt(json.Id) > rowNumber

    ) {
    } else{
      await getData().then(r => console.log("done"));
    }



  }

  const getData = async function() {
    rowNumber = 1;
    let table = document.getElementById("table");
    const response = await fetch( "/data", {
      method:"GET"
    }).then((response) => response.json()
    ).then((json) =>data =json)

    if(isModified){

      for(let i = data.length; i > 0; i--){
        table.deleteRow(i)
      }
      isModified = false;
    }

    console.log("len: " + data.length)
    for(let i = 0; i < data.length; i++){
      console.log(data[i].model)

      addRow(data[i].Id ,data[i].model, data[i].year, data[i].mpg, data[i].fuelLoad);
      rowNumber++
    }
    console.log(rowNumber)

    console.log(data[data.length-1].Id)

    //const text = await response.text()

    //console.log( "text:", text )

  }

  useEffect(() => {
    window.onload = function () {
      getData().then(r => console.log("stuff"));
      const submitButton = document.getElementById("submit");
      submitButton.onclick = submit;
      const deleteButton = document.getElementById("delete");
      deleteButton.onclick = remove;
      const modifyButton = document.getElementById("modify");
      modifyButton.onclick = modify;
    }
  }, []);
    return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
      <link
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Honk&display=swap"
          rel="stylesheet"></link>

      <header>Car Database</header>
      <div className="grid-container">
        <div>
          <img id="image" className="image" alt="KaChow"
               src="https://upload.wikimedia.org/wikipedia/en/8/82/Lightning_McQueen.png"></img>
        </div>
        <div id="formDiv">
          <h2> Use the form below to add to the table</h2>
          <form>
            <input type="text" id="model" placeholder="Car Model"></input>
            <input type="text" id="year" placeholder="Year"></input>
            <input type="text" id="mpg" placeholder="Miles per Gallon (MPG)"></input>
            <input type="text" id="fuelLoad" placeholder="Fuel Tank Size in Gallons"></input>
            <button id="submit">submit</button>
          </form>
        </div>
        <div>
          <img id="image2" className="image" alt="KaChow"
               src="https://upload.wikimedia.org/wikipedia/en/8/82/Lightning_McQueen.png"></img>
        </div>
        <div>
          <h1>Kachow!</h1>
        </div>
        <div>
          <h2> Use the form below to delete from the table</h2>
          <form>
            <input type="text" id="id" placeholder="Delete ID#"></input>
            <button id="delete">Delete</button>
          </form>
        </div>
        <div><h1>Kachow!</h1></div>
        <div></div>
        <div>
          <h2> Use the form below to modify values from the table</h2>
          <form>
            <input type="text" id="id2" placeholder="Modify ID#"></input>
            <input type="text" id="model2" placeholder="Car Model"></input>
            <input type="text" id="year2" placeholder="Year"></input>
            <input type="text" id="mpg2" placeholder="Miles per Gallon (MPG)"></input>
            <input type="text" id="fuelLoad2" placeholder="Fuel Tank Size in Gallons"></input>
            <button id="modify">modify</button>
          </form>
        </div>
        <div></div>
        <div className="grid-table">
          <table id="table">
            <tbody>
            <tr>
              <th>ID #</th>
              <th>Car Model</th>
              <th>Year</th>
              <th>Miles Per Gallon</th>
              <th>Fuel Tank Size in Gallons</th>
              <th>Total Miles per Fuel Tank</th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}

export default App;
