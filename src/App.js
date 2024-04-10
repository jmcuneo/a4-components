import logo from './logo.svg';
import './main.css';

function App() {
  return render_page()
}


function render_page()
{
  return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" />
        <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
        <link href="main.css" rel="stylesheet" />
        <header className="App-header">
          <p>

            <h1>Smalltown Arcade Login</h1>

            <form id ="userlogin">
              <input type="text" id="email" placeholder="email" />
              <input  type="text" id="password" placeholder="password" />
              <button id ="loginButton" onClick={login}>Login</button>
            </form>


            <h2>Your High Scores:</h2>

            <form id ="userinput">
              <input type="text" id="score" placeholder="score" />
              <input type="text" id="playtime" placeholder="playtime" />
              <input type="text" id="date" placeholder="date (unique id)" />

              <button id = "dataButton" onClick={button_test}>Add/Update</button>
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


function button_test(event)
{
    event.preventDefault()
    console.log("Button Pressed!")
}



let tableIndex = 0;
let user = "";
let userPassword = "";

async function login(event) {

    event.preventDefault()

    console.log("test login button pressed")

    const input = document.querySelector( "#userlogin"),
        json = { username: input[0].value, password: input[1].value },
        body = JSON.stringify( json )

    console.log(json)

    user = json.username
    userPassword = json.password


    const getAccount = await fetch("/post_login",
        {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        })

    const loginAttempt = await getAccount.json()
    console.log(loginAttempt)

    if(loginAttempt === "PasswordIncorrect")
    {
        alert("Account Password is incorrect")
        clearTable()
    }
    else if(loginAttempt === "AccountCreated")
    {
        alert("Account Created! Please Add data!")
        clearTable()
    }
    else
    {
        addUserData(loginAttempt)
    }

}






// Table Helper Functions:
function clearTable()
{
    const table = document.querySelector("#InformationTable")

    console.log(table.rows.length)
    console.log(table.rows)

    if(table.rows.length !== 1)
    {
        for(let i = table.rows.length - 1; i > 0; i--)
        {
            table.rows[i].remove();
        }
    }

}

//Add all the User Data
async function addUserData(userData)
{
    clearTable()
    tableIndex = 0;
    const table = document.querySelector("#InformationTable")

    for(let i = 0; i < userData.length; i++)
    {
        tableIndex++
        let row = table.insertRow(tableIndex)

        for(let j = 0; j <= 3; j++)
        {
            let cell = row.insertCell(j)

            if(j == 0)
            {
                cell.innerHTML = userData[i].score;
            }
            else if(j == 1)
            {
                cell.innerHTML = userData[i].time;
            }
            else if(j == 2)
            {
                cell.innerHTML = userData[i].scoreOverTime;
            }
            else if(j == 3)
            {
                let dateButton = document.createElement("button")
                dateButton.textContent = userData[i].date;
                dateButton.onclick = dateButtonClick

                cell.appendChild(dateButton)

            }
        }

    }

}