//const express = require("express");
import express from "express";
import ViteExpress from "vite-express";
//var bodyParser = require('body-parser')

const app = express();

const appdata = [];
const suggestdata = [];

app.post("/refresh", express.json(), async (req, res) => {
  let bothArrays = {
    appdata: appdata,
    suggestdata: suggestdata
  }
  console.log("server bothArrays: ", bothArrays);
  //res.send(JSON.stringify(bothArrays));
  //res.send(bothArrays)
  res.json(bothArrays);
  res.send(res.json);
});


app.post("/submit", express.json(), async (req, res) => {
  console.log(req.body);
  let data = req.body;
  console.log(data);
  for(let i = 0; i < appdata.length; i++){
    if(data.item == appdata[i].item){
      console.log("item already logged!");
      res.send(JSON.stringify("Item already logged!"));
      return;
    } 
  }
  var entry = {
    name: data.name,
    item: data.item,
    price: data.price,
    qty: data.qty, 
    cost: data.price * data.qty
  };
  appdata.push(entry);
  console.log("req: ", entry);
  
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
  // Check if indexToRemove is valid/

  if (
    isNaN(indexToRemove) ||
    indexToRemove < 0 ||
    indexToRemove >= appdata.length
  ) {
    return res.status(400).send(JSON.stringify("Invalid index"));
  }

  //check if the user has the authority to remove the item


    console.log(result);
    appdata.splice(indexToRemove, 1); // Remove the entry from the array
    res.send(appdata);
  
});

ViteExpress.listen(app, 3000);
