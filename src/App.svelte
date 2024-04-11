<script>
	import Table from "./lib/Table.svelte";
	import { onMount } from "svelte";

	let tableData = [];
	let userName;

	// FRONT-END (CLIENT) JAVASCRIPT HERE

	const logShift = async function (event) {
		// stop form submission from trying to load
		// a new .html page for displaying results...
		// this was the original browser behavior and still
		// remains to this day
		event.preventDefault();

		const form = document.getElementById("logForm");
		// define fields to receive from submission, and convert to json
		const shiftID = document.querySelector("#logShiftID"),
			shiftStart = document.querySelector("#shiftStart"),
			shiftEnd = document.querySelector("#shiftEnd"),
			json = {
				id: shiftID.value,
				start: shiftStart.value,
				end: shiftEnd.value,
			},
			body = JSON.stringify(json);

		form.reset();
		// send the json as post request
		const response = await fetch("/shifts/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		});
		tableData = await getShifts();
	};

	const deleteShift = async function (event) {
		// stop form submission from trying to load
		// a new .html page for displaying results...
		// this was the original browser behavior and still
		// remains to this day
		event.preventDefault();

		const form = document.getElementById("removeForm");

		// define fields to receive from removal, convert to json
		const removeID = document.querySelector("#shiftID"),
			json = { removeID: removeID.value },
			body = JSON.stringify(json);

		form.reset();

		// perform delete request (we use post bcuz per rfc, delete shouldnt have body)
		//
		const response = await fetch("/shifts/delete", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		});

		if (response.ok) {
			tableData = await getShifts();
		}
		// await for response, render updated html
	};

	const getShifts = async function () {
		const response = await fetch("/shifts/get", {
			method: "GET"
		});
		let data = await response.json();
		return data;
		// const data = await response.text();
		// console.log(data);
	}

	const getUser = async function() {
		const response = await fetch("/shifts/name", {
			method: "GET"
		});
		let data = await response.json();
		return data.user;
	}


	onMount (async () => {
		let shifts = await getShifts();
		let user = await getUser();
		tableData = shifts;
		userName = user;
	});

	window.onload = function () {};
</script>

<header>
	<div class="container-md text-center">
		<h1>Ad-Hoc Time Entry</h1>
		<h2>Signed In As: {userName}</h2>
		<p>
			A simple system to enter/log time for independently contracted work.
		</p>
	</div>
</header>
<section id="log" aria-label="Submit Shift">
	<div class="container-md text-center">
		<h2>Log/Update Shift</h2>
		<form id="logForm" aria-describedby="Form to submit or update a shift.">
			<p>Enter all required fields to log a new shift.</p>
			<p>
				If you want to update a shift, then you must enter the Shift ID
				of the shift you wish to update.
			</p>
			<p>Otherwise, leave ShiftID blank.</p>
			<div class="mb-3">
				<label for="logShiftID" class="form-label"
					>Optional Shift ID</label
				>
				<input
					type="integer"
					class="form-control"
					id="logShiftID"
					placeholder="1"
				/>
			</div>
			<div class="mb-3">
				<label for="shiftStart" class="form-label">Shift Start</label>
				<input
					type="datetime-local"
					class="form-control"
					id="shiftStart"
					placeholder="mm/dd/yyyy"
					required
				/>
			</div>
			<div class="mb-3">
				<label for="shiftEnd" class="form-label">Shift End</label>
				<input
					type="datetime-local"
					class="form-control"
					id="shiftEnd"
					placeholder="00:00 AM"
					required
				/>
			</div>
			<button
				on:click={logShift}
				type="submit"
				class="btn btn-primary"
				id="logShift">Submit</button
			>
		</form>
	</div>
</section>

<section id="removeShiftSection" aria-label="Remove Shift">
	<div class="container-md text-center mt-3">
		<h2>Remove Shift</h2>
		<form id="removeForm" aria-describedby="Form to remove a shift.">
			<div class="mb-3">
				<label for="shiftID" class="form-label">Shift ID</label>
				<input
					type="integer"
					class="form-control"
					id="shiftID"
					placeholder="1"
					required
				/>
			</div>
			<button
				on:click={deleteShift}
				type="submit"
				class="btn btn-danger"
				id="removeShift">Remove</button
			>
		</form>
	</div>
</section>

<section
	id="shifts"
	aria-describedby="A collection of all your shifts, if you have any"
>
	<div class="container-md text-center mt-3">
		<h2>Shift Record</h2>
		<Table tableData={tableData}/>
	</div>
</section>
