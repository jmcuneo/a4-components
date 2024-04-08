import React, {useEffect, useState} from 'react';
import "./App.css"

const App = () =>{
    const [dataArray, setDataArray] = useState([]);

    useEffect(() =>{
        fetchData().then(r => window.reload);
    },[])

    const fetchData = async() =>{
        try{
            const response = await fetch('/result');
            const data = await response.json();
            setDataArray(data);
    }catch(error){
        console.log('Error Fetching Data',error);
        }
    }

    const newData = () =>{
        const model = document.getElementById("model").value;
        const year = document.getElementById("year").value;
        const mpg = document.getElementById("mpg").value;
        return {model: model, year: year, mpg: mpg};
    }

    const handleAdd = async function( event ) {
        if(confirm("Do you want to add the data? Tips: the age will only show when year is a number")){
            try{
                const response = await fetch("/add", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData())
                });
                if(response.ok){
                    await fetchData();
                }
            }catch(error){
                console.log('Error Adding Data', error)
            }
        }}
    const handleUpdate = async(index, newData) => {
        if (confirm("Do you want to overwrite the old data with new data? Tips: the age will only show when year is a number")) {
            try {
                const response = await fetch(`/update/${index}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                });
                if (response.ok) {
                    await fetchData()
                }
            } catch (error) {
                console.log('Error Updating Data', error);
            }
        }
    }

    const handleDelete = async (index) => {
        if (confirm("Do you want to delete the data?")) {
            try {
                const response = await fetch("/delete", {
                    method: "DELETE",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({index: index})
                });
                if (response.ok) {
                    await fetchData()
                }
            } catch (error) {
                console.log('Error Deleting Data', error);
            }
        }
    }

    const renderDataRows = () =>{
        return dataArray.map((h,index) => {
            return (
            <tr key={index}>
                <td>{h.model}</td>
                <td>{h.year}</td>
                <td>{h.mpg}</td>
                <td>{h.age}</td>
                <td>
                    <input
                        type="button"
                        value="Delete"
                        onClick={() => handleDelete(index)}
                    />
                </td>
                <td>
                    <input
                        type="button"
                        value="Update"
                        onClick={() => handleUpdate(index, newData())}
                    />
                </td>
            </tr>
        );}
        );
    }

    return(<div className="grid-container">
        <div className="right-content">
            <form id="myForm">
                <br/>
                <b>Car Information</b><br/>
                <input type="text" id="model" defaultValue="your car's model"/><br/>
                <input type="text" id="year" defaultValue="your car's year"/><br/>
                <input type="text" id="mpg" defaultValue="your car's mpg"/>
                <input
                    type="button"
                    value="Add"
                    onClick={() => handleAdd()}
                />
                <br/>
            </form>
        </div>
        <div className="left-content">
            <table>
                <thead>
                <tr>
                    <th>Model</th>
                    <th>Year</th>
                    <th>MPG</th>
                    <th>Age</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {renderDataRows()}
                </tbody>
            </table>
        </div>
    </div>

    );

}


export default App;