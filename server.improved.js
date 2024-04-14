//server.improved.js
//server-side code
const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3001


let previousResults = [];   //array used to store the previous results

const server = http.createServer( function( request,response ) {

    // Set CORS headers to allow requests from any origin
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if( request.method === "GET" ) {        //links to handleGet() method
        handleGet( request, response )    
    }else if(request.method === "POST" ){      //links to handlePost() method
        handlePost( request, response ) 
    }
})

const handleGet = function( request, response ) {     //when a GET request is passed
  const filename = dir + request.url.slice( 1 )     

  if( request.url === "/" ) {      //default
    sendFile( response, "public/index.html" ) 
  }
  else if (request.url === "/getPreviousResults" || request.url === "/getPreviousResults/") {       //if the GET reqest is to get the array of previous results
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(previousResults));        //give the array back to the client
  }
  else {
    sendFile( response, filename )        //catch-all case
  }
}

const handlePost = function( request, response ) {    //when a POST request is passed
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    const clientData = JSON.parse(dataString)     //define client data
    //console.log(clientData)           //clientData console.log test

    const operation = clientData.operation,   //extracting the operation from clientData
    num1 = parseFloat(clientData.num1),       //extracting the first number from clientData
    num2 = parseFloat(clientData.num2)        //extracting the second number from clientData
    index = parseInt(clientData.index)        //extracting the index from clientdata for the delete result in array case

    if(operation === "addition"){                //addition functionality
      const result = (num1 + num2).toFixed(2)    //add the two imputted numbers together + truncates

      addPreviousResults({ result: result })     //add this result to the array of previous results
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ result: result }))        //send the result to the client
    }
  })
}

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

//function to add a given result to the previous results array
const addPreviousResults = function (result) {        //pass the result
  previousResults.push(result);                       //add result to the array
  if (previousResults.length > 50) {                  //limit array length to 50 previous entries   
      previousResults.pop();                          //if over 50, pop the oldest entry
  }
};

server.listen( process.env.PORT || port )             //declare the port
console.log(`Server running at http://localhost:${port}/`);