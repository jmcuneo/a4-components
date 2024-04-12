const express = require('express'),
      http = require( "http" ),
      fs   = require( "fs" ),
      path = require('path'),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

  const app = express();

const appdata = [
  { "model": "toyota", "year": 1999, "mpg": 23 },
  { "model": "honda", "year": 2004, "mpg": 30 },
  { "model": "ford", "year": 1987, "mpg": 14}
]

let namesArray = []

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get ('/data', (request, response ) => {
  const filename = dir + request.url.slice( 1 )

  if (request.url === "/data"){
    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.end(JSON.stringify(namesArray))
  }
  else{
    sendFile( response, filename )
  }
});

app.post ("/submit",( request, response ) => {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data
  })

  request.on( "end", function() {
    // ... do something with the data here!!!

    const formData = JSON.parse(dataString);

    const id = formData.id;
    const firstName = formData.firstName;
    const middleName = formData.middleName;
    const lastName = formData.lastName;
    const initial = (firstName.charAt(0) + middleName.charAt(0) + lastName.charAt(0)).toUpperCase();


    const nameJson =  {
      id: id,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      initial: initial
    }

    namesArray.push(nameJson)

      console.log(namesArray)

      response.writeHead(200, "OK", {"Content-Type": "application/json"})
      response.end(JSON.stringify(nameJson))
    })
  });

  app.delete ("/delete",( request, response ) => {
  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    const parsedDataString = JSON.parse(dataString);
    // const idToDelete = parsedDataString.id;
    const idToDelete = parseInt(parsedDataString.id);

    for (let i = 0; i < namesArray.length; i++){
      if (idToDelete === namesArray[i].id){
        namesArray.splice(i, 1)
      }
    }

    console.log(namesArray)

    response.writeHead(200, "OK", {"Content-Type": "application/json"})
    response.end(JSON.stringify({status: 'success', message: 'Delete'}))
  })
});

const sendFile = function( response, filename ) {
   const type = mime.getType( filename )

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

// server.listen( process.env.PORT || port )
app.listen( process.env.PORT || port, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || port}`);
  });