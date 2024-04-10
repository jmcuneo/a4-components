import React from "react";
import { Button } from 'semantic-ui-react';
import { createTableHeaders } from "./TodoTable";

export class ClearButton extends React.Component {
    render() {
        return (
            <Button id="clear" onClick={this.clearData}>Clear</Button>
        );
    }

    clearData(event) {
        event.preventDefault();
        let json = { method: 'clear' };
        const body = JSON.stringify(json);
        fetch("/clear", {
            body,
            method: "POST"
        }).then(response => response.text())
            .then(status => console.log(status));

        // Delete previous elements
        document.querySelector("#todo > table").childNodes.forEach(a => a.remove());
        createTableHeaders();
    }
}
