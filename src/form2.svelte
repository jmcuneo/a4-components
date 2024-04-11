<script>

    // const express = require("express"),
    //     app = express()

    // // app.use(express.static("public") )
    // app.use(express.json() )
    // // require('dotenv').config();

    const getEntry = function() {
        const p = fetch( '/read', {
            method:'GET' 
        })
        .then( response => response.json() )
        .then( json => {
            console.log(json)
            return json 
        })
    
        return p
    }
  
    const addEntry = function( e ) {
        // console.log(e)
        // console.log(e.target.value)
        const input_name = document.getElementById("user_name").value
        const input_pass = document.getElementById("password").value
        const input_ready = document.getElementById("ready").checked
        const input_age = parseInt(document.getElementById("age").value)
        promise = fetch( '/add', {
            method:'POST',
            body: JSON.stringify({ 
                "user": input_name,
                "password": input_pass,
                "ready": input_ready,
                "age": input_age}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then( response => response.json() )
    }
  
    const toggle = function( e ) {

        fetch( '/change', {
            method:'POST',
            body: JSON.stringify({ name:e.target.getAttribute('todo'), completed:e.target.checked }),
            headers: { 'Content-Type': 'application/json' }
        })
    }
  
    const remove_entry = (e) => {
        e.preventDefault()
        console.log(`Removing Entry ${e.target.value}`)
        promise = fetch( '/remove', {
            method:'POST',
            body: JSON.stringify({"idx": parseInt(e.target.value)}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then( response => response.json() )

        // getEntry()
    }


    let promise = getEntry()

    // const 


</script>

<p class="p_class">USER DATA FORM</p>

<form id="input_form">
    <br/><label>User Name:</label><br>
    <input type="text" id="user_name" placeholder="User Name" value="Default_Name">
    <br/><label>Password:</label><br>
    <input type="password" id="password" value="Default_Password" placeholder="Password">
    <br/><label>Ready:</label><br>
    <input type="checkbox" id="ready" value="True">
    <br/><label>Age:</label><br>
    <input type="number" id="age" value=0>
    <br/>
    <!-- <button id="add_to_db_button">Add</button> -->
</form>
<br/>

<!-- <input type='text' /> -->
<button on:click={addEntry} value={"hi"}>Submit</button>
<br/><br/><br/><br/>


<!-- {#await promise then todos}
    <ul>

    {#each todos as todo}
    <li>{todo.name} : <input type='checkbox' value={todo.name} checked={todo.completed} on:click={toggle}></li>
    {/each}

    </ul>
{/await} -->



{#await promise then data_list}
    <!-- <ul>

    {#each data_list as data, idx}
    <li>{data.user} : <button on:click={remove_entry} value={idx}>Remove</button></li>
    {/each}

    </ul> -->

    <table>
        <!-- {#each Object.entries(data_list[0]) as [key, value]}
            <td></td>

        {/each} -->
        <tr>
            <td>User Name</td>
            <td>Password</td>
            <td>Ready?</td>
            <td>Age</td>
            <td>Remove?</td>
        </tr>
        {#each data_list as data, idx}
            <tr>
            {#each Object.entries(data) as [key, value]}
                <td>{value}</td>
            {/each}
            <td><button on:click={remove_entry} value={idx}>Remove</button></td>

            </tr>
        {/each}
      </table>

{/await}


<style>
    td {
      padding: 20px; /* Adjust the padding value as needed */
      background-color:gray;
    }
    button {
        color: blue;
        background-color:aquamarine;
    }
</style>