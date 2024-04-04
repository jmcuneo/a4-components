<script>

  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'


  let taskValue = "";
  let classValue = "";
  let duedateValue = "";
  let importanceValue = "Yes";




  const getTasks = function() {
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


  const addTask = function( e ) {
    let json = {_id: -1, task: taskValue, class: classValue, duedate: duedateValue, importance: importanceValue, priority: 0};
    const body = JSON.stringify( json );
    promise = fetch( "/add", {
      method:"POST",
      body
    }).then( response => response.json())
  }

  const editTask = function( e ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ name:e.target.getAttribute('todo'), completed:e.target.checked }),
      headers: { 'Content-Type': 'application/json' }
    })
  }


  const deleteTask = function( e ) {
    fetch( '/delete', {
      method:'POST',
      body: JSON.stringify({ name:e.target.getAttribute('todo'), completed:e.target.checked }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  let promise = getTasks()
</script>






<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>




  <h2>Add Tasks</h2>
  <form>
    <div class="form-group row">
      <label for="task" class="col-sm-2 col-form-label">Enter task:</label>
      <div class="col-sm-10">
        <input class="form-control" type="text" id="task" placeholder="Task" bind:value={taskValue}>
      </div>
    </div>
    <div class="form-group row">
      <label for="class" class="col-sm-2 col-form-label">Enter class:</label>
      <div class="col-sm-10">
        <input class="form-control" type="text" id="class" placeholder="Class" bind:value={classValue}>
      </div>
    </div>
    <div class="form-group row">
      <label for="duedate" class="col-sm-2 col-form-label">Enter due date:</label>
      <div class="col-sm-10">
        <input class="form-control" type="date" id="duedate" name="Due Date" bind:value={duedateValue}>
      </div>
    </div>
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Choose importance:</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="importanceRadios" id="importanceYes" value="Yes" bind:group={importanceValue} checked>
          <label class="form-check-label" for="importanceYes">
            Yes
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="importanceRadios" id="importanceNo" value="No" bind:group={importanceValue}>
          <label class="form-check-label" for="importanceNo">
            No
          </label>
        </div>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-10">
        <button type="submit" class="btn btn-primary" id="submit-button" on:click={addTask}>Submit</button>
      </div>
    </div>
  </form>





  <h2>View Tasks</h2>
  {#await promise then taskData}
  <table class="table table-striped" id="data-table">
    <thead>
      <tr>
        <th>Task</th>
        <th>Class</th>
        <th>Due Date</th>
        <th>Important</th>
        <th>Priority</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody id="data-tbody">
      {#each taskData as taskObj}
      <tr>
        <td>{taskObj.task}</td>
        <td>{taskObj.class}</td>
        <td>{taskObj.duedate}</td>
        <td>{taskObj.importance}</td>
        <td>{taskObj.priority}</td>
        <td>
          <button type="button" class="button" value="Edit">Edit</button>
          <button type="button" class="button" value="Delete">Delete</button>
        </td>
      </tr>
      {/each}
    </tbody>
  </table>
  {/await}




  <!-- <input type='text' />
  <button on:click={addTodo}>add todo</button>

  {#await promise then todos}
    <ul>

    {#each todos as todo}
      <li>{todo.name} : <input type='checkbox' todo={todo.name} checked={todo.completed} on:click={toggle}></li>
    {/each}

    </ul>
  {/await} -->




  

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>