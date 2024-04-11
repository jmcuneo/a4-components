
const express = require('express');

//vite express

const
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you"re testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    app = express(),
    port = 3000

app.use(express.static('build'))

const appdata = [
  {"Id": 1, "model": "Toyota", "year": 1999, "mpg": 23, "fuelLoad": 12, "tillEmpty": 23*12},
  {"Id": 2, "model": "Honda", "year": 2004, "mpg": 30,"fuelLoad": 15, "tillEmpty": 30*15 },
  {"Id": 3, "model": "Ford", "year": 1987, "mpg": 14,"fuelLoad": 10,"tillEmpty": 14*10  } // 0 is placeholder
]

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/data', (request, response) => {
  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    // ... do something with the data here!!!
    console.log("made it here")

    //console.log(typeof Object.values(JSON.parse( dataString ))[0] === 'string')
    console.log(appdata)
    var jsonArray = JSON.stringify(appdata)
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(jsonArray)
  })
})

app.post('/submit', (request, response) => {
  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    console.log("made it here")
    console.log(Object. values(JSON.parse( dataString ))[0]);

    if(isNaN(parseInt(Object.values(JSON.parse( dataString ))[2])) ||
        isNaN(parseInt(Object.values(JSON.parse( dataString ))[3])) ||
        isNaN(parseInt(Object.values(JSON.parse( dataString ))[4]))
    ){
      console.log("it broke")
    } else{
      appdata.push({
        "Id": Object. values(JSON.parse( dataString ))[0],
        "model": Object. values(JSON.parse( dataString ))[1],
        "year": parseInt(Object.values(JSON.parse( dataString ))[2]),
        "mpg": parseInt(Object.values(JSON.parse( dataString ))[3]),
        "fuelLoad": parseInt(Object.values(JSON.parse( dataString ))[4]),
        "tillEmpty": parseInt(Object.values(JSON.parse( dataString ))[3]) *
            parseInt(Object.values(JSON.parse( dataString ))[4])})
    }

    //console.log(typeof Object.values(JSON.parse( dataString ))[0] === 'string')
    console.log(appdata)
    var jsonArray = JSON.stringify(appdata)
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(jsonArray)
  })
})

app.delete('/delete', (request, response) => {
  let dataString = ""

  request.on( "data", function( data ) {
    dataString += data
  })

  request.on( "end", function() {
    console.log( JSON.parse( dataString ) )

    console.log("made it here to delete")

    console.log(typeof Object.values(JSON.parse( dataString ))[0] === 'string')
    if(isNaN(parseInt(Object.values(JSON.parse( dataString ))[0])) ||
        parseInt(Object.values(JSON.parse( dataString ))[0]) <= 0 ||
        parseInt(Object.values(JSON.parse( dataString ))[0]) > appdata.length+1) {
    } else {
      for(let i = 0; i < appdata.length; i++) {
        if(parseInt(Object.values(JSON.parse( dataString ))[0]) === appdata[i].Id){
          appdata.splice(i, 1)
        }
      }
    }

    console.log("app length: " + appdata.length)
    for(let i = 0; i<appdata.length; i++){
      appdata[i].Id = i + 1;
    }

    console.log(appdata)
    var jsonArray = JSON.stringify(appdata)
    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(jsonArray)
  })
})

app.put('/modify', (request, response) => {
  let dataString = ""

  request.on("data", function (data) {
    dataString += data
  })

  let indexToChange = 0;
  let indexFound = false;

  request.on("end", function () {
    if(isNaN(parseInt(Object.values(JSON.parse( dataString ))[0])) ||
        parseInt(Object.values(JSON.parse( dataString ))[0]) <= 0 ||
        parseInt(Object.values(JSON.parse( dataString ))[0]) > appdata.length
    ){

    } else{
      for(let i = 0; i <appdata.length; i++){
        if(parseInt(Object.values(JSON.parse( dataString ))[0]) === appdata[i].Id){
          indexFound = true;
          indexToChange = i;
        }

        if(indexFound && Object.values(JSON.parse( dataString ))[1] !== ""){
          appdata[indexToChange].model = Object.values(JSON.parse( dataString ))[1];
        }

        if(indexFound && parseInt(Object.values(JSON.parse( dataString ))[2]) > 0){
          appdata[indexToChange].year = parseInt(Object.values(JSON.parse( dataString ))[2]);
        }

        if(indexFound && parseInt(Object.values(JSON.parse( dataString ))[3]) > 0){
          appdata[indexToChange].mpg = parseInt(Object.values(JSON.parse( dataString ))[3]);
          appdata[indexToChange].tillEmpty = appdata[indexToChange].mpg * appdata[indexToChange].fuelLoad;
        }

        if(indexFound && parseInt(Object.values(JSON.parse( dataString ))[4]) > 0){
          appdata[indexToChange].fuelLoad = parseInt(Object.values(JSON.parse( dataString ))[4]);
          appdata[indexToChange].tillEmpty = appdata[indexToChange].mpg * appdata[indexToChange].fuelLoad;
        }

      }
    }

    var jsonArray = JSON.stringify(appdata)
    response.writeHead(200, "OK", {"Content-Type": "text/plain"})
    response.end(jsonArray)
  })
})


app.listen( process.env.PORT || port , () => {
    console.log(`App listening at http://localhost:${port}`)
})