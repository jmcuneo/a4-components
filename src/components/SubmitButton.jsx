import React from "react";
import { Button } from 'semantic-ui-react';
import { createTable } from "./TodoTable";
import { resetTaskName } from "./TodoForm";
import { signal, computed } from "@preact/signals-react";

export const submitButtonSignal = signal('Submit');
/**
 * Uses semantic-ui-react's {@link Button} component. When clicked, calls {@link SubmitButton.submit submit}
 */
class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.submitText = computed(() => submitButtonSignal.value);
    }
    render() {
        return (
            <Button id="submit" onClick={this.submit} title={this.submitText}>
                {this.submitText}
            </Button>
        );
    }

    /**
     * Gets all form values that have the data-send attribute. The first child of the item with the
     * attribute is first checked, and if that has no value attribute, then it checks the item with
     * data-send for a data-value attribute.
     * @returns A JSON object that, for all items in the form, has {id: value} added to the JSON
     */
    getFormValues = () => {
        let json = {};
        document.getElementById("todoForm").querySelectorAll("[data-send]").forEach(j => {
            // i is any element that has an element that is hard-coded to be sent with the data
            const i = j.querySelector(":first-child");
            if (i.value === undefined) {
                let k = document.querySelector('[data-value]');
                if (k.getAttribute('data-value')) {
                    json[k.id] = k.getAttribute('data-value');
                }
            } else if (i.value === '') {
                // Ensure there are no empty fields
                alert("You must fill out all fields!");
                return;
            } else if (i.id === undefined) {
                // Not necessary for this assignment, but will still prevent errors
                console.error("ID undefined in form element");
                return;
            } else {
                json[i.id] = i.value;
            }
        });
        return json;
    };

    submit = (event) => {
        event.preventDefault();

        let json = this.getFormValues();
        json.method = "submit";

        const body = JSON.stringify(json);
        fetch("/submit", {
            body,
            method: "POST"
        }).then(response => response.json())
            .then(newTable => {
                console.log("Data recieved from server.");
                createTable(newTable);
            });

        // Change 'Update' to 'Submit', or do nothing if it is already 'Submit'
        if (submitButtonSignal.value === 'Update') {
            submitButtonSignal.value = 'Submit';
            document.getElementById('cancelButton').remove();
        }
        resetTaskName();
    };
}

export default SubmitButton;