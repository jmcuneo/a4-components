<script>

let currID;

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  const input_model = document.querySelector("#model"),
    input_year = document.querySelector("#year"),
    input_mpg = document.querySelector("#mpg"),
    json = {
      Model: input_model.value,
      Year: Number(input_year.value),
      MPG: Number(input_mpg.value)
    },
    body = JSON.stringify(json)

  const response = await fetch("/add", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body
  })
  alert("Successfully submitted!")
  

}

const erase = async function () {

  const response = await fetch("/remove", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({_id: currID})
  })
  const text = await response.text()
  let returnedArray = JSON.parse(text);
  console.log("text:", returnedArray);

  alert("Successfully deleted!")
  regenerateTable()
}

const view = async function () {
  const response = await fetch("/docs", { method: "GET" })

  const text = await response.text()

  let returnedArray = JSON.parse(text);
  console.log("text:", returnedArray);
  return returnedArray
}

const update = async function () {

  const input_model = document.querySelector("#model"),
    input_year = document.querySelector("#year"),
    input_mpg = document.querySelector("#mpg"),
    json = {
      _id: currID,
      model: input_model.value,
      year: Number(input_year.value),
      mpg: Number(input_mpg.value)
    },
    body = JSON.stringify(json)

  const response = await fetch("/update", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body
  })

  alert("Successfully updated!")
  regenerateTable()

}

function handleDelUp(id, choise){
  currID = id
  if(choise === "d"){
    erase()
  } else if(choise === "u"){
    update()
  }
}

let promise = view()

function regenerateTable(){
  promise = view()
}




</script>

<main>
	<body>
		<div class="container">
			<header>
			  <h1 class="title has-text-danger">
				MY SUPER SECRET CAR COLLECTION WEBSITE
			  </h1>
			</header>
			<div class="block">
			  <form>
				<label for="model" class="label">Insert Model Name</label>
				<input type="text" class="input" id="model">
			  </form>
			  <form>
				<label for="year" class="label">Insert Model Year</label>
				<input type="number" class="input" id="year" value="Insert Model Year">
			  </form>
			  <form>
				<label for="mpg" class="label">Insert Average MPG</label>
				<input type="number" class="input" id="mpg" value="Insert Average MPG">
			  </form>
			</div>
			<div class="block">
			  <button id="submit" class="button is-primary" on:click={submit}>Submit*</button>
			</div>
      <div class="block">
			  <button id="view" class="button is-primary" on:click={regenerateTable}>Load Table</button>
			</div>
     
        {#await promise then myArray}
			  <table class="table is-striped">
          <thead>
            {#each Object.keys(myArray[0]) as columnHeading}
            {#if columnHeading === "_id" || columnHeading == null }
              <th />
            {:else }
              <th>{columnHeading}</th>
            {/if}
            {/each}
          </thead>
        <tbody>
          {#each Object.values(myArray) as row}
            <tr>
              {#each Object.values(row) as cell}
              <!-- svelte-ignore empty-block -->
              {#if String(cell).length > 10}
              <button id={cell} class="button is-primary" on:click={handleDelUp(cell, "u")}>Update</button>
              <button id={cell} class="button is-danger" on:click={handleDelUp(cell, "d")}>Delete</button>
              {:else }
                <td>{cell}</td>
              {/if}
              {/each}
            </tr>
          {/each}
          </tbody>
        </table>
        {/await}
        
     
			<div class="image is-3by2">
			  <img src="classiccar.jpg" alt="picture of classic car">
			</div>
		</div>
	</body>
	<footer class="container">
		<p>*Upon submission, you agree to being looked at</p>
	  </footer>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

th:hover, td:hover {
    background-color: red;
}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>