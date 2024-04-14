import React, { useState, useEffect } from 'react';

function App() {
  const [frontString, setFrontString] = useState('first half here');
  const [backString, setBackString] = useState('second half here');
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    updateTable();
  }, []);

  const submit = async (event) => {
    event.preventDefault();

    const concatenatedString = frontString + ' ' + backString;
    await addData(concatenatedString);
    setFrontString(''); // Reset input fields after submission
    setBackString('');
  };

  const addData = async (combinedString) => {
    const method = "/add";
    const response = await fetch("/add", {
      method: "POST",
      body: JSON.stringify({ method: method, string: combinedString })
    });
    updateTable();
  };

  const updateTable = async () => {
    const response = await fetch("/getArray");
    const currentArray = await response.json();
    setDataArray(currentArray);
  };

  const deleteEntry = async (index) => {
    const method = "/delete";
    const response = await fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ method: method, index: index })
    });
    updateTable();
  };

  const editEntry = async (index, content) => {
    const method = "/edit";
    const response = await fetch("/edit", {
      method: "POST",
      body: JSON.stringify({ method: method, index: index, content: content })
    });
    updateTable();
  };

  return (
    <div>
      <h1 className="center">This site will combine your text!</h1>
      <form onSubmit={submit}>
        <label><input type="text" value={frontString} onChange={(e) => setFrontString(e.target.value)} /></label>
        <label><input type="text" value={backString} onChange={(e) => setBackString(e.target.value)} /></label>
        <br />
        <button>Combine!</button>
      </form>

      <DataTable dataArray={dataArray} deleteEntry={deleteEntry} editEntry={editEntry} />
    </div>
  );
}

function DataTable({ dataArray, deleteEntry, editEntry }) {
  return (
    <table className="center">
      <thead>
        <tr>
          <th>Entry Number</th>
          <th>Combined String</th>
          <th>String Length</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {dataArray.map((entry, index) => (
          <DataRow key={index} index={index} entry={entry} deleteEntry={deleteEntry} editEntry={editEntry} />
        ))}
      </tbody>
    </table>
  );
}

function DataRow({ index, entry, deleteEntry, editEntry }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{entry}</td>
      <td>{entry.length}</td>
      <td><button onClick={() => deleteEntry(index)}>Delete</button></td>
      <td><button onClick={() => {
        const newInput = prompt('Enter new value: ');
        if (newInput !== null) {
          editEntry(index, newInput);
        }
      }}>Edit</button></td>
    </tr>
  );
}

export default App;
