<script>
  import { onMount } from 'svelte'

  let editIndex = -1
  
  let editTaskName, editPriority, editCreationDate

  let addTaskName, addPriority, addCreationDate
  
  const getTasks = async function() {
    const response = await fetch("/tasks");
    // console.log('get', response)
    const tasks = await response.json();
    return tasks
  }

  // const todo = document.querySelector('input').value

  const addTask = async function () {
    const json = {
      taskName: addTaskName,
      priority: addPriority,
      creation_date: addCreationDate
    }
    // console.log('add', json)
    const body = JSON.stringify(json);

    const response = await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    updateTasks()

    addTaskName = ""
    addPriority = 1
    addCreationDate = new Date().toISOString().split("T")[0]
  };

  const editTask = async function(i) {
    const json = {
      taskName: editTaskName,
      priority: editPriority,
      creation_date: editCreationDate,
      index: i
    }
    // console.log('edit', json)
    const body = JSON.stringify(json);

    const response = await fetch("/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    updateTasks()
    editIndex = -1
  }

  function cancel() {
    editIndex = -1;
  }

  function edit(i, task) {
    editIndex = i;
    editTaskName = task.taskName
    editPriority = task.priority
    editCreationDate = task.creation_date
  }

  async function deleteTask(i) {
    const response = await fetch("/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({index: i}),
    });

    // console.log( response.json() )
    updateTasks()
  }

  const updateTasks = async function () {
    const response = await fetch("/tasks");
    // console.log('get update', response)
    const tasks = await response.json();
    promise = tasks
  };

  const completeTask = function () {
    alert("YOU MAY NOT COMPLETE THE TASK! This is a To Not-Do List, remember?");
  }

  let promise = getTasks()
  
  onMount(() => {
    promise = getTasks()

    addTaskName = ""
    addPriority = 1
    addCreationDate = new Date().toISOString().split("T")[0]
  })
</script>

<header>
  <h1>To Not-Do List</h1>
</header>
<div class="content">
  <form id="addForm" on:submit|preventDefault={addTask}></form>
  <table id="tasks" aria-label="Tasks table">
    <thead>
      <tr>
        <th scope="col">Done</th>
        <th scope="col">Task Name</th>
        <th scope="col">Priority</th>
        <th scope="col">Creation Date</th>
        <th scope="col">Days Not Done</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
    {#await promise then tasks}
      {#each tasks as task, i}
        {#if i === editIndex}
          <form id="editForm" on:submit|preventDefault={() => editTask(i)}></form>
          <tr>
            <td><input type="checkbox" class="trollCheckbox" on:click|preventDefault={completeTask}/></td>
            <td><input name="taskName" type="text" form="editForm" bind:value={editTaskName} required/></td>
            <td><input name="priority" type="number" form="editForm" bind:value={editPriority} required/></td>
            <td><input name="creation_date" type="date" form="editForm" bind:value={editCreationDate} required/></td>
            <td></td>
            <td>
              <button type="submit" form="editForm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
                Submit
              </button>
              <button on:click={cancel}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
                Cancel
              </button>
            </td>
          </tr>
        {:else}
          <tr>
            <td><input type="checkbox" class="trollCheckbox" on:click|preventDefault={completeTask}/></td>
            <td>{task.taskName}</td>
            <td>{task.priority}</td>
            <td>{task.creation_date}</td>
            <td>{task.days_not_done}</td>
            <td>
              <button on:click={() => edit(i, task)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
                Edit
              </button>
              <button on:click={() => deleteTask(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                Delete
              </button>
            </td>
          </tr>
        {/if}
      {/each}
    {/await}
      <tr>
        <td></td>
        <td><input name="taskName" type="text" form="addForm" placeholder="Task Name" bind:value={addTaskName} required/></td>
        <td><input name="priority" type="number" form="addForm" placeholder="Priority" bind:value={addPriority} required/></td>
        <td><input name="creation_date" type="date" form="addForm" bind:value={addCreationDate} required/></td>
        <td></td>
        <td>
          <button type="submit" form="addForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle me-2" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            Add
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<footer>
  <p class="footerP">®™©℠℗Gabriel Shiu 2024 CS 4241 Webware: </p>
  <a href="https://github.com/s-leirbag/a4-Gabriel-Shiu">Github Repo</a>
</footer>
