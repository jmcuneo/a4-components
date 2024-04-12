import React, {useState} from 'react';
import './css/App.css';
import Homepage from "./Routes/Homepage";
import {createBrowserRouter} from "react-router-dom";
import PatchData from "./Routes/PatchData";
import Login from "./Routes/Login";
import AddOrDelete from "./Routes/AddOrDelete";
import Users from "./Routes/Users";
import {RouterProvider} from "react-router";
import {game, user} from "./dataTypes";

function App() {
    const [users, setUsers] = useState<user[]>([{username: 'username', password: 'password'}]);
    const [games, setGames] = useState<game[]>([]);
    const [currentUser, setCurrentUser] = useState<user>({username: 'username', password: 'password'});



    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: <h2>Something went wrong!</h2>,
            element: <Homepage  games={games} user={currentUser} setGames={setGames}/>
        },
        {
            path: "/AddOrDelete",
            errorElement: <h2>Something went wrong!</h2>,
            element: <AddOrDelete  games={games} setGames={setGames} user={currentUser}/>
        },
        {
            path: "/Logout",
            errorElement: <h2>Something went wrong!</h2>,
            element: <Login users={users}/>
        },
        {
            path: "/PatchData",
            errorElement: <h2>Something went wrong!</h2>,
            element: <PatchData  games={games} setGames={setGames} user={currentUser}/>
        },
        {
            path: "/Users",
            errorElement: <h2>Something went wrong!</h2>,
            element: <Users  setUsers={setUsers} users={users}/>
        },
    ]);
  return (
    <div className="h-screen bg-amber-200 flex ">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
