import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

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
      console.log("Fetched todos:", response.data);
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

  const handleLogout = async () => {
    // get request to /api/auth/logout
    console.log("Logging out...");
    try {
      await axios.get("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="container bg-white shadow rounded p-4">
        <div className="d-flex align-items-center custom-header">
          <h1 className="mb-4 flex-grow-1 text-center">To-Do List</h1>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            Logout
          </button>
        </div>
        <ul id="todos-list" className="list-group mb-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="form-check">
                <input
                  id={`todo-checkbox-${todo._id}`}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo._id, todo.completed)}
                  className="form-check-input me-2"
                />
                <label
                  className="form-check-label flex-grow-1"
                  htmlFor={`todo-checkbox-${todo._id}`}
                >
                  {todo.title}
                </label>
              </div>
              <div className="d-flex align-items-center">
                <span className="badge bg-success ms-2">
                  Created at: {moment(todo.createdAt).format("L LT")}
                </span>
                <span className="badge bg-secondary ms-2">
                  {todo.timeSinceAdded}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="btn btn-danger btn-sm ms-2"
                >
                  x
                </button>
              </div>
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
    </div>
  );
};

export default Home;
