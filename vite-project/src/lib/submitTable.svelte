<!-- components/Todos.svelte -->
<script>
import { onMount } from 'svelte';

  export let todos = []
  
	let yourname = ''
	let youritem = ''
	let numItems = ''
	let itemPrice = ''
  let cost;

  $: newTodoId = totalTodos ? Math.max(...todos.map(t => t.id)) + 1 : 0

  $: totalTodos = todos.length
  $: completedTodos = todos.filter(todo => todo.completed).length

  const removeTodo = async function(todo) {
    //todos = todos.filter(t => t.id !== todo.id)
    const removedTodo = todos.find(t => t.id === todo.id); // Find the todo element to be removed
    todos = todos.filter(t => t.id !== todo.id); // Remove the todo element from the todos array

    console.log("removed todo: ", removedTodo.id);
    const reqObj = { entryIndex: removedTodo.id };
    const response = await fetch("/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqObj),
  });

  const text = await response.json();
  console.log("removed: ", text);

  }
  
	function editTodo(todo) {
    
  }
const createEntry = function (name, item, price, qty, id) {
  const entry = {
    name: name,
    item: item,
    price: price,
    qty: qty,
    id: id
  };
  return entry;
};


  const addTodo = async function (){
    console.log("in addTodo");
    todos = [...todos, { name: yourname, item: youritem, qty: numItems, price: itemPrice, cost: parseFloat(itemPrice) * parseFloat(numItems), id: newTodoId}]

    const newEntry = createEntry(
    yourname,
    youritem,
    itemPrice,
    numItems,
    newTodoId
  );
  console.log("newEntry: ", newEntry);

    const response = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEntry),
  });
  const text = await response.json();
  const appdata = text.appdata;
  console.log("appdata after submiit: ", appdata) 

  }

  const refreshPage = async function () {
  const response = await fetch("/refresh", {
    method: "POST",
    body: "",
  });
  const text = await response.json();
  console.log("appdata: ", text);

  todos.splice(0, todos.length);

  console.log("todos after clear: ", todos);
  for (let i = 0; i < text.length; i++) {
    todos.push(text[i]);
  }
  for (let j = 0; j < todos.length; j++) {
    addToTable(todos[j])
  }
  console.log("todos after push: ", todos);
  console.log("done");
  
};
const addToTable = function (entry) {
  const table = document.getElementById("table");
  const row = `<tr id="entryRow">
                <td>${entry.name}</td>
                <td>${entry.item}</td>
                <td>${entry.qty}</td>
                <td>${entry.cost}</td>
                <td><button type="button" class="remove">Delete</button></td>
              </tr>`;
              
  table.insertAdjacentHTML("beforeend", row);
  //eventlistener
  const removeButton = table.querySelector(".remove:last-child");
  removeButton.addEventListener("click", function (event) {
    removeTodo(entry)
    event.preventDefault();
  });
  
};

  let filter = 'all'
  const filterTodos = (filter, todos) => 
    filter === 'active' ? todos.filter(t => !t.completed) :
    filter === 'completed' ? todos.filter(t => t.completed) : 
    todos
onMount(() => {
    refreshPage(); 
  });
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">
<div class="header">What To Bring</div>

  <!-- NewTodo -->
  <form on:submit|preventDefault={addTodo}>
  
		<input type="text" bind:value={yourname} maxlength="10" placeholder="Enter Name"> 
      <input type="text" bind:value={youritem} maxlength="10" placeholder="Enter Item">
      <input type="number" bind:value={numItems} min="0" step="1" maxlength="10" placeholder="Enter Quantity">
      <input type="number" bind:value={itemPrice} min="0" maxlength="10" placeholder="Enter Item Price">
    <button type="submit"  class="btn btn__primary btn__lg">
      Submit
    </button>
  </form>

  <!-- Todos -->
  

	<h2>Who's Bringing What:</h2>
	<table id="table">
	<tr>
          <th>Name</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Total Cost</th>
          <th>Delete an Item</th>
  </tr>
  
  {#each  todos as todo}
		<tr class="todo-list stack-large" aria-labelledby="list-heading">
                  <td>{todo.name}</td>
                  <td>{todo.item}</td>
                  <td>{todo.qty}</td>
                 
                  <td>{todo.cost}</td>
                  <td><button type="button" class="btn btn__danger"
            on:click={() => removeTodo(todo)}
          >
            Delete <span class="visually-hidden">{todo.name}</span>
          </button></td>
					 
               
	</tr>
    <tr class="todo">
  
    </tr>

  {/each}
  
</table>
  <hr />
</div>