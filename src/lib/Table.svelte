<script>
	// export let tableData = [
	// 	{
	// 		id: "Err",
	// 		start: "No",
	// 		end: "Table",
	// 		duration: "Data",
	// 	},
	// ];
	export let tableData = [];
</script>

<table class="table">
	<thead>
		<tr>
			<th scope="col">Shift #</th>
			<th scope="col">Shift Start</th>
			<th scope="col">Shift End</th>
			<th scope="col">Duration (Hours)</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.values(tableData) as row}
			<tr>
				{#each Object.values(row) as cell}
					<td>{cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
