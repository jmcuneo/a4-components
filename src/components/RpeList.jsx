import { useEffect, useState } from "react";

function RpeList({ rpeItems, setRPE }) {
    const handleDelete = (e) => {
        e.preventDefault();

        const json = {
            "deleteId": e.target.value,
        }
        const body = JSON.stringify(json)

        fetch("/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setRPE(data);
            });
    };

    const rpeList =
        rpeItems === undefined
            ? null
            : rpeItems.map((entry) => (
                <tr>
                    <td>{entry.userID}</td>
                    <td>{entry.weight}</td>
                    <td>{entry.reps}</td>
                    <td>{entry.rpe}</td>
                    <td>${entry.oneRM}</td>
                    <td>${new Date(entry.date).toLocaleDateString()}</td>
                    <td>
                        <button class="delete-btn" value= {entry._id} onClick={(e) => handleDelete(e)}>Delete</button>
                    </td>
                </tr >
            ));

    return (
        <table>
            <tr>
                <th>ID</th>
                <th>Weight</th>
                <th>Reps (lbs)</th>
                <th>RPE ($)</th>
                <th>OneRM</th>
                <th>Date</th>
                <th>Delete Entry</th>
            </tr>
            {rpeList}
        </table>
    );
}

export default RpeList;