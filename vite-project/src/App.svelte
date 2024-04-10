<script>
import { onMount } from 'svelte';

  let yourname;
  let youritem;
  let numItems;
  let itemPrice;
  let suggestItem;
  let suggestQty;

const clearInput = function (){
  yourname = '';
    youritem = '';
    numItems = "";
    itemPrice = "";
}

const generateTable = (data) => {
    const tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = '';

    data.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.item}</td>
        <td>${entry.qty}</td>
        <td>${entry.price}</td>
      `;
      tableBody.appendChild(row);
    });
  };

const refreshPage = async function (){
  const response = await fetch("/refresh", {
    method: "POST",
    body: "",
  });
  const text = await response.json();
  const appdata = text.appdata;
  console.log("appdata: ", appdata);
  generateTable(appdata);
};


const submit = async function (event) {
  event.preventDefault();

if (!yourname || !youritem || numItems === 0) {
      alert("Please fill out all fields.");
      return;
    }


  const newEntry = {
      name: yourname,
      item: youritem,
      qty: numItems,
      price: itemPrice
    };

    console.log("newEntry: ", newEntry)
  

  const response = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry),
  });
  const text = await response.json();
  const appdata = text.appdata;
  const suggestdata = text.suggestdata;
  const justAdded = appdata[appdata.length - 1];

  for (let i = 0; i < suggestdata.length; i++) {
    if (
      suggestdata[i].Sitem == justAdded.item &&
      suggestdata[i].Sqty == justAdded.qty
    ) {
      bring(i);
      remove(appdata.length);
      console.log(
        "item removed from bring and added to appdata: ",
        suggestdata[i]
      );
    } 
  } 
  generateTable(appdata);
  console.log("text:", justAdded);
  clearInput();
  refresh();
};


  const handleRemove = async (index) => {
    const response = await fetch('/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: index.toString()
    });
    const data = await response.json();
    appdata.splice(index, 1);
  };

  const handleBring = async (index) => {
    const response = await fetch('/bring', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: index.toString()
    });
    const data = await response.json();
    appdata = data.appdata;
    suggestdata = data.suggestdata;
  };

  const handleSuggest = async (suggestObject) => {
    const response = await fetch('/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(suggestObject)
    });
    const data = await response.json();
    suggestdata = data;
  };

  onMount(() => {
    refreshPage(); 
  });
  
</script>


<main>
  <div class="header">What To Bring</div>
  <div class="text-grid">
    <form on:submit|preventDefault={submit}>
      <input type="text" bind:value={yourname} maxlength="10" placeholder="Enter Name"> 
      <input type="text" bind:value={youritem} maxlength="10" placeholder="Enter Item">
      <input type="number" bind:value={numItems} min="0" step="1" maxlength="10" placeholder="Enter Quantity">
      <input type="number" bind:value={itemPrice} min="0" maxlength="10" placeholder="Enter Item Price">
      <button type="submit">submit</button>
    </form>
  </div>

  <div>
    <form on:submit|preventDefault={handleSuggest}>
      <input type="text" bind:value={suggestItem} maxlength="10" placeholder="Enter Item">
      <input type="number" bind:value={suggestQty} min="0" step="1" maxlength="10" placeholder="Enter Quantity">
      <button type="submit">suggest</button>
    </form>
  </div>

  <div class="flex-container">
    <div class="column">
      <h2>Who's Bringing What:</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Total Cost</th>
          <th>Delete an Item</th>
        </tr>
        <tbody id="table-body">
         
        </tbody>
       
      </table>
    </div>
    <div class="column">
      <h2 id="number">Who's Coming:</h2>
      <ul>
      </ul>
    </div>
    <div class="column">
      <h2>Suggestions:</h2>
      <table>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Bring This Item</th>
          </tr>
        
      </table>
    </div>
  </div>
</main>


