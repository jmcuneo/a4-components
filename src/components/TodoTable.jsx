import React from "react";
import { Table, TableRow, TableHeaderCell } from 'semantic-ui-react';
import { showElement, hideElement } from "../App";
import { createCancelButton, initDate } from "./TodoForm";
import { greetUser } from "./LoginMessage";
import { submitButtonSignal } from "./SubmitButton";
import { priorityDropdownSignal } from "./PriorityDropdown";

class TodoTable extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHeaders() {
        return (
            <TableRow id="tableheaders" className="tableheaders">
                <TableHeaderCell>Task</TableHeaderCell>
                <TableHeaderCell>Priority</TableHeaderCell>
                <TableHeaderCell>Due Date</TableHeaderCell>
                <TableHeaderCell>Recommended Order</TableHeaderCell>
            </TableRow>
        );
    }

    render() {
        return (
            <div id="todo">
                <Table celled fixed singleLine>
                    {this.renderHeaders()}
                </Table>
            </div>
        );
    }
}

/**
* Creates table headers for the table in #todo
*/
export function createTableHeaders() {
    const table = document.querySelector("#todo > table");
    // Delete any existing headers
    if (document.getElementById("tableheaders")) {
        document.getElementById("tableheaders").remove();
    }

    // Create new headers
    let createNewTh = function (row, text) {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(text));
        row.appendChild(th);
    };

    // Add headers to table
    const headerTr = table.insertRow();
    headerTr.id = "tableheaders";
    headerTr.class = "tableheaders";
    createNewTh(headerTr, 'Task');
    createNewTh(headerTr, 'Priority');
    createNewTh(headerTr, 'Due Date');
    createNewTh(headerTr, 'Recommended Order');
}

/**
* Given an Array of JSON objects, update the table in #todo to hold all the values in it.
* Clears the table and creates headers it. 
* @param {Array} newTable An array of JSON objects that represents the table's values
*/
export function createTable(newTable) {
    const table = document.querySelector("#todo > table");

    // Delete previous elements
    table.childNodes.forEach(a => a.remove());

    createTableHeaders();


    for (let i = 0; i < newTable.length; i++) {
        const tr = table.insertRow();
        let name = tr.insertCell();
        let priority = tr.insertCell();
        let duedate = tr.insertCell();
        let order = tr.insertCell();

        name.appendChild(document.createTextNode(newTable[i].taskname));
        priority.appendChild(document.createTextNode(newTable[i].priority));
        duedate.appendChild(document.createTextNode(newTable[i].duedate));
        order.appendChild(document.createTextNode(newTable[i].ordernum));

        const editButton = createEditButton(newTable[i]);
        name.appendChild(editButton);

        // Show/hide edit button when hovering
        tr.onmouseover = function () {
            showElement(editButton);
        };

        tr.onmouseout = function () {
            hideElement(editButton);
        }

        // Clicking an element (other than the edit button) will delete it
        tr.onclick = function () {
            del(tr, newTable[i].taskname);
        }
    }
}


function del(tr, taskname) {
    const json = { taskname: taskname, method: 'delete' }
    const body = JSON.stringify(json);
    fetch('/delete', {
        body,
        method: "POST"
    }).then(response => response.text())
        .then(status => console.log(status));
    tr.remove();
}

/**
* Returns an edit button for a specific row on a provided row.
* Clicking the edit button puts all the edit values into the form, and changes 'Submit' to 'Update'
* @param {JSON} row A JSON element representing a row in a table
* @returns An edit button
*/
export function createEditButton(row) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.id = row.taskname.replaceAll(' ', '_') + 'EditButton';
    editButton.classList = 'mini ui button right floated';
    editButton.title = 'Edit this task';
    hideElement(editButton);
    editButton.style.textDecoration = 'none';

    // When you click the edit button, it allows the user to edit the item
    editButton.onclick = function (e) {
        e.preventDefault();
        // Stops the tr from being deleted
        e.stopPropagation();

        const taskname = document.getElementById('taskname');
        taskname.value = row.taskname;
        taskname.disabled = true;
        taskname.classList = taskname.classList + 'disabled';
        taskname.ariaDisabled = 'true';

        priorityDropdownSignal.value = row.priority;
        document.getElementById('duedate').value = row.duedate;

        // Change 'Submit' to 'Update'
        submitButtonSignal.value = 'Update';

        // Create cancel button
        createCancelButton();
    };

    return editButton;
}

export async function fetchData() {
    // Used when the page first loads; it gets the data
    const body = JSON.stringify({ 'method': 'load' });
    const response = await fetch("/load", {
        body,
        method: "POST"
    });

    const data = await response.text();
    let json = null;
    try {
        json = JSON.parse(data);
        console.log("Data recieved from server.");
    } catch (e) {
        console.log("Failed to connect to server!");
    }

    // User is not logged in
    if (json.nocontent) {
        console.log("User not logged in");
        return;
    }
    greetUser();
    initDate(document.getElementById('duedate'));
    showElement(document.getElementById('todoForm'));
    createTable(json);
}

export default TodoTable;