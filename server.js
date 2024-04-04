import express from  'express'
import ViteExpress from 'vite-express'

const app = express()



const todos = [
  { name:'buy groceries', completed:false }
]

const taskData = [
  {_id: 1, task: "Lab 1", class: "ECE 3849", duedate: "2024-04-05", importance: "Yes", priority: 1}
]

app.use( express.json() )

app.use( (req,res, next) => {
  console.log( req.url )
  next()
})

// this will most likely be 'build' or 'public'
//app.use( express.static( 'dist' ) )

app.get( '/read', ( req, res ) => res.json( taskData ) )

app.post( '/add', ( req,res ) => {
  let dataString = ""
  req.on( "data", function( data ) {
      dataString += data 
  })
  req.on( "end", function() {
    let taskObj = JSON.parse( dataString );

    // Update id
    if(taskData.length == 0) {
      taskObj._id = 1;
    } else {
      taskObj._id = taskData[taskData.length-1]._id + 1;
    }
    
    determinePriority(taskObj);

    taskData.push(taskObj);
    res.json( taskData );
  })
})


app.post( '/delete', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})










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

ViteExpress.listen( app, 3000 )