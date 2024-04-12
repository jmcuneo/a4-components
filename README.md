Assignment 4 - Components
===

## Billing System

Hosting link - https://a4-saitejasunku.onrender.com


This billing system web application is taken from assignment #3 and was modified to use React frontend. React was used to provide reactive experience for the user.
The frontend code of handlebars(template engine) and JavaScript code was changed to use React on frontend. React handles some of the routing and adds asynchronous aspect to the web application by handling the communication between frontend and backend.
- All the handlebars code like HTML form, table, list, and other tags were converted to React JSX syntax.    
- **Note**: Click the update button twice for the popup form to open

**Did the new technology improve or hinder the development experience?**:
The new technology - React improved the development experience as it adds reactive component to the software. 
- React involves:
  - Sending the data to backend through POST API call to add when the form submitted to the database and send back the new data for the respective data to display.
  - Receiving data from backend for the specific authenticated user by making GET API call to display in a table on frontend.
  - Updating the specific row data by populating in a popup HTML form and making a PUT API call when update button hit to send specific updated code to the server. Re-displayed the updated data.
  - Deleting specific row data by making DELETE API call to delete in the backend and display the updated data received from the server on frontend. 
- By using React, different components were made to use for creating the user-interface.
- React was also used to handle some routing.  

### General Details:
The web application is a billing system that can add, view, update, and delete purchase data. Tha data is stored in the database(MongoDB), which ensures persistency.
The web application consists of multiple pages for different purposes:
1. The login page contains button to login using GitHub. The login page is simple with only login area containing a icon and button. The user is redirected to GitHub login page when button clicked and then redirected to the dashboard on success.
2. The dashboard page contains buttons to redirect to different pages like billingsystem, instructions, user-information, and logout. This page also displays the logged-in user's GitHub username indicating that the application will display only information specific to the user.
3. The billing system page contains the form to add purchase data and saved into the database when the submit button hit. The table below the form displays recorded purchase data and also includes final price, discount, after discount price. THE DATA DISPLAYED IN THE TABLE IS SPECIFIC TO THE LOGGED-IN USER. The table also consists of total price of all the purchases. The last column in the table has delete and update buttons
   The delete button deletes the purchase record of the corresponding row from the database and displays the updated data. The update button opens a popup form with the corresponding row date populated for the user update information and when submitted the respective data is updated in the database and updated data is displayed.
   The table is not displayed if there is not data for the logged-in user and instead a not is displayed. The adding, deleting, and updating of data is specific to the logged-in user only, which is manged by using their GitHub ID.
4. The instructions page explains the user on how to use the application, especially adding, viewing, deleting, and updating operations.
5. The user-information page displays only the logged-in user's information such as username, ID, GitHub url, and user created date.
This web application was designed using Express framework to handle rendering of frontend, routing, connecting to MongoDB database to add/fetch/delete/update data, and all other logical operations.
The web application uses GitHub OAuth for logging the user. The GitHub strategy from passportJS was used to implement OAuth. 

### Technologies used in this web application:
- NodeJS end Express for server handling
- MongoDB for persistence databasing
- Vite React and CSS for frontend user-interface
  - Bootstrap CSS framework was used
  - React JSX syntax used
