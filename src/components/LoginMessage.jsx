import React from "react";
import { Message, Header, Button, Icon } from 'semantic-ui-react';
import { showElement, hideElement } from "../App";

class LoginMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Message id="loginMessage" attached>
                <span id="notLoggedIn">
                    <Header role="heading" aria-level="1">Login to access your TODO</Header>
                    <a href="auth/github">
                        <Button id="login" icon tabIndex={0}>
                            <Icon name='github' />
                            Login with Github
                        </Button>
                    </a>
                </span>
                <span id="loggedIn" style={{ display: 'none' }}>
                    <Header id="welcomeMessage" role="heading" aria-level="1">Hello, &#123;User&#125;</Header>
                    <Button id="signout" icon tabIndex={0} onClick={logout}>
                        <Icon name='sign out' />
                        Logout
                    </Button>
                </span>
            </Message>
        );
    }
}

/**
    * Gets the cookies of the page and uses it to figure out who is logged in.
    * Toggles the greeting message, and hides the login messages.
    * Also toggles the logout button.
    */
export function greetUser() {
    // Get all the cookies
    let cookies = decodeURIComponent(document.cookie).split('; ').map(i => {
        return i.substring(i.indexOf('=') + 1);
    });

    const displayName = cookies[2];
    const username = cookies[1];
    const greeting = `${displayName} (${username})`;
    const message = document.getElementById('welcomeMessage');
    message.innerText = message.innerText.replace('{User}', greeting);

    hideElement(document.getElementById('notLoggedIn'));
    showElement(document.getElementById('loggedIn'));
}

/**
* Hides the welcome message and shows the options to sign in.
*/
export function farewellUser() {
    const message = document.getElementById('welcomeMessage');
    hideElement(document.getElementById('loggedIn'));
    message.innerText = "Hello, {User}.";
    showElement(document.getElementById('notLoggedIn'));

    // Hide the form
    hideElement(document.getElementById('todoForm'));

    // Hide the table
    hideElement(document.getElementById('todo'));
}

/**
* Signs the user out by clearing the cookies
*/
export function logout(e) {
    e.preventDefault();
    // Clear the cookies
    document.cookie.split(';').forEach(i => {
        document.cookie = i + "; expires=01 Jan 2000 12:00:00 UTC";
    });
    farewellUser();
}

export default LoginMessage;