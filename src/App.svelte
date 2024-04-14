<script>
  import PreviousResults from './PreviousResults.svelte';
  import { onMount } from "svelte";

  let num1 = 0;
  let num2 = 0;
  let result = ''; 

    const addition = async function(event) {
        event.preventDefault();

        const num1Input = num1; // Get the value of num1 from Svetle variable
        const num2Input = num2; // Get the value of num2 from Svelte variable

        const json = { operation: 'addition', num1: num1Input, num2: num2Input };
        const body = JSON.stringify(json);

        try {
            const response = await fetch("http://localhost:3001/addition", { // Send the request to the /addition on server side
                method: "POST",
                body: body
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            result = responseData.result; // Update the result variable with the response from the server
            updateTable();
        } catch (error) {
            console.error('Error fetching addition operation:', error);
        }
    };
</script>

<main>
  <h1>Calculator: Addition, Subtraction, Multiplication, and Division</h1>
  <form on:submit|preventDefault={addition}>
    <label for="num1">First Number:</label>
    <input type="number" bind:value={num1} />

    <label for="num2">Second Number:</label>
    <input type="number" bind:value={num2} />
    <button type="submit">Addition</button>
</form>
  <div id="result">Result: {result}</div>

  <h2>Previous Results:</h2>
</main>

<style>
  @import './styles.css';
</style>

