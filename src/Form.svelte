<script>
    import {syncClientData} from './appdata';

    const submit = async function (event) {
		event.preventDefault();

		// making sure no inputs were left blank
		let inputs = document.querySelectorAll("input");
		let foundEmpty = false;
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].value.length < 1) {
				foundEmpty = true;
			}
		}

		if (foundEmpty) {
			alert("You must give the task a name and complete due date");
		} else {
			let click = new Audio("add.mp3");
			click.play();

			const nameInput = document.querySelector("#task-name"),
				dateInput = document.querySelector("#task-date"),
				colorInput = document.querySelector("#task-color"),
				json = {
					name: nameInput.value,
					date: dateInput.value,
					color: colorInput.value,
				},
				body = JSON.stringify(json);

			const response = await fetch("/submit", {
				method: "POST",
				body
			});

            syncClientData();
		}
	};

</script>

<div class="panel">
    <h1>Add a new task</h1>
    <form>
        <div id="form-input-container">
            <label for="task-name">Name: </label>
            <input
                type="text"
                id="task-name"
                placeholder="e.g. do the dishes"
            />
            <label for="task-date">Due date: </label>
            <input type="datetime-local" id="task-date" />
            <label for="task-color">Color: </label>
            <input type="color" id="task-color" value="#0080ff" />
        </div>
        <button id="submit-button" on:click={(e) => submit(e)}>Add task</button>
    </form>
</div>