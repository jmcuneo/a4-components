import React, { useState, useEffect } from 'react';

import { useNavigate,  } from 'react-router-dom';


const Results = () => {
    const [data, setData] = useState([]);
    const [shouldClickButton, setShouldClickButton] = useState(false);
  const navigate = useNavigate();
    const returnHome = async function(event ){
        //Change page bttn, should write to recieve url string
        
        navigate("/Home")
      } 
      function editRow(index) {
        let update = data
        let row = data[index]
        let name = row.yourname
        let breakfast = row.breakfast;
        let coffee = row.coffee;
    
        //Replace the cell content with input fields for editing
        row.yourname = <input type="text" value={name}></input>;
        row.breakfast = <input type="text" value={breakfast}></input>;
        row.coffee = <input type="text" value={coffee}></input>;
    
        let editButton = (
            <button onClick={() => saveRow(row)}>Save</button>
        );
        setData(prevData => {
            // Create a shallow copy of the previous data array
            update[index] = row;
            
            // Return the updated data array
            return update;
        });

        
    }
    
    async function saveRow(button) {
      let row = button.parentNode.parentNode;
      let cells = row.getElementsByTagName("td");
      let newName = cells[1].querySelector("input").value;
      let newBreakfast = cells[2].querySelector("input").value;
      let newCoffee = cells[3].querySelector("input").value;
    
      // update the table cell content with the new values
      cells[1].innerHTML = newName;
      cells[2].innerHTML = newBreakfast;
      cells[3].innerHTML = newCoffee;
    
      let editButton = row.querySelector("button");
      editButton.innerText = "Edit";
      editButton.onclick = function() {
          editRow(this);
      };
    
      let body = JSON.stringify({_id: cells[0].innerText, yourname: cells[1].innerText, breakfast: cells[2].innerText, coffee:cells[3].innerText})
    
      const response = await fetch( "/edit", {
        method:"POST",
        body: body
      }).then(response => response.json()).then(function(json){
        cells[4].innerHTML = json.data;
      }
      )
    
    }
    
    const remove = async function( event ) {
      // stop form submission from trying to load
      // a new .html page for displaying results...
      // this was the original browser behavior and still
      // remains to this day
      event.preventDefault()
      const input = document.querySelector( "#yourname" ),
    
            json = { username: localStorage.getItem("userName"),
              yourname: input.value,
              breakfast: parseInt(localStorage.getItem("Breakfast")),
              coffee: parseInt(localStorage.getItem("Coffee")),
    
            },
            body = JSON.stringify( json ) //turns to string and put through the network
    
      const response = await fetch( "/submit", {
        method:"POST",
        body 
      }).then(response => response.json()).then(function(json) {
        console.log(json)
      })
    
    
      let orderForm = document.getElementById("order");
    
      orderForm.remove();
    }
    
    async function deleteRow(button){
      let row = button.parentNode.parentNode;
      let cells = row.getElementsByTagName("td");
      let body = JSON.stringify({_id:cells[0].innerHTML,})
    
      const response = await fetch( "/delete", {
        method:"POST",
        body: body
      }).then(row.parentNode.removeChild(row))
    }
    
    useEffect(() => {

        let body = JSON.stringify({username: localStorage.getItem('userName')});
        console.log(localStorage.getItem('userName'));
        fetch('http://localhost:5000/data',{
            method:"POST",
            body
          })
          .then(response => {
            response.json().then( json => {                
            if(response.ok){
                    console.log(json.data)
                    let dataS = json.data
                
                    setData(dataS)
                    console.log(data)
                

            }
            else{
                console.log(json)
            }})
        })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },[]);
    
      return (
        <div>

          <h1>Results</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Breakfast</th>
                <th>Coffee</th>
                <th>Cost</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index)=> (
                <tr>
                  <td>{row._id}</td>
                  <td>{row.yourname}</td>
                  <td>{row.breakfast}</td>
                  <td>{row.coffee}</td>
                  <td>${row.cost}</td>
                  <td><button onClick={() => editRow(index)}>Edit</button></td>
                  <td><button onClick={() => deleteRow(index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <button id="back" onClick={() => returnHome()}>Back to home </button>
        </div>
      );
    }
    
    export default Results;
    