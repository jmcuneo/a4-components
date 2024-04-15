import React from "react";
import './App.css'

class Entries extends React.Component {
  render() {
    return (
      <li>
        {`${this.props.name} ${this.props.bodyWeight} ${this.props.squat} ${this.props.benchPress} ${this.props.deadLift} ${this.props.total}`}
      </li>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entries: [] };
    this.load();
  }

  render() {
    return (
      <>
        <header>Powerlifting Database</header>
        <div className="column">
          <form
            id="powerliftingEntry"
            action="/powerlifting-database"
            method="post"
          >
            <ul>
              <li>
                <label htmlFor="bodyWeight">Body Weight:</label>
                <input type="number" id="bodyWeight" min="1" required />
              </li>
              <li>
                <label htmlFor="squat">Squat Attempt:</label>
                <input type="number" id="squat" min="1" required />
              </li>
              <li>
                <label htmlFor="benchPress">Bench Press Attempt:</label>
                <input type="number" id="benchPress" min="1" required />
              </li>
              <li>
                <label htmlFor="deadLift">Dead Lift Attempt:</label>
                <input type="number" id="deadLift" min="1" required />
              </li>
            </ul>
          </form>
          <button className="submitButton">Submit</button>
        </div>
        <div className="column">
          <form id="deletionForm" action="/delete" method="post">
            <ul>
              <li>
                <label htmlFor="id">Name to Delete:</label>
                <input id="id" />
              </li>
            </ul>
          </form>
          <button className="deleteButton">Delete</button>
        </div>
        <div>
          <ul>
            {this.state.entries.map((entry) => (
              <Entries
                key={entry.name}
                name={entry.name}
                bodyWeight={entry.bodyWeight}
                squat={entry.squat}
                benchPress={entry.benchPress}
                deadLift={entry.deadLift}
                total={entry.total}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }

  load() {
    fetch("/entries", {
      method: "GET"
    }).then((aResponse) => {
      return aResponse.json();
    }).then((json) => {
      this.setState({ entries: json });
    });
  }
}

export default App;
