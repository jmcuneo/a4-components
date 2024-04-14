<!-- PreviousResultsTable.svelte -->
<script>
    import { onMount } from 'svelte';
  
    let previousResults = [];
  
    //function to update the table to reflect the fetch from the server side array
    const updateTable = async function() {          
    const response = await fetch("/getPreviousResults");    //fetch the array
        if (response.ok) {        //if array can be accessed
        const previousResults = await response.json();      // array of previous results
        const previousResultsTable = document.getElementById('previousResults');        //define table
        const tbody = previousResultsTable.querySelector('tbody');                      //define table body
        tbody.innerHTML = '';         //clear the content in the body              
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
            tbody.appendChild(row);         //add the row to the defined table
        });
    }
    }
  
    onMount(updateTable);
  </script>
  
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
  