import React, {ChangeEvent, useState} from 'react';
import '../css/App.css';
import NavBar from "../Components/NavBar";
import {user} from "../dataTypes";
import UsersTable from "../Components/UsersTable";

type Props = {
    users: user[]
    setUsers: (u: user[]) => void
}
function Users(props: Props) {
    const [user, setUser] = useState<user>({username: '', password: ''});


    function addUser() {
        let temp: user[] = props.users
        temp.push(user)
        props.setUsers(temp);
        setUser({username: '', password: ''});
    }

    function deleteUser() {
        let temp: user[] = [];
        props.users.forEach((u: user) => {
            if (user.username !== u.username || user.password !== u.password) {
                temp.push(u);
            }
        });
        props.setUsers(temp);
        setUser({username: '', password: ''});
    }

    return (
        <div className="h-full w-full flex flex-col">
            <div className="bg-blue-950 h-16 w-full flex justify-end items-center p-0 m-0">
                <NavBar />
            </div>
            <div className="mainDiv bg-amber-200 flex-grow flex flex-row gap-16">
                <div
                    className="bg-blue-100 w-96 h-4/5 flex flex-col align-middle justify-center p-4 rounded-2xl border-4 border-blue-950">
                    <h1 className="font-bold text-2xl">Enter user information</h1>
                    <br/>
                    <p>username</p>
                    <input value={user.username} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUser(prevState => ({
                            ...prevState, username: e.target.value
                        }))
                    }}/>
                    <p>password</p>
                    <input type={"password"} value={user.password} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUser(prevState => ({
                            ...prevState, password: e.target.value
                        }))
                    }}/>
                    <br/>
                    <br/>
                    <div className="flex justify-between">
                        <button onClick={addUser}
                                className="bg-amber-950 text-white w-40 h-12 hover:bg-amber-100 hover:text-black">Add
                            User
                        </button>
                        <button onClick={deleteUser}
                                className="bg-amber-950 text-white w-40 h-12 hover:bg-amber-100 hover:text-black">Delete
                            User
                        </button>
                    </div>
                </div>
                <div id="tableDiv"
                     className="bg-blue-100 w-1/2 h-4/5 flex flex-col align-middle justify-start p-4 rounded-2xl border-4 border-blue-950">
                    <UsersTable users={props.users} ></UsersTable>
                </div>
            </div>
        </div>
    );
}

export default Users;
