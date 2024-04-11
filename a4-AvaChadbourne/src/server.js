import express from 'express'
import ViteExpress from 'vite-express'

const app = express()

const todos = [
  { name:'buy groceries', completed:false }
]

const appdata = [
  { "val1": 2, "val2": 2, "op": "+", "output" : 4, "guess" : null},
  { "val1": 3, "val2": 5, "op": "*", "output" : 15, "guess" : null},
  { "val1": 10, "val2": 5, "op": "-", "output" : 5, "guess" : null},
  { "val1": 36, "val2": 2, "op": "/", "output" : 18, "guess" : null},
]

app.use( express.json() )

app.get( '/read', ( req, res ) => {
    console.log("Sending appdata: " + JSON.stringify(appdata))
    res.json( appdata )
})

app.post( '/add', ( req, res) => {
  let data = req.body
  // console.log(data)

  let output = eval(data.val1 + data.op + data.val2) //Get correct answer
  let guess = false
  if(data.guess == output){ //If user guessed, evaluate that guess 
    guess = true
  } else if (data.guess == ''){
    guess = null
  }

  let newData = {val1: parseInt(data.val1), val2: parseInt(data.val2), op: data.op, output, guess}
  appdata.push( newData )
  res.json( appdata )
})

app.post( '/remove', (req, res) => {
  let data = req.body.id
  let removed = appdata.splice(data, 1) //Remove from table
  res.json(appdata)
})

app.post( '/modify', function( req,res ) {
  let data = req.body
  let oldData = appdata[data.index] //Get currently stored data in server
  let comboData = combineData(data, oldData) //Combine old and new data

  //If the user didnt assign a correct value, calculate it
  if (comboData.output == null || comboData.output == '') {
    comboData.output = eval(comboData.val1 + comboData.op + comboData.val2) 
  }
  
  appdata[data.index] = comboData //Replace old server data 
})

//Combine old and new data
function combineData (mod, old) {
  //New instance to store info
  let newData = {val1: null, val2: null, op: null, output: null, guess: null}
  if (mod.output != null) {
    //If user assigned a new answer, assign here
    newData.output = mod.output
  }

  //Get the most recent values of first value, second value, and the operator
  newData.val1 = pickData(mod, old, "val1")
  newData.val2 = pickData(mod, old, "val2")
  newData.op = pickData(mod, old, "op")

  return newData
}

//Pick the most recent data from old and new
function pickData (mod, old, valType) {
  //If data exists in most recent entry (mod), use that
  if (mod[valType] != null && mod[valType] != '') {
    return mod[valType]
  } else { //Otherwise default to old data
    return old[valType]
  }
}

ViteExpress.listen( app, 3000 )