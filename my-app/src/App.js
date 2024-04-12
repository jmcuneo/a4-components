import React, {useEffect, useState} from 'react';
import './App.css'; // Assuming you have a CSS file for styling

const App = () => {
  // State for managing the displayed window
  const [activeWindow, setActiveWindow] = useState(1);
  let selectedItem = '';

  const handleSidebarClick = (windowId) => {
    setActiveWindow(windowId);
  };

  useEffect(() => {
    populateSidebar();
    populateTable();

    const backToLoginButton = document.getElementById("login-create-account-button");
    const createAccountButton = document.getElementById('create-account-button')
    const loginButton = document.getElementById("login-button");

    backToLoginButton.addEventListener("click", () => {
      const loginPage = document.getElementById("login-page");
      const createAccountPage = document.getElementById("create-account-page");

      loginPage.style.display = "none";
      createAccountPage.style.display = "flex";
    });

    const backButton = document.getElementById("back-button");

    backButton.addEventListener("click", () => {
      const loginPage = document.getElementById("login-page");
      const createAccountPage = document.getElementById("create-account-page");

      createAccountPage.style.display = "none";
      loginPage.style.display = "flex";
    });
  })
  // Methods
  const populateSidebar = async () => {
    console.log("starting");

    const json = {
      uuid: localStorage.getItem('sessionToken')
    }

    const response = await fetch("http://localhost:5000/get_workouts",
        {
          method: "POST",
          body: JSON.stringify(json)
        })
        .then(res => res.json())
        .then(data => {
          const sidebar = document.getElementById("workout-list");
          let id = 0;
          sidebar.innerHTML = "";
          data.forEach(workout => {
            const sidebarElement = document.createElement('div');
            sidebarElement.classList.add('sidebar-entry', 'rounded-5');
            sidebarElement.innerText = workout.workout_title;
            sidebarElement.style.backgroundColor = "black";
            sidebarElement.style.color = "white";
            sidebarElement.style.borderRadius = "10px";
            sidebarElement.id = id;
            sidebarElement.addEventListener("click", async () => {
              handleSidebarClick(3);

              const json = {
                uuid: localStorage.getItem('sessionToken')
              }
              const response = await fetch("http://localhost:5000/get_workouts",
                  {
                    method: "POST",
                    body: JSON.stringify(json)
                  })
                  .then(res => res.json())
                  .then(data => {
                    const workout = data[sidebarElement.id];
                    localStorage.setItem('selectedItem', sidebarElement.id)
                    const titleEntry = document.getElementById("title-edit");
                    const descEntry = document.getElementById("description-edit");
                    const typeEntry = document.getElementById("workoutType-edit")
                    console.log(workout.workout_type);
                    typeEntry.value = workout.workout_type;
                    titleEntry.value = workout.workout_title;
                    descEntry.value = workout.workout_description;
                  })
                  .catch(error => {
                    console.error(error);
                  })
            })
            id += 1;
            sidebar.appendChild(sidebarElement);
          })

        })
        .catch(error => {
          console.error("ERROR: " + error);
        })
  }
  const populateTable = async () => {
    const json = {
      uuid: localStorage.getItem('sessionToken')
    }
    const response = await fetch("http://localhost:5000/get_workouts",
        {
          method: "POST",
          body: JSON.stringify(json)
        })
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById("table-body");
          tableBody.innerHTML = ""
          data.forEach(workout => {
            const row = tableBody.insertRow();

            const title = row.insertCell(0);
            const desc = row.insertCell(1);
            const time = row.insertCell(2);

            title.textContent = workout.workout_title;
            desc.textContent = workout.workout_description;
            time.textContent = workout.workout_type;
          })

        })
        .catch(error => {
          console.error("ERROR: " + error);
        })
  }

  const createWorkout= async () => {
// stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    //   event.preventDefault();
    const titleInput = document.getElementById("title")
    const descInput = document.getElementById("description")
    const typeInput = document.getElementById("workoutType")
    const loginPage = document.getElementById('main-login-page');
    const workoutPage = document.getElementById('workout-page')
    const json = {
      title: titleInput.value,
      description: descInput.value,
      type: typeInput.value,
      uuid: localStorage.getItem('sessionToken'),
    }

    const response = await fetch("http://localhost:5000/create_workout",
        {
          method: "POST",
          body: JSON.stringify(json)
        })
        .then(response => {
          response.json()
        .then( function () {
            console.log("Casidnaoidnsaoidsnad")
            titleInput.value = ""
            descInput.value = ""
            populateTable();
            populateSidebar();
          })
        })

    titleInput.value = ""
    descInput.value = ""
    populateTable();
    populateSidebar();
  }

  const editWorkout = async () => {
    console.log(localStorage.getItem('selectedItem'))
    const titleInput = document.getElementById("title-edit")
    const descInput = document.getElementById("description-edit")
    const typeInput = document.getElementById("workoutType-edit")
    const json = {
      title: titleInput.value,
      description: descInput.value,
      type: typeInput.value,
      uuid: localStorage.getItem('sessionToken'),
      postId: localStorage.getItem('selectedItem')
    }

    console.log(json);
    const response = await fetch("http://localhost:5000/edit_workout",
        {
          method: "POST",
          body: JSON.stringify(json)
        }).then(response => {
      console.log(response);
    })

    populateSidebar();
    populateTable();
    handleSidebarClick(1)
  }

  const deleteWorkout = async () => {
    const json = {
      uuid: localStorage.getItem('sessionToken'),
      postId: localStorage.getItem('selectedItem')
    }

    const response = await fetch("http://localhost:5000/delete",
        {
          method: "POST",
          body: JSON.stringify(json)
        }).then(response => {
      populateSidebar();
      populateTable();
      handleSidebarClick(1)
      console.log(response);
    })
  }

  const login = async () => {
    const usernameInput = document.getElementById("username-login")
    const passwordInput = document.getElementById("password-login")
    const loginPage = document.getElementById('main-login-page');
    const workoutPage = document.getElementById('workout-page')
    const json = {
      username: usernameInput.value,
      password: passwordInput.value,
    }

    console.log(json);
    const response = await fetch("http://localhost:5000/login",
        {
          method: "POST",
          body: JSON.stringify(json)
        })
        .then(response => {
          (response.json()
              .then(function (json) {
                console.log("Session Token: " + json.uuid);
                localStorage.setItem('sessionToken', json.uuid);
                loginPage.style.display = "none";
                workoutPage.style.display = "flex";
              }));
        })
  }

  const createAccount = async () => {
    const usernameInput = document.getElementById("username-create")
    const passwordInput = document.getElementById("password-create")
    const loginPage = document.getElementById('main-login-page');
    const workoutPage = document.getElementById('workout-page')
    const json = {
      username: usernameInput.value,
      password: passwordInput.value,
    }

    console.log(json);
    const response = await fetch("http://localhost:5000/create_account",
        {
          method: "POST",
          body: JSON.stringify(json)
        })
        .then(response => {
          (response.json()
              .then(function (json) {
                console.log("Session Token: " + json.uuid)
                localStorage.setItem('sessionToken', json.uuid);
                loginPage.style.display = "none";
                workoutPage.style.display = "flex";
              }));
        })
  }

  return (
      <body>
        <div id="main-login-page" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", paddingLeft: "25vh", paddingRight: "25vh" }}>
          <div className="container mt-5 flex-row" style={{ gap: '10px', display: 'flex' }} id="login-page">
            <div className="login-container p-4 rounded" style={{backgroundColor: "black", color: "white", height: "100%", borderRadius: "10px", padding: "20px", width: "200px"}}>
              <h2>Login</h2>
              <div className="input-group mb-3">
                <label htmlFor="username-login">Username:</label>
                <input type="text" id="username-login" name="username" className="form-control" required />
              </div>
              <div className="input-group mb-3">
                <label htmlFor="password-login">Password:</label>
                <input type="password" id="password-login" name="password" className="form-control" required />
              </div>
              <div className="input-group">
                <button style={{backgroundColor: "darkgray", color: "white", height: "50px", width: "100%"}} id="login-button" onClick={login}>Login</button>
              </div>
            </div>
            <div className="login-container" style={{backgroundColor: "black", color: "white", height: "100%", borderRadius: "10px", padding: "20px", width: "200px"}}>
              <h2>Create Account</h2>
              <div className="input-group mb-3">
                To access exclusive features, personalized content, and a seamless user experience, we highly recommend creating an account on our login page. By creating an account, you'll gain access to member-only areas, receive updates tailored to your interests, and be able to manage your preferences and settings effortlessly.
              </div>
              <div className="input-group">
                <button id="login-create-account-button" style={{backgroundColor: "darkgray", color: "white", height: "50px", width: "100%"}}>Create Account</button>
              </div>
            </div>
          </div>
          <div className="container" id="create-account-page" style={{ display: 'none' }}>
            <div className="login-container" style={{backgroundColor: "black", color: "white", borderRadius: "10px", padding: "20px", height: "300px"}}>
              <h2>Create Account</h2>
              <div className="input-group">
                <label htmlFor="username-create">Username:</label>
                <input type="text" id="username-create" className="form-control" required />
              </div>
              <div className="input-group mb-3">
                <label htmlFor="password-create">Password:</label>
                <input type="password" id="password-create" className="form-control" required />
              </div>
              <div className="input-group mb-3">
                <button id="create-account-button" style={{backgroundColor: "darkgray", color: "white", height: "50px", width: "100%"}} onClick={createAccount}>Create Account</button>
              </div>
              <button id="back-button" style={{backgroundColor: "darkgray", color: "white", height: "50px", width: "100%"}}>Back to Login</button>
            </div>
          </div>
        </div>
      <div id="workout-page" style={{backgroundColor: "darkgray", display: "none", flexDirection: "row", color: "white", height: "100vh"}}>
        <div style={{ width: '15%', backgroundColor: "gray", display: "flex", flexDirection: "column", height: "100%"}}>
          <div
              className="sidebar-entry"
              style={{ display: 'flex', backgroundColor: "black", color: "white", borderRadius: "10px" }}
              onClick={() => handleSidebarClick(1)}
          >
            New Workout
          </div>
          <div style={{color: "white", backgroundColor: "black", borderRadius: "10px"}}
              className="sidebar-entry rounded-5"
              onClick={() => handleSidebarClick(2)}
          >
            View Workouts
          </div>
          <div style={{ borderBottom: '1px solid white' }}> </div>
          <div id="workout-list" style={{ display: 'flex', flexDirection: 'column' }}></div>
        </div>

        {/* Make Workout Window */}
        {activeWindow === 1 && (
            <div className={`window`} id="make-workout-window" style={{height: "100%"}}>
              <div
                  style={{ userSelect: 'none', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}
              >
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    style={{backgroundColor: "transparent", color: "white"}}
                    className="form-title-entry"
                    placeholder="Workout Name"
                    name="title"
                />
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    style={{backgroundColor: "transparent", color: "white"}}
                    className="form-description-entry"
                    placeholder="Workout Description"
                    name="description"
                ></textarea>
                <label htmlFor="workoutType">Workout Type:</label>
                <select className="workout-type-selector" id="workoutType">
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength Training</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="balance">Balance & Stability</option>
                  <option value="endurance">Endurance</option>
                </select>
                <button onClick={createWorkout} id="submit-button" className="add-button bg-secondary text-white btn">Log Workout</button>
              </div>
            </div>
        )}


        {/* View Workout Window */}
        {activeWindow === 2 && (
            <div className={`window`} id="view-workout-window" style={{height: "100%"}}>
              <h1>All Workouts</h1>
              <table className="table" style={{ border: '2px solid white', height: '300px' }}>
                <thead>
                <tr>
                  <th style={{ fontSize: '32px' }} className="text-white">Workout Title</th>
                  <th style={{ fontSize: '32px' }} className="text-white">Workout Description</th>
                  <th style={{ fontSize: '32px' }} className="text-white">Workout Type</th>
                </tr>
                </thead>
                <tbody id="table-body" className="text-white"></tbody>
              </table>
            </div>
        )}

        {/* Edit Workout Window */}
        {activeWindow === 3 && (
            <div className={`window`} id="edit-workout-window" style={{height: "100%"}}>
              <div
                  style={{ userSelect: 'none', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}
              >
                <label htmlFor="title-edit">Title</label>
                <input
                    id="title-edit"
                    style={{backgroundColor: "transparent", color: "white"}}
                    className="form-title-entry"
                    placeholder="Workout Name"
                />
                <label htmlFor="description-edit">Description</label>
                <textarea
                    id="description-edit"
                    style={{backgroundColor: "transparent", color: "white"}}
                    className="form-description-entry text-white bg-transparent"
                    placeholder="Workout Description"
                ></textarea>
                <label htmlFor="workoutType-edit">Workout Type:</label>
                <select className="workout-type-selector bg-dark text-white" id="workoutType-edit">
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength Training</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="balance">Balance & Stability</option>
                  <option value="endurance">Endurance</option>
                </select>
                <button onClick={editWorkout} id="edit-button" className="add-button bg-secondary text-white btn">Edit Workout</button>
                <button onClick={deleteWorkout} id="delete-button" className="add-button bg-secondary text-white btn">Delete Workout</button>
              </div>
            </div>
        )}
      </div>
      </body>
  );
};

export default App;
