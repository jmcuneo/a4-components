import React, {useEffect, useState} from 'react';
import '../css/App.css';
import {user} from "../dataTypes";

type Props = {
    users: user[]
}
function usersTable(props: Props) {

    return (
        <table>
            <thead>
            <tr>
                <th>username</th>
            </tr>
            </thead>
            <tbody>
            {props.users.map((user: user) => (
                <tr>
                    <td>{user.username}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default usersTable;
