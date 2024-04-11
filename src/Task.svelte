<script>
    export let task;
    export let index;
    import {syncClientData} from './appdata.js';

    // sends request to delete an item to the server
    const deleteItem = async function (event) {
		let ding = new Audio("delete.wav");
		ding.play();

		const response = await fetch("/delete", {
			method: "DELETE",
			body: event.target.getAttribute("index"),
		});

        syncClientData();
	};
</script>

<tr style={"color: black; background-color: ".concat(task.color)}>
    <td>{task.name}</td>
    <td>{task.date}</td>
    <td>{task.priority}</td>
    <td>
        <button on:click={(e) => deleteItem(e)} index={index}>Remove</button>
    </td>
</tr>