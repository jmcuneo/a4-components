// Header.js
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="flex flex-col items-center justify-center py-2">
        <button id="logout" className="absolute top-0 right-0 m-4 text-white bg-blue-700 hover:bg-blue-900 py-2 px-4 rounded" onClick={this.props.logoutFunc}>Logout</button>
        <h1 className="text-center font-bold text-2xl mb-4">Welcome, <span id="username"></span></h1>
      </div>
    );
  }
}

export default Header;