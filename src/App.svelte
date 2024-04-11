<script>
  import {
    Button,
    Form,
    FormGroup,
    TextInput,
    DatePickerInput,
    DatePicker,
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarBatchActions,
  } from "carbon-components-svelte";

  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let currentDate = new Date();
  let tasks = writable([]);
  let active = false;
  let selectedRowIds = [];
  const headers = [
    { key: "task", value: "Task" },
    { key: "creationDate", value: "Creation Date" },
    { key: "dueDate", value: "Due Date" },
  ];

  function updateTasks(taskData) {
    taskData.forEach((element, index) => (element.id = index));
    $tasks = taskData;
  }

  const sendTaskData = async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: formData.get("task-name"),
        creationDate: currentDate.toISOString().split("T")[0],
        dueDate: new Date(formData.get("due-date").toString())
          .toISOString()
          .split("T")[0],
      }),
    });

    let data = await response.json();
    updateTasks(data);
  };

  const getTaskData = async function () {
    const response = await fetch("/get-tasks");
    let data = await response.json();
    updateTasks(data);
  };

  const deleteTaskData = async function (tasksToDelete) {
    console.log(JSON.stringify(tasksToDelete));
    const response = await fetch("/delete-tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tasksToDelete),
    });

    if (response.status === 404) {
      return;
    } else {
      let data = await response.json();
      updateTasks(data);
    }
  };

  onMount(getTaskData);
</script>

<div id="form-container">
  <Form
    on:submit={async (e) => {
      sendTaskData(e);
    }}
  >
    <FormGroup>
      <TextInput
        labelText="Input task"
        name="task-name"
        placeholder="Enter a task to add or modify"
        id="task-input"
        required
      />
    </FormGroup>
    <FormGroup>
      <DatePicker
        datePickerType="single"
        minDate={currentDate}
        value={currentDate.toISOString()}
        on:change
      >
        <DatePickerInput
          labelText="Pick a due date"
          placeholder="mm/dd/yyyy"
          name="due-date"
          id="date-input"
          required
        />
      </DatePicker>
    </FormGroup>
    <FormGroup>
      <Button type="submit">Submit</Button>
    </FormGroup>
  </Form>
</div>
<div class="div" id="results-container">
  {#if $tasks.length > 0}
    <h2 id="results-header">Results:</h2>
    <DataTable
      {headers}
      zebra
      stickyHeader
      selectable
      batchSelection={active}
      bind:selectedRowIds
      rows={$tasks}
    >
      <Toolbar>
        <ToolbarBatchActions
          bind:active
          on:cancel={(e) => {
            e.preventDefault();
            active = false;
          }}
        >
          <Button
            disabled={selectedRowIds.length === 0}
            on:click={() => {
              let tasksToDelete = $tasks.filter((task) => {
                return selectedRowIds.includes(task.id);
              }); // list of tasks
              deleteTaskData(tasksToDelete);
              //to delete = tasks. get(selectedrowIds)
              //tasks = deletetasks()
              //selected ids = []
              // tasks = tasks.filter(
              //   (task) => !selectedRowIds.includes(task.task)
              // );
              selectedRowIds = [];
            }}
          >
            Delete
          </Button>
        </ToolbarBatchActions>
        <ToolbarContent>
          <Button on:click={() => (active = true)}>Edit tasks</Button>
        </ToolbarContent>
      </Toolbar>
    </DataTable>
  {/if}
</div>

<style>
  #results-header {
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>
