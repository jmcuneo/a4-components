import React, {useState} from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <body>
            <form className="loginForm" action='/login' method='POST'>
                <label className="loginField">
                    <input type='text' name='username' placeholder="username" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="loginField">
                    <input type='password' name='password' placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input className="loginField" type='submit'/>
            </form>
        </body>
    )
}
