import './App.css';
import {useEffect} from "react";

function App() {

    const submit = async function( event ) {
        // stop form submission from trying to load
        // a new .html page for displaying results...
        // this was the original browser behavior and still
        // remains to this day
        event.preventDefault()

        const json = {
            starting_time: document.querySelector("#workout_start_time").value,
            ending_time: document.querySelector("#workout_end_time").value,
            workout_type: document.querySelector('input[name="workout_type"]:checked').value,
            workout_intensity: document.querySelector("#workout_intensity").value
        }

        fetch('/post_row', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: { 'Content-Type': 'application/json' }
        }).then(async (response) => {
            const data = await response.json(); // Parse the response as JSON
            addTable(JSON.parse(data));
        });
    }

    function addRow(table, data) {
        const row = table.insertRow();
        row.insertCell().textContent = data.starting_time;
        row.insertCell().textContent = data.ending_time;
        row.insertCell().textContent = data.workout_type;
        row.insertCell().textContent = data.workout_intensity;
        row.insertCell().textContent = data.estimated_calories;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editRow(row);
        };
        row.insertCell().appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteRow(row).then();
        };
        row.insertCell().appendChild(deleteButton);
    }

    /*This function deals with adding the one row of data upon submitting the form*/
    function addTable(data) {
        const table = document.getElementById("workout_data_table");
        addRow(table, data);
    }

    /*This function deals with adding an array of data from the server. Mainly for when you refresh the page*/
    function updateTable(dataArr) {
        const table = document.getElementById("workout_data_table");
        for(const data in dataArr) {
            addRow(table, dataArr[data]);
        }
    }

    /*This function deals with confirming any edits on a particular data row by sending a PUT request to the server*/
    async function confirmEdit(row, starting_time, ending_time, workout_type, workout_intensity) {
        const index = row.rowIndex - 1;
        const json = {
            index: index,
            starting_time: starting_time,
            ending_time: ending_time,
            workout_type: workout_type,
            workout_intensity: workout_intensity
        }
        const response = await fetch("/edit_row", {
            method: "PUT",
            body: JSON.stringify({ json }),
        });

        const table = document.getElementById("workout_data_table");
        table.deleteRow(index+1);
        const data = await response.json();
        const newRow = table.insertRow(index+1);
        newRow.insertCell().textContent = data.starting_time;
        newRow.insertCell().textContent = data.ending_time;
        newRow.insertCell().textContent = data.workout_type;
        newRow.insertCell().textContent = data.workout_intensity;
        newRow.insertCell().textContent = data.estimated_calories;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editRow(newRow);
        };
        newRow.insertCell().appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteRow(newRow);
        };
        newRow.insertCell().appendChild(deleteButton);
    }

    /*This function deals with the rows read-only cells being turned into input cells (with respective input types)*/
    function editRow(row) {

        const editStartTime = document.createElement("input");
        editStartTime.type = "time";
        editStartTime.id = "edit_start_time"
        editStartTime.value = row.cells.item(0).textContent;
        row.deleteCell(0);
        row.insertCell(0).appendChild(editStartTime);

        const editEndTime = document.createElement("input");
        editEndTime.type = "time";
        editEndTime.id = "edit_end_time"
        editEndTime.value = row.cells.item(1).textContent;
        row.deleteCell(1);
        row.insertCell(1).appendChild(editEndTime);


        const editWorkoutType = document.createElement("select");
        editWorkoutType.id = "edit_type"
        const optionFieldSoccer = document.createElement("option");
        optionFieldSoccer.value = "Soccer"
        optionFieldSoccer.textContent = "Soccer";

        const optionFieldFootball = document.createElement("option");
        optionFieldFootball.value = "Football"
        optionFieldFootball.textContent = "Football"

        const optionFieldBoxing = document.createElement("option");
        optionFieldBoxing.value = "Boxing"
        optionFieldBoxing.textContent = "Boxing"

        const optionFieldWrestling = document.createElement("option");
        optionFieldWrestling.value = "Wrestling"
        optionFieldWrestling.textContent = "Wrestling"

        editWorkoutType.options.add(optionFieldSoccer);
        editWorkoutType.options.add(optionFieldFootball);
        editWorkoutType.options.add(optionFieldBoxing);
        editWorkoutType.options.add(optionFieldWrestling);

        editWorkoutType.value = row.cells.item(2).textContent;
        row.deleteCell(2);
        row.insertCell(2).appendChild(editWorkoutType);


        const editIntensity = document.createElement("select");
        editIntensity.id = "edit_intensity"
        const optionFieldLow = document.createElement("option");
        optionFieldLow.value = "Low"
        optionFieldLow.textContent = "Low";

        const optionFieldMed = document.createElement("option");
        optionFieldMed.value = "Medium"
        optionFieldMed.textContent = "Medium"

        const optionFieldHigh = document.createElement("option");
        optionFieldHigh.value = "High"
        optionFieldHigh.textContent = "High"

        editIntensity.options.add(optionFieldLow);
        editIntensity.options.add(optionFieldMed);
        editIntensity.options.add(optionFieldHigh);

        editIntensity.value = row.cells.item(3).textContent;
        row.deleteCell(3);
        row.insertCell(3).appendChild(editIntensity);

        row.deleteCell(5);
        const confirmEditButton = document.createElement("button");
        confirmEditButton.textContent = "Confirm";
        confirmEditButton.onclick = function() {
            confirmEdit(row, document.querySelector("#edit_start_time").value, document.querySelector("#edit_end_time").value, document.querySelector("#edit_type").value, document.querySelector("#edit_intensity").value).then();
        };
        row.insertCell(5).appendChild(confirmEditButton);

    }

    /*This function deals with row deletion*/
    async function deleteRow(row) {
        const index = row.rowIndex - 1; // Adjust for header row
        const response = await fetch("/delete_row", {
            method: "DELETE",
            body: JSON.stringify({ index }),
        });

        if (response.ok) {
            row.remove(); // Remove the row from the table
        } else {
            console.error("Failed to delete row");
        }
    }

    fetch('/get_row', {
        method: 'GET'
    }).then(async (res) => {
        const resJSON = await res.json();
        updateTable(JSON.parse(resJSON));
    });

    return (
        <body>
        <form>


            <label className="workout_form_label">Workout Calorie Calculator</label>

            <br/><br/>

            <div>
                <label htmlFor="workout_start_time">Workout Starting Time:</label>
                <input type="time" id="workout_start_time" name="start_time"/>

                <label htmlFor="workout_end_time">Workout Ending Time:</label>
                <input type="time" id="workout_end_time" name="end_time"/>
            </div>

            <br/><br/>

            <div>
                <label>Workout Type:</label><br/>

                <input type="radio" id="Soccer" name="workout_type" value="Soccer"/>
                <label htmlFor="Soccer">Soccer</label><br/>
                <input type="radio" id="Football" name="workout_type" value="Football"/>
                <label htmlFor="Football">Football</label><br/>
                <input type="radio" id="Boxing" name="workout_type" value="Boxing"/>
                <label htmlFor="Boxing">Boxing</label><br/>
                <input type="radio" id="Wrestling" name="workout_type" value="Wrestling"/>
                <label htmlFor="Wrestling">Wrestling</label><br/>

                <label htmlFor="workout_intensity">Workout Intensity:</label>
                <select name="intensity_select" id="workout_intensity">
                    <option value="Low">1 - Low</option>
                    <option value="Medium">2 - Medium</option>
                    <option value="High">3 - High</option>

                </select>
            </div>

            <button type="submit" onClick={submit}>Submit</button>
        </form>
        <br/><br/>

        <div>
            <table id="workout_data_table">
                <tr>
                    <th>Starting Time</th>
                    <th>Ending Time</th>
                    <th>Workout Type</th>
                    <th>Workout Intensity</th>
                    <th>Estimated Calories Burned</th>
                </tr>
            </table>
        </div>
        </body>
    );
}

export default App;
