import express from  'express'
import ViteExpress from 'vite-express'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";
dotenv.config();

const app = express();

const appdata = [
  {
    taskName: "Find my lost goldfish ;(",
    priority: 100,
    creation_date: "2014-09-15",
  },
  {
    taskName: "Finish Assignment 4",
    priority: 5,
    creation_date: "2024-04-08",
  },
  {
    taskName: "Learn Svelte",
    priority: 4,
    creation_date: "2024-04-09",
  },
  {
    taskName: "Read Final Project",
    priority: 3,
    creation_date: "2024-04-10",
  },
]

// Calculate derived field, days_not_done, for default tasks
appdata.forEach( task => {
  task.days_not_done = Math.floor((new Date() - new Date(task.creation_date)) / (1000 * 60 * 60 * 24))
})

app.use(express.json());

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});


app.get("/tasks", async (req, res) => {
  // console.log('get', appdata)
  res.send(JSON.stringify( appdata ))
});

app.post("/tasks", async function (req, res) {
  const task = req.body;
  task.priority = Number(task.priority);
  task.days_not_done = Math.floor(
    (new Date() - new Date(task.creation_date)) / (1000 * 60 * 60 * 24),
  );

  let i = 0;
  while (i < appdata.length && appdata[i].priority > task.priority) {
    i++;
  }
  appdata.splice(i, 0, task);

  // console.log( 'post', appdata )

  // response.writeHead( 200, "OK", {"Content-Type": "application/json"})
  res.json( appdata )
});

app.put("/tasks", async function (req, res) {
  const json = req.body;
  const task = {
    taskName: json.taskName,
    // turn priority into a number
    priority: Number(json.priority),
    creation_date: json.creation_date,
    days_not_done: Math.floor(
      (new Date() - new Date(json.creation_date)) / (1000 * 60 * 60 * 24),
    ),
  };

  appdata.splice(json.index, 1)
  // console.log( appdata )

  let i = 0;
  while (i < appdata.length && appdata[i].priority > task.priority) {
    i++;
  }
  appdata.splice(i, 0, task);

  // console.log( "APSLICE", appdata )

  // response.writeHead( 200, "OK", {"Content-Type": "application/json"})
  res.json(appdata);
});

app.delete("/tasks", async function (req, res) {
  appdata.splice( req.body.index, 1 )
  // console.log( 'delete', appdata )

  // response.writeHead( 200, "OK", {"Content-Type": "application/json"})
  res.json(appdata);
});

app.use(express.static("dist"));

ViteExpress.listen( app, process.env.PORT || 3000 )
