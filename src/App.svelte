<script>
	import List from "./List.svelte";
	import Form from "./Form.svelte";
	import {syncClientData} from './appdata.js'

	window.onload = function () {
		// get data from server and populate table
		syncClientData();
	};
</script>

<main>
	<Form />
	<List />
</main>
<footer>
    <p>Parker Frizzle | Assignment 4 for CS 4241 (Webware) | <a href="https://github.com/pfrizz/a4-parkerfrizzle">View source on GitHub</a></p>
</footer>