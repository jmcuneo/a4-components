import React from 'react';
import '../css/App.css';
import NavBar from "../Components/NavBar";

function Login() {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="bg-blue-950 h-16 w-full flex justify-end items-center p-0 m-0">
                <NavBar />
            </div>
            <div className="mainDiv bg-amber-200 flex-grow flex flex-row gap-16">
                <div
                    className="bg-blue-100 w-96 h-4/5 flex flex-col align-middle justify-center p-4 rounded-2xl border-4 border-blue-950">
                    <h1 className="font-bold text-2xl">Welcome to the Game Manager</h1>
                    <br/>
                    <p>With this manager, you can record the teams and scores of your games. The Add or Delete a Game
                        tab
                        lets you add and delete games. to make deleting games easier, you can click on a game in the
                        table
                        and automatically fill the form fields. To update games, select the Update a Game tab. Similar
                        to the
                        previous tab, you can click a game in the table to automatically fill the form's fields.
                        Finally, you
                        can delete and modify users in the View Users tab.
                    </p>
                </div>
                <div id="tableDiv"
                     className="bg-blue-100 w-1/2 h-4/5 flex flex-col align-middle justify-start p-4 rounded-2xl border-4 border-blue-950"></div>
            </div>
        </div>
    );
}

export default Login;
