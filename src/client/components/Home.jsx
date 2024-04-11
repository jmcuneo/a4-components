import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      await axios.post(`/api/todos/${id}/toggle`, { completed: !completed });
      fetchTodos();
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleAddTodo = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/todos", { title: newTodo, completed: false });
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="container bg-white shadow rounded p-4">
      <div className="d-flex align-items-center custom-header">
        <h1 className="mb-4 flex-grow-1 text-center">To-Do List</h1>
        <button onClick={handleLogout} className="btn btn-danger btn-sm">
          Logout
        </button>
      </div>
      <ul className="list-group mb-3">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo._id, todo.completed)}
              className="form-check-input me-2"
            />
            {todo.title}
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form className="d-flex gap-2 mt-3" onSubmit={handleAddTodo}>
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default Home;
