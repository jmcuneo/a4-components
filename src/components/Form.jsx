// Form.js
import React from 'react';

class Form extends React.Component {
  state = {
    name: ''
  };

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submit(this.state.name);
    this.setState({ name: '' });
  };

  render() {
    return (
      <div className="flex flex-col items-center justify-center  py-2">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
          <h1 className="mb-5 text-5xl text-center text-red-500">Enter your name</h1>
          <div className="mb-4">
            <input type="text" id="yourname" value={this.state.name} onChange={this.handleChange} placeholder="John Doe" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="flex items-center justify-between">
            <button id="submit" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;