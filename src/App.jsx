// src/App.jsx
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import ToDoList from "./ToDoList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/get-tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const handleTaskSubmit = async (taskName) => {
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ yourname: taskName }),
    });

    const updatedTasks = await response.json();
    setTasks(updatedTasks);
  };

  const handleTaskEdit = async (index, newText) => {
    await fetch("/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index, newText }),
    });

    setTasks((prev) => {
      const updated = [...prev];
      updated[index].yourname = newText;
      return updated;
    });
  };

  const handleTaskDelete = async (index) => {
    await fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index }),
    });

    setTasks((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <h2>Please put a single digit before your task to indicate priority (0-9) ex. "8-Laundry"</h2>
      <TaskForm onSubmit={handleTaskSubmit} />
      <ToDoList
        items={tasks}
        onEdit={(index) => {
          const newTask = prompt("Edit the task:", tasks[index].yourname);
          if (newTask) {
            handleTaskEdit(index, newTask);
          }
        }}
        onDelete={handleTaskDelete}
      />
    </div>
  );
};

export default App;
