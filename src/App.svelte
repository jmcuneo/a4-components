<script>
  let editMode = -1;

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
      return json 
    })
 
    return p
  }


  const submit = function( e ) {
    if(validateForm()) {
      let json = {_id: editMode, task: taskValue, class: classValue, duedate: duedateValue, importance: importanceValue, priority: 0}
      const body = JSON.stringify( json );
      if(editMode > 0) {
        promise = fetch( "/edit", {
          method:"POST",
          body
        }).then( response => response.json())
      } else {
        promise = fetch( "/add", {
          method:"POST",
          body
        }).then( response => response.json())
      }
    }
  }

  const editTask = function( data ) {
    taskValue = data.task;
    classValue = data.class;
    duedateValue = data.duedate;
    importanceValue = data.importance;

    editMode = data._id;
  }


  const deleteTask = function(data) {
    const body = JSON.stringify(data);
    fetch( "/delete", {
      method:"POST",
      body
    }).then( response => response.json())
    location.reload();
  }

  let promise = getTasks()



  // Validates the format of the submission before submitting
  function validateForm() {
    //TODO add in to make sure something gets placed for each field
    if(taskValue === "" || classValue === "" || duedateValue === "") {
      alert("Please fill in all fields");
      return false;
    } else {
      return true;
    }
  }
</script>

<main>
  <h1>Task List</h1>
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
        <button type="submit" class="btn btn-primary" id="submit-button" on:click={submit}>Submit</button>
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
          <button type="button" class="btn btn-secondary" value="Edit" on:click={() => editTask(taskObj)}>Edit</button>
          <button type="button" class="btn btn-secondary" value="Delete" on:click={() => deleteTask(taskObj)}>Delete</button>
        </td>
      </tr>
      {/each}
    </tbody>
  </table>
  {/await}
</main>