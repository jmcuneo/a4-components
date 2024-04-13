// components/Home.js
import React from 'react';
import { useNavigate, withRouter } from 'react-router-dom';


function Home () {

  const navigate = useNavigate();
    // FRONT-END (CLIENT) JAVASCRIPT HERE
const submit = async function( event ) {
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
  
    const response = await fetch( "http://localhost:5000/submit", {
      method:"POST",
      body 
    }).then(response => response.json()).then(function(json) {
      console.log(json)
    })
  
  
    let orderForm = document.getElementById("order");
  
    orderForm.remove();
  }
  
  const add = async function (event){
    event.preventDefault();
    let selected = document.getElementById("itemSelect");
    let text = selected.options[selected.selectedIndex].text;

    if (selected.options[selected.selectedIndex].value === "0") {
      // Do nothing if the selected value is 0
    } else {
      // Update localStorage
      localStorage.setItem(text, parseInt(localStorage.getItem(text)) + 1);

      // Check if the item already exists in the order form
      if (document.getElementById(text) === null) {
        // Create a new div element for the item
        let item = document.createElement("div");
        item.setAttribute("id", text);
        item.innerHTML = text.concat(" ") + localStorage.getItem(text);

        // Create a remove button
        let remove = document.createElement('button');
        remove.addEventListener('click', () => {
          item.remove();
        });
        remove.innerText = "Remove item";
        item.appendChild(remove);

        // Append the item to the order form
        document.querySelector("#order").appendChild(item);
      } else {
        // If the item already exists, update its quantity
        let item = document.getElementById(text);
        item.innerHTML = text.concat(" ") + localStorage.getItem(text);

        // Create a remove button
        let remove = document.createElement('button');
        remove.addEventListener('click', () => {
          item.remove();
        });
        remove.innerText = "Remove item";
        item.appendChild(remove);
      }
    }
    selected.value = 0;
  }
  
  const startNewOrder = function(event){
    //Creates a new order form
    let orderForm = document.getElementById("order");
  
    if(!(orderForm === null)){
      orderForm.remove();
    }
      let order = document.createElement("form");
      order.setAttribute("id",  "order");
  
  
      let itemSelect = document.createElement("select");
      itemSelect.setAttribute('id', 'itemSelect');
      itemSelect.setAttribute("name", "Add item to order");
  
      let item = document.createElement("option");
      item.innerText = "Add item to order";
      item.value = 0;
      item.disabled = true;
      item.selected = true;
      item.hidden = true;
      itemSelect.appendChild(item);
  
      let breakfast = document.createElement("option");
      breakfast.innerText = "Breakfast";
      breakfast.value = 1;
      itemSelect.appendChild(breakfast);
      localStorage.setItem("Breakfast", 0);
  
      let coffee = document.createElement("option");
      coffee.innerText = "Coffee";
      coffee.value = 2;
      itemSelect.appendChild(coffee);
      localStorage.setItem("Coffee", 0);
  
      let text = document.createElement('input');
      text.setAttribute('id', 'yourname');
      text.setAttribute('placeholder', "Name for the order")
  
      let submitButton = document.createElement("button");
      submitButton.setAttribute('id', 'submit');
      submitButton.innerText = "submit";
      submitButton.onClick = submit;
  
      order.appendChild(itemSelect);
      order.appendChild(text);
      order.appendChild(submitButton);
      
      let check = document.getElementById("orders");
      document.body.append(order);
      const button = document.querySelector("#itemSelect");
      button.onClick = add;
  } 
  
  const checkOrders = function(event){
    //Change page bttn, should write to recieve url string
    navigate("/Results");
    
  } 
  
  
  
  return (
    <div>
    
        <title>Homepage Assignment 4</title>
     
      <header>
        <button onClick={e => startNewOrder()}>
          Start new order
        </button>
    
        <button id="orders" onClick={e =>checkOrders()}>
          Check existing orders
        </button>
      </header>
      
    
   
    </div>
    
  );
}

export default Home;
