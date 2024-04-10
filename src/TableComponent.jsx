import React, { useState, useEffect } from 'react';

const TableComponent = (props) => {
  const appdata = props.appdata

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Class</th>
            <th>Grade</th>
            <th>Credits</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {appdata.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.class}</td>
              <td>{entry.grade}</td>
              <td>{entry.credits}</td>
              <td>{entry.currentGPA}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
