import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const todos = [
  { name:'buy groceries', completed:false }
]
const appdata = [
  {"user": "testuser", "password": "test", "ready": true, "age": 20},
  {"user": "testuser2", "password": "test2", "ready": true, "age": 20},
]

app.use( express.json() )

app.use( (req,res, next) => {
  console.log( req.url )
  next()
})

// this will most likely be 'build' or 'public'
//app.use( express.static( 'dist' ) )

app.get( '/read', ( req, res ) => res.json( appdata ) )

app.post( '/add', ( req,res ) => {
  appdata.push( req.body )
  res.json( appdata )
})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})


app.post('/remove', async (req,res) => {
  console.log(req.body)
  let removed_data = appdata.splice(req.body["idx"], 1)
  res.json( appdata )
  console.log(`Removed ${removed_data}`)


})




ViteExpress.listen( app, 3000 )
