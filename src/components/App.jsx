// App.js
import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import Table from './Table';

class App extends Component {
  state = {
    rows: []
  };

  addRow = (row) => {
    this.setState(prevState => ({
      rows: [...prevState.rows, row]
    }));
  };
  componentDidMount() {
    this.getData();
    this.getUsername();
  }

  getData = async () => {
    const response = await fetch("/api/getdata", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.status === 200) {
      const data = await response.json();
      this.setState({ rows: data });
    }
  };
  getUsername = async () => {
    const response = await fetch("/api/getusername", {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.status === 200) {
      const username = await response.json();
      console.log(username);
    }
  };

  submit = async (name) => {
    const response = await fetch("/api/add", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    if (response.status === 200) {
      const row = await response.json();
      this.addRow(row);
    }
  };

  logoutFunc = async () => {
    const response = await fetch("/logout", {
      method: "GET",
      headers: { 'Content-Type': 'application' }
    });

    if (response.status === 200) {
      window.location.href = '/login.html';
    }
  };

  render() {
    return (
      <div className="font-sans bg-gray-100" id="main">
        <Header logoutFunc={this.logoutFunc} />
        <Form submit={this.submit} />
        <Table rows={this.state.rows} />
      </div>
    );
  }
}

export default App;