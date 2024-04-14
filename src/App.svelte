<script>
  import { onMount, setContext } from "svelte";
  import { writable } from 'svelte/store';

  const previousResults = writable([]);

  let num1 = 0;
  let num2 = 0;
  let result = ''; 

  //function to update the table to reflect the fetch from the server side array
  const updateTable = async function() {          
    const response = await fetch("http://localhost:3001/getPreviousResults");    //fetch the array
        if (response.ok) {        //if array can be accessed
        const previousResults = await response.json();      // array of previous results              
        previousResults.forEach((result, index) => {        //loop through the fetched array
            const row = document.createElement('tr');       //define row
            const cellIndex = document.createElement('td'); //define index
            cellIndex.textContent = (index + 1);            //set index number to the element in the html
            const cellResult = document.createElement('td');  //define result
            cellResult.textContent = result.result;           //fetch the result from each array entry and set it to the element content

            const cellDelete = document.createElement('td');            //define the cell for delete button
            const deleteButton = document.createElement('button');      // create the delete button
            deleteButton.textContent = 'Delete';                        //"delete" text inside of the button
            deleteButton.addEventListener('click', function() {         //create an event handler for when the button is clicked that links to the deleteResult() function above
                deleteResult(index);
            });
            cellDelete.appendChild(deleteButton);                       //add the delete button to the cell for delete button

            row.appendChild(cellIndex);     //add the of the index cell to the row
            row.appendChild(cellResult);    //add the of the result cell to the row
            row.appendChild(cellDelete);    //add the of the delete cell to the row
        });
    }
    }
  
    onMount(updateTable);

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
            previousResults.set(responseData.previousResults);
            updateTable();
        } catch (error) {
            console.error('Error fetching addition operation:', error);
        }
    };
    setContext('previousResults', previousResults);

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
  <table>
    <thead>
      <tr>
        <th>Operation #:</th>
        <th>Result:</th>
      </tr>
    </thead>
    <tbody>
      {#each previousResults as result, index}
        <tr>
          <td>{index + 1}</td>
          <td>{result}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  @import './styles.css';
</style>

