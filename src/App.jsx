import React from "react";
import 'fomantic-ui/dist/semantic.min.css';
import { Container } from 'semantic-ui-react';
import TodoTable, { fetchData } from "./components/TodoTable";
import TodoForm from "./components/TodoForm";
import LoginMessage from "./components/LoginMessage";

class App extends React.Component {
    constructor(props) {
        super(props);
        fetchData();
    }

    render() {
        return (
            <main role="main">
                <Container>
                    <LoginMessage />
                    <TodoForm />
                </Container>
                <Container>
                    <TodoTable />
                </Container>
            </main>
        );
    }
}

/**
* Sets the element's display to inherit and sets the aria-hidden attribute to false
* @param {HTMLElement} element The element to show
*/
export function showElement(element) {
    element.style.display = 'inherit';
    element.ariaHidden = 'false';
}

/**
* Sets the element's display to none and sets the aria-hidden attribute to true
* @param {HTMLElement} element The element to hide
*/
export function hideElement(element) {
    element.style.display = 'none';
    element.ariaHidden = 'true';
}

export default App;