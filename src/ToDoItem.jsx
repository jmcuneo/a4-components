import React from "react";

const ToDoItem = ({ item, index, onEdit, onDelete }) => {
  const getPriorityText = (firstCharacter) => {
    switch (firstCharacter) {
      case "0":
      case "1":
      case "2":
      case "3":
        return "Low priority";
      case "4":
      case "5":
      case "6":
        return "Medium priority";
      case "7":
      case "8":
      case "9":
        return "High priority";
      default:
        return "N/A";
    }
  };

  return (
    <li>
      <span>{item.yourname}</span>
      <button onClick={() => onEdit(index)}>Edit</button>
      <button onClick={() => onDelete(index)}>Delete</button>
      <p>{getPriorityText(item.yourname.charAt(0))}</p>
    </li>
  );
};

export default ToDoItem;
