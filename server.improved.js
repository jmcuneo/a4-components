const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ), //allows us to pass data back
      dir  = "public/",
      port = 3000

const appdata = [
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins",
    totalPages: 400,
    currentPage: 15,
    pagesLeft: 385
  }
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  } else if (request.url === "/getResponses"){
    response.writeHeader(200, { "Content-Type": "text/plain" });
    response.end(JSON.stringify(appdata));
  } else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on("data", function(data){
    dataString += data
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    if(request.url === "/submit"){
      appdata.push(JSON.parse(dataString))
    } else if(request.url === "/delete"){
      deleteItem(JSON.parse(dataString))
    }
    

    for(let i=0; i<appdata.length; i++){
      let response = appdata[i]
      //derive pagesLeft from totalPages and currentPage
      response.pagesLeft = response.totalPages - response.currentPage
    }

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end()
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

const deleteItem = function (json){
  appdata.splice(json["deletingResponse"], 1)
}

server.listen( process.env.PORT || port )
