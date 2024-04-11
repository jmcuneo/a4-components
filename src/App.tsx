import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import {useCookies} from "react-cookie";
import {connectToDatabase} from "./service/database";

export default function App() {
    const [loginCookie, setCookie] = useCookies(['cookie-login']);

    window.onload = function () {
        connectToDatabase();
        if (loginCookie["cookie-login"] === "undefined") {
            setCookie("cookie-login", "");
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/Home" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}
