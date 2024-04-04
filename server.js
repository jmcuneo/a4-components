import express from  'express'
import ViteExpress from 'vite-express'



// const todos = [
//   { name:'buy groceries', completed:false }
// ]

app.use( express.json() )

app.use( (req,res, next) => {
  console.log( req.url )
  next()
})

// this will most likely be 'build' or 'public'
//app.use( express.static( 'dist' ) )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  todos.push( req.body )
  res.json( todos )
})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

ViteExpress.listen( app, 3000 )