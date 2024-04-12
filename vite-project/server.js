//const express = require("express");
import express from "express";
import ViteExpress from "vite-express";
//var bodyParser = require('body-parser')

const app = express();

const appdata = [];
const suggestdata = [];

app.post("/refresh", express.json(), async (req, res) => {
  console.log("appdata", appdata);
  res.send(JSON.stringify(appdata));
});


app.post("/submit", express.json(), async (req, res) => {
  console.log(req.body);
  let data = req.body;
  console.log("submit req.body: ", data);

  appdata.push(data);
  
  let bothArrays = {
    appdata: appdata,
    suggestdata: suggestdata
  };
  req.json = JSON.stringify(bothArrays);
  res.send(req.json);
});

app.post("/remove", express.json(), async (req, res) => {
  //get data to remove
  
  const indexToRemove = req.body.entryIndex;
  console.log("remove index: ", indexToRemove);

  // Check if indexToRemove is valid/

  if (
    isNaN(indexToRemove) ||
    indexToRemove < 0 ||
    indexToRemove >= appdata.length
  ) {
    return res.status(400).send(JSON.stringify("Invalid index"));
  }
    
    appdata.splice(indexToRemove, 1); // Remove the entry from the array
    res.send(appdata);
  
});

ViteExpress.listen(app, 3000);
