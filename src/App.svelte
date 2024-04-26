<script>
	import { onMount } from 'svelte';
	let formValid = false;
	let name = '';
	let description = '';
	let date = '';
	let priority = '';
	let data = [];

	function checkValidity() {
    let form = document.querySelector('form');
    formValid = form.checkValidity();
    if (!formValid) {
      alert('Please fill out all required fields correctly.');
    }
  }

	// Submit the form data to the server
	const submit = async function( event ) {
		checkValidity();
	if (!formValid) {
		event.preventDefault();
		return;
	}


	const dateString = date,
		creationDate = new Date(dateString),
		creationDateFormatted = creationDate.toISOString().slice(0, 10);
	
	 const json = {name: name, description: description, creationDate: creationDateFormatted, priority: priority},
		body = JSON.stringify(json)
	
	console.log("body:", body);
	const response = await fetch( "/submit", {
		method:"POST",
		headers: {
			"Content-Type": "application/json"
		},
		body 
	})

	if(response.ok) {
		console.log("Data submitted successfully");
	} else {
		console.log("Error: ", response.status, response.statusText);
		alert("Error: Name already exists");
	}


	//const text = await response.text()
	//console.log("text:", text);
	getResults(event);
	}

	// Delete form data with the value of the key (name)
	async function deleteData(event) {
		console.log("delete called");
	event.preventDefault();
	const json = {name: name},
		body = JSON.stringify(json);

	const response = await fetch("/delete", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body
	});

	if(response.ok) {
		console.log("Data deleted successfully");
	} else {
		console.log("Error: ", response.status, response.statusText);
		alert("Error: Name not found");
	}
	getResults(event);
	}

	async function editData(event) {
	checkValidity();
	if (!formValid) {
		event.preventDefault();
		return;
	}
	event.preventDefault();
	const json = {name: name, description: description, creationDate: date, priority: priority},
		body = JSON.stringify(json);

	const response = await fetch("/edit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body
	});

	if(response.ok) {
		console.log("Data edited successfully");
	} else {
		console.log("Error: ", response.status, response.statusText);
		alert("Error: Name not found");
	}
	getResults(event);
	}

	// Get the results of stored data from the server
	onMount(async () => {
    await getResults();
  });

  async function getResults() {
    const response = await fetch("/data", {
      method: "GET"
    });
    const text = await response.text();
    data = JSON.parse(text);
	console.log(data);
  }

</script>

<body>
    <div id="flex">
      <div id="container">
        <main>
          <h1 class="centered">Shrimple To-Do List</h1>
          <p class="centered">Make sure all fields are filled out for submissions.
            <br> To delete, only the name is necessary.
            <br> Also, priority is a number from 1-10, with 1 being the highest. 
            <br>To edit, make sure the name matches exactly, then click the button</p>
			<form id="form">
				<label for="name">Name: </label><input type="text" bind:value={name} id="name" placeholder="Name" required>
				<label for="description">Description: </label><input type="text" bind:value={description} id="description" placeholder="Description"><br>
				<label for="date">Creation Date: </label><input type="date" bind:value={date} id="date" required>
				<label for="priority">Priority: </label><input type="number" bind:value={priority} id="priority" min="0" max="10">
				<button id="starter" on:click|preventDefault={submit}>submit</button>
				<button id="delete" on:click|preventDefault={deleteData}>delete</button>
				<button id="edit" on:click|preventDefault={editData}>edit</button>
			</form>
          <div class="centered">
            <h2>Results</h2>
            <button id="getResults" on:click={getResults}>Refresh Results</button>
            <table id="table">
				<thead>
				  <tr>
					<th>Name</th>
					<th>Description</th>
					<th>Creation Date</th>
					<th>Priority</th>
					<th>Recommended Deadline</th>
				  </tr>
				</thead>
				<tbody>
				  {#each data as item, index (index)}
					<tr>
					  <td>{item.name}</td>
					  <td>{item.description}</td>
					  <td>{item.creationDate}</td>
					  <td>{item.priority}</td>
					  <td>{item.recommendedDeadline}</td>
					</tr>
				  {/each}
				</tbody>
			  </table>
          </div>
        </main>
      </div>
    </div>
  </body>

<style>
:global(body) {
  font-family: "Madimi One", sans-serif;
  margin: 0;
  background-color: #61A6FA   ;
  background-size: 65px;
  color: #6a77a2;
  background-image: url(water2.webp);
}

/* Border box includes padding and border in the element's total width and height. */
* {
  box-sizing: border-box;
}

#container {
  max-width: 600px;
  margin: 0 auto;
}

#flex {
  display: flex;
}

p {
  font-size: 18px;
  line-height: 1.6;
  color: #6d737a;
}

h1, h2{
  color: #6f6d7a;
  font-weight: bold;
}

main {
  background-color: #61A6FA;
  flex: 1;
  padding: 20px;
}

/* New stuff */

input {
  width: 100%;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}

table, th, td {
  border: 1px solid black;
}

table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  max-width: 100%;
}

button {
  background-color: #FAD762;
  color: #7e61fa;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin: 5px;
}

.centered {
  text-align: center;
}
</style>