import React, {ChangeEvent, useState} from 'react';
import '../css/App.css';
import {user} from "../dataTypes";
import {useNavigate} from "react-router";

type Props = {
    users: user[]
}
function Login(props: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    function login() {
        props.users.forEach((user) => {
            if (user.password === password && user.username === username) {
                navigate('/');
            }
        });

        setPassword('');
        setUsername('');
    }




    return (
        <div className="mainDiv bg-amber-200 flex-grow flex">
            <p>username</p>
            <input value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} className="rounded p-2"/>
            <p>password</p>
            <input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" className="mb-8 rounded p-2" id="password"/>
            <button onClick={login} className="bg-blue-950 w-52 h-12 rounded text-white hover:bg-blue-300 hover:text-black">Submit</button>
        </div>
    );
}

export default Login;
