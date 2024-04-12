import React from 'react';
import '../css/App.css';

function NavBar() {
    return (
        <div className="bg-blue-950 h-16 w-full flex justify-end items-center p-0 m-0">
            <div className="bg-blue-950 h-16 flex-grow flex items-center px-16">
                <h1 className="text-white text-3xl">Game Manager</h1>
            </div>
            <a href="/">
                <button className="text-white h-16 w-48 bg-blue-950 hover:text-black hover:bg-blue-300">Homepage
                </button>
            </a>
            <a href="/AddOrDelete">
                <button className="text-white h-16 w-48 bg-blue-950 hover:text-black hover:bg-blue-300">Add or delete a
                    Game
                </button>
            </a>
            <a href="/patchData">
                <button className="text-white h-16 w-48 bg-blue-950 hover:text-black hover:bg-blue-300">Update a Game
                </button>
            </a>
            <a href="/Users">
                <button className="text-white h-16 w-48 bg-blue-950 hover:text-black hover:bg-blue-300">View Users
                </button>
            </a>
            <a href="/logout">
                <button className="text-white h-16 w-48 bg-blue-950 hover:text-black hover:bg-blue-300"
                        id="logout">Logout
                </button>
            </a>
        </div>
    );
}

export default NavBar;
