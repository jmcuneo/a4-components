<script>
	const getTable = function () {
		const p = fetch("/appdata", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((table) => {
				console.log("Refresh");
				console.log(table);
				return table;
			});
		return p;
	};

	const add = async function (event) {
		event.preventDefault();

		const nameInput = document.querySelector(".add.name"),
			prepInput = document.querySelector(".add.prep"),
			cookInput = document.querySelector(".add.cook"),
			typeInput = document.querySelector(".add.type"),
			json = {
				name: nameInput.value,
				prep: prepInput.value,
				cook: cookInput.value,
				type: typeInput.value,
			},
			body = JSON.stringify(json);

		console.log(json);

		if (json.name === "" || json.prep === "" || json.cook === "")
			return alert("Please Enter All Fields");

		promise = await fetch("/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		})
			.then((response) => response.json())
			.then((table) => {
				console.log(table);
				nameInput.value = "";
				prepInput.value = "";
				cookInput.value = "";
				return table;
			});
	};

	const remove = async function (event) {
		event.preventDefault();

		const nameInput = document.querySelector(".remove.name"),
			json = {
				name: nameInput.value,
			},
			body = JSON.stringify(json);

		console.log(json);

		if (json.name === "") return alert("Please Enter All Fields");

		promise = await fetch("/remove", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		})
			.then((response) => response.json())
			.then((table) => {
				console.log(table);
				nameInput.value = "";
				return table;
			})
			.catch(() => {
				alert("Recipe Does Not Exist!");
				return getTable();
			});
	};

	const modify = async function (event) {
		event.preventDefault();

		const nameInput = document.querySelector(".modify.name"),
			prepInput = document.querySelector(".modify.prep"),
			cookInput = document.querySelector(".modify.cook"),
			typeInput = document.querySelector(".modify.type"),
			json = {
				name: nameInput.value,
				prep: prepInput.value,
				cook: cookInput.value,
				type: typeInput.value,
			},
			body = JSON.stringify(json);

		console.log(json);

		if (json.name === "" || json.prep === "" || json.cook === "")
			return alert("Please Enter All Fields");

		promise = await fetch("/modify", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		})
			.then((response) => response.json())
			.then((table) => {
				console.log(table);
				nameInput.value = "";
				prepInput.value = "";
				cookInput.value = "";
				return table;
			})
			.catch(() => {
				alert("Recipe Does Not Exist!");
				return getTable();
			});
	};

	let promise = getTable();
</script>

<div id="body">
	<div class="container">
		<div class="header" role="banner">
			<h1 class="item">Recipe Cookbook</h1>
			<button id="logout" onclick="location.href = '/auth/logout';"
				>Logout</button>
		</div>
		<p class="item">
			Recipes names are not case-senstive. Prep and cook times are in
			minutes.
		</p>
		<form class="item" role="form" aria-labelledby="add-recipe">
			<h2 id="add-recipe">Add Recipe</h2>
			<input type="text" class="add name" placeholder="Recipe Name" />
			<input
				type="number"
				class="add prep"
				placeholder="Prep Time (min)" />
			<input
				type="number"
				class="add cook"
				placeholder="Cook Time (min)" />
			<select class="add type" aria-label="meal">
				<option value="Breakfast">Breakfast</option>
				<option value="Lunch">Lunch</option>
				<option value="Dinner">Dinner</option>
			</select>
			<button id="add" on:click={add}>Add</button>
		</form>
		<form class="item" role="form" aria-labelledby="remove-recipe">
			<h2 id="remove-recipe">Remove Recipe</h2>
			<input type="text" class="remove name" placeholder="Recipe Name" />
			<button id="remove" on:click={remove}>Remove</button>
		</form>
		<form class="item" role="form" aria-labelledby="modify-recipe">
			<h2 id="modify-recipe">Modify Recipe</h2>
			<input type="text" class="modify name" placeholder="Recipe Name" />
			<input
				type="number"
				class="modify prep"
				placeholder="Prep Time (min)" />
			<input
				type="number"
				class="modify cook"
				placeholder="Cook Time (min)" />
			<select class="modify type" aria-label="meal">
				<option value="Breakfast">Breakfast</option>
				<option value="Lunch">Lunch</option>
				<option value="Dinner">Dinner</option>
			</select>
			<button id="modify" on:click={modify}>Modify</button>
		</form>
	</div>
	{#await promise then table}
		<table role="main">
			<tr>
				<th>Recipe Name</th><th>Meal</th><th>Prep Time</th><th
					>Cook Time</th
				><th>Total Time</th>
			</tr>
			{#each table as row}
				<tr
					><td>{row.name}</td><td>{row.type}</td><td>{row.prep}</td
					><td>{row.cook}</td><td>{row.total}</td></tr>
			{/each}
		</table>
	{/await}
</div>