require('dotenv').config();
const express = require("express"),
    cookie = require("cookie-session"),
    hbs = require( 'express-handlebars' ).engine,
    { MongoClient, ObjectId } = require("mongodb"),
    app = express()
var taskData = []; // stores task data from database
var username = ""; // stores current username
var usernames = []; // stores all other usernames
var checkedUsers = []; // stores the users that are checked off on the form


app.use(express.static("public") )
app.use(express.json() )
// use express.urlencoded to get data sent by defaut form actions
// or GET requests
app.use(express.urlencoded({extended:true}))


// we're going to use handlebars, but really all the template
// engines are equally painful. choose your own poison at:
// http://expressjs.com/en/guide/using-template-engines.html
app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './public' )


// cookie middleware! The keys are used for encryption and should be
// changed
app.use( cookie({
  name: 'session',
  keys: ['taskListKey1', 'taskListKey2']
}))

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient( uri )

let taskCollection = null

// Runs the connection with the client
async function run() {
  await client.connect()
  taskCollection = await client.db("taskDatabase").collection("taskCollection")
  // route to get all docs
  app.get("/taskData/", async (request, response) => {
    if (taskCollection !== null) {
      taskData = await taskCollection.find({}).toArray()

      // Limit only data from that user
      let len = taskData.length;
      for (let i = 0; i < len; i++) {
        const element = taskData[i];
        if(element.username !== username) {
          taskData.splice(i, 1);
          i--;
          len--;
        }
      }
      taskData.push(username);
      response.writeHead( 200, { 'Content-Type': 'application/json'});
      response.end(JSON.stringify(taskData));
    }
  })
}

// Express use
app.use( (request,response,next) => {
  if( taskCollection !== null ) {
    next()
  }else{
    response.status( 503 ).send()
  }
})


// Called when loging in
app.post( '/login', async (request,response)=> {
  // Get user collection to check users
  let userCollection = await client.db("taskDatabase").collection("usersCollection");
  if (userCollection !== null) {
    let users = await userCollection.find({}).toArray();
    let foundUser = false;
    let foundUsername = false;
    usernames = [];

    // Determine if username-password match in the database
    users.forEach(user => {
      if(user.username === request.body.username) {
        foundUsername = true;
        if (user.password === request.body.password) {
          foundUser = true;
          username = request.body.username;
        } 
      } else {
        // Add all other usernames to the usernames array
        usernames.push(user.username);
      }
    });

    // Found user
    if(foundUser) {
      request.session.login = true
      response.redirect( 'taskList.html' )

    // No username, create account
    } else if(!foundUsername) {
      request.session.login = false
      userObject = {_id: new ObjectId(), username : request.body.username, password : request.body.password}
      userCollection.insertOne(userObject);
      response.render('login', { msg:'New account created under username and password', layout:false })
    } else {
      request.session.login = false
      response.render('login', { msg:'Login failed, please try again', layout:false })
    }
  }
})


app.get( '/', (req,res) => {
  res.render( 'login', { msg:'', layout:false })
})

app.get( '/login.html', (req,res) => {
  res.render( 'login', { msg:'', layout:false })
})

// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    res.render('login', { msg:'Login failed, please try again', layout:false })
})

app.get( '/taskList.html', ( req, res) => {
    res.render( 'taskList', {layout:false })
})



// Called when posting checked users
app.post( '/checkedUsers', async (request,response) => {
  let dataString = ""
  request.on( "data", function( data ) {
      dataString += data 
  })
  request.on( "end", function() {
    // Parse data string
    checkedUsers = JSON.parse( dataString );
    response.writeHead( 200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify(taskData));
  })
})





// Called when adding a task
app.post( '/submit', async (request,response) => {
  let dataString = ""
  request.on( "data", function( data ) {
      dataString += data 
  })
  request.on( "end", function() {
    // Parse data string
    let taskObject = JSON.parse( dataString );

    // Assign task an unique ID
    taskObject._id = new ObjectId();
    // Assign user
    taskObject.username = username;

    determinePriority(taskObject);

    // Push new object to taskData array
    taskData.push(taskObject);
    // Insert object into database
    taskCollection.insertOne(taskObject);


    // Add task to each checked user
    checkedUsers.forEach(user => {
      let duplicateTask = Object.assign({}, taskObject);
      // Assign task an unique ID
      duplicateTask._id = new ObjectId();
      // Assign user
      duplicateTask.username = user;
      // Push new object to taskData array
      taskData.push(duplicateTask);
      // Insert object into database
      taskCollection.insertOne(duplicateTask);
    });
    response.writeHead( 200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify(taskData));
  })
})

// Called when deleting a task
app.delete( "/delete", async (request, response) => {
  let dataString = ""
  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    let taskObject = JSON.parse( dataString );
    // Delete object from the database
    taskCollection.deleteOne({ 
      _id:new ObjectId( taskObject._id ) 
    })
    response.writeHead( 200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify(taskData));
  })
})

// Called when editing a task
app.patch( "/patch", async (request, response) => {
  let dataString = ""
  request.on( "data", function( data ) {
      dataString += data 
  })
  request.on( "end", function() {
    let taskObject = JSON.parse( dataString );
    determinePriority(taskObject);
    // Update object in the database
    taskCollection.updateOne(
      { _id: new ObjectId( taskObject._id ) },
      { $set:{task:taskObject.task, 
              username:username,
              class:taskObject.class, 
              duedate:taskObject.duedate, 
              importance:taskObject.importance, 
              priority:taskObject.priority}}
    )
    response.writeHead( 200, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify(taskData));
    })
})


// Called when getting usernames
app.get( "/usernames", async (request, response) => {
  response.writeHead( 200, { 'Content-Type': 'application/json'});
  response.end(JSON.stringify(usernames));
})

run()






// Determines the priority based on duedate, importance, and the current date
function determinePriority(data) {
  let currentDate = new Date();
  // Make duedate a Date object
  let dueDate = new Date(data.duedate);

  // Convert both dates to UTC
  let utcDate1 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  let utcDate2 = Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

  // Calculate different in ms and then convert to days
  let diffDays = Math.floor(Math.abs(utcDate2 - utcDate1) / (1000 * 60 * 60 * 24));

  // Determine priority
  if((diffDays <= 2 && data.importance === "Yes") || (diffDays <= 1 && data.importance === "No")) {
    data.priority = 1;
  } else if((diffDays <= 3 && data.importance === "Yes") || (diffDays <= 2 && data.importance === "No")) {
    data.priority = 2;
  } else if((diffDays <= 4 && data.importance === "Yes") || (diffDays <= 3 && data.importance === "No")) {
    data.priority = 3;
  } else {
    data.priority = 4;
  }
}

const listener = app.listen( process.env.PORT || 3000 )
module.exports = app;