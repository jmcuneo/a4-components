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

  let currentDate = new Date();
  let tasks;
  let active = false;
  let selectedRowIds = [];
  const headers = [{key: "task", value: "Task"},{key: "creation date", value: "Creation Date"}, {key: "due date", value: "Due Date"} ]

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
        creationDate: currentDate,
        dueDate: formData.get("due-date"),
      }),
    });

    tasks = await response.json();
  };

  const getTaskData = async function () {
    const response = await fetch("/get-tasks");
    tasks = await response.json();
  };
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
<!-- <div class="div" id="results-container">
  {#if tasks.length > 0}
  <DataTable {headers} zebra stickyHeader selectable batchSelection={active} bind:selectedRowIds rows={tasks}>
    <Toolbar>
    <ToolbarBatchActions
      bind:active
      on:cancel={(e) => {
        e.preventDefault();
        active = false;
      }}
    >
    <!-- TODO send a request instead of just modifying the list 
      <Button
        disabled={selectedRowIds.length === 0}
        on:click={() => {
          tasks = tasks.filter((task) => !selectedRowIds.includes(task.task));
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
</div> -->
