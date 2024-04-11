import React from 'react';
import './css/App.css';
import Homepage from "./Routes/Homepage";
import {createBrowserRouter} from "react-router-dom";
import PatchData from "./Routes/PatchData";
import Login from "./Routes/Login";
import AddOrDelete from "./Routes/AddOrDelete";
import Users from "./Routes/Users";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            errorElement: <h2>Something went wrong!</h2>,
            element: <Homepage />
        },
        {
            path: "/AddOrDelete",
            errorElement: <h2>Something went wrong!</h2>,
            element: <AddOrDelete />
        },
        {
            path: "/Login",
            errorElement: <h2>Something went wrong!</h2>,
            element: <Login />
        },
        {
            path: "/PatchData",
            errorElement: <h2>Something went wrong!</h2>,
            element: <PatchData />
        },
        {
            path: "/Users",
            errorElement: <h2>Something went wrong!</h2>,
            element: <Users />
        },
    ]);
  return (
    <div className="h-screen bg-amber-200">
      <Homepage />
    </div>
  );
}

export default App;
