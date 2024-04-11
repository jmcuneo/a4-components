import express from "express";
import {MongoClient} from "mongodb";
import ViteExpress from "vite-express";
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}`

// Connect to MongoDB
MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    console.log("Connected to MongoDB");

    let collection = null;
    let data = null;
    var gpa = 0.0;

    // POST AND GET REQUESTS
    // Login post request
    app.post("/login", async(req, res) => {
      const loginSuccessful = await checkLogin(req.body.username, req.body.password);

      await client.db("gpadb").createCollection(req.body.username);
      collection = client.db("gpadb").collection(req.body.username);
    
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(loginSuccessful);
    });

    // Fetch data for the GPA table
    app.get('/display', async (req, res) => {
      res.writeHead(200, {'Content-Type': 'application/text'});
      data = await getData();
      res.end(JSON.stringify(data));
    });

    // Fetch GPA value
    app.get('/gpa', (req, res) => {
      res.writeHead(200, {'Content-Type': 'application/text'});
      let roundedGpa = Math.round(gpa * 100) / 100;
      res.end(roundedGpa.toString());
    });

    // Add new element to the table
    app.post('/submit', express.json(), async (req, res) => {
      await addToData(req.body);

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(req.body));
    });

    // Adjust an element in the table
    app.post('/adjust', express.json(), async (req, res) => {
      await updateDataEntry(req.body.class, req.body.data);

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(req.body));
    });

    // Delete an element from the table
    app.post('/delete', express.text(), async (req, res) => {
      await deleteDataEntry(req.body);

      res.writeHead(200, {'Content-Type': 'application/text'});
      res.end(JSON.stringify(req.body));
    });

    // DATABASE FUNCITONS
    // Log into account (true = succeeded, false = failed)
    async function checkLogin(usernameAttempt, passwordAttempt)
    {
      collection = client.db("userdb").collection("users");

      if (collection !== null) {
        let userData = await collection.findOne({username: usernameAttempt});
        if (userData !== null) {
          // User exists
          if (userData.password === passwordAttempt) {
            // Password correct
            console.log("Logging in")
            return "true";
          }
          else {
            // Password incorrect
            console.log("Incorrect password");
            return "false";
          }
        }
        else {
          // User does not exist; create new user
          console.log("Creating new user");
          await collection.insertOne({username: usernameAttempt, password: passwordAttempt});
          return "true";
        }
      }
    }

    // Obtain all data in the current collection
    async function getData()
    {
      // route to get all docs
      if (collection !== null) {
        data = await collection.find({}).toArray();
      }
      gpa = calculateGpa(data);
      return data;
    }

    // Determine what the user's GPA is based on the provided info
    const calculateGpa = function(jsonData)
    {
      let totalPoints = 0;
      let totalCredits = 0;
      jsonData.forEach(entry => {
        let currentPoints = 0;
        let grade = entry.grade.toLowerCase();

        if (grade === "a") {
          currentPoints = 4;
        } else if (grade === "b") {
          currentPoints = 3;
        } else if (grade === "c") {
          currentPoints = 2;
        } else if (grade === "d") {
          currentPoints = 1;
        }

        let amountCredits = Number(entry.credits);
        currentPoints *= amountCredits;
        totalPoints += currentPoints;
        totalCredits += amountCredits;
      });
      return totalPoints / totalCredits;
    }

    // Add entry to the database
    async function addToData(entry)
    {
      const result = await collection.insertOne(entry);
    }

    // Remove entry from the database
    async function deleteDataEntry(className)
    {
      const result = await collection.deleteOne(
        {class: className});
    }

    // Update entry in the database
    async function updateDataEntry(className, newData)
    {
      if (newData.class === "" || newData.grade === "" || newData.credits === "")
        return;
      
      const result = await collection.updateOne(
        {class: className},
        {$set: {class: newData.class, grade: newData.grade, credits: newData.credits}}
      );
    }

    // Start the server
    ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });
