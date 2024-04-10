import logo from './logo.svg';
import './main.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>

          <h1>Smalltown Arcade Login</h1>

          <form id ="userlogin">
            <input type="text" id="email" placeholder="email" />
            <input  type="text" id="password" placeholder="password" />
            <button id ="loginButton">Login</button>
          </form>


          <h2>Your High Scores:</h2>

          <form id ="userinput">
            <input type="text" id="score" placeholder="score" />
            <input type="text" id="playtime" placeholder="playtime" />
            <input type="text" id="date" placeholder="date (unique id)" />

            <button id = "dataButton" >Add/Update</button>
            <button id = "deleteButton" >Delete</button>
          </form>



          <table id ="InformationTable">
            <tr>
              <th>Score</th>
              <th>Playtime</th>
              <th>Score / Time</th>
              <th id ="idBlock">Date</th>

            </tr>

          </table>


        </p>

      </header>
    </div>
  );
}

export default App;
