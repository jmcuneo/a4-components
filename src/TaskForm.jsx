import React, { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await onSubmit(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="task-input"
        placeholder="Enter task here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
