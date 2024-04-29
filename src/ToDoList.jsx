import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ items, onEdit, onDelete }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <ToDoItem
          key={index}
          item={item}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
