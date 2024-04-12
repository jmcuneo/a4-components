// Table.js
import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <table className="table-auto bg-white shadow-md rounded px-20 pt-6 pb-8 mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Count</th>
            <th className="px-4 py-2">Added Date</th>
          </tr>
        </thead>
        <tbody id="results" className="text-center">
          {this.props.rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.count}</td>
              <td>{row.addedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;