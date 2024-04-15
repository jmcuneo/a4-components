const express = require("express");
const ViteExpress = require("vite-express");

const app = express()

const todos = [
  { name:'buy groceries', completed:false }
]

app.use( express.json() )
const appdata = [
  {
    name: "Bryon Tom",
    bodyWeight: 132,
    squat: 297,
    benchPress: 171,
    deadLift: 357,
    total: 825
  }
];


app.get( '/entries', ( req, res ) => {
  res.json(JSON.stringify(appdata));
})

app.post("/submit", (req, res) => {
    let dataString = "";

    req.on("data", function (data) {
      dataString += data;
    });

    req.on("end", async function () {
      const json = JSON.parse(dataString);
      json.total =
        Number(json.squat) + Number(json.benchPress) + Number(json.deadLift);

      appdata.push(json);
      res.json(appdata);
    });
  });

app.post("/delete", async (req, res) => {
    let dataString = "";

    req.on("data", function (data) {
      dataString += data;
    });

    req.on("end", async function () {
      const json = JSON.parse(dataString);

      for (let i = 0; i < appdata.length; i++) {
        if(appdata[i].name === json.name) {
          appdata.pop(i);
        }
      }
      res.json(appdata);
    });
  });

ViteExpress.listen( app, 3000 )