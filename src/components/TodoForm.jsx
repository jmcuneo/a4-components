import React from "react";
import { Form, FormField, FormInput, FormGroup } from 'semantic-ui-react';
import SubmitButton, { submitButtonSignal } from "./SubmitButton";
import PriorityDropdown, { priorityDropdownSignal } from "./PriorityDropdown";
import { ClearButton } from "./ClearButton";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Form attached segment id="todoForm" style={{ display: 'none' }}>
                <FormGroup widths={3}>
                    <FormField>
                        <FormInput label="Task Name:" type="text" placeholder="Task" name="taskname" id="taskname" data-send />
                    </FormField>
                    <FormField>
                        <label for="priority">Priority:</label>
                        <PriorityDropdown />
                    </FormField>
                    <FormField>
                        <FormInput label="Due Date:" type="date" name="duedate" id="duedate" data-send />
                    </FormField>
                    <SubmitButton />
                    <ClearButton />
                </FormGroup>
            </Form>
        );
    }
}

export function resetTaskName() {
    const taskname = document.getElementById('taskname');
    taskname.disabled = false;
    taskname.ariaDisabled = 'false';
    taskname.classList.remove('disabled');
    taskname.value = '';
}

/**
* Creates a cancel button and adds it to the form.
* Clicking the cancel button causes the form to empty and removes the cancel button.
* Also changes 'Update' to 'Submit'
*/
export function createCancelButton() {
    if (document.getElementById('cancelButton') !== null) {
        // Cancel button already exists; don't keep making more
        return;
    }
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.id = 'cancelButton';
    cancelButton.classList = 'ui button';
    cancelButton.title = 'Cancel the current edit';

    cancelButton.onclick = function (e) {
        e.preventDefault();
        // Empty the form values
        resetTaskName();

        priorityDropdownSignal.value = '';
        initDate(document.getElementById('duedate'));

        // Change 'Update' to 'Submit'
        submitButtonSignal.value = 'Submit';

        // Remove cancel button
        cancelButton.remove();
    };

    // Add cancel button to form
    const form = document.getElementById('todoForm');
    const formContent = form.querySelector('div:first-of-type');
    formContent.appendChild(cancelButton);
}

/**
* Sets the value of the given input element to be the current date
* @param {HTMLInputElement} dateField A date input element
*/
export function initDate(dateField) {
    // Initializes the date selector to the current date
    let date = new Date().toISOString("YYYY-MM-DD");
    dateField.value = date.substring(0, date.indexOf('T'));
}

export default TodoForm;
