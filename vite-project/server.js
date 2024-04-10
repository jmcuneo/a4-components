import express from "express";
import { MongoClient } from "mongodb";
import ViteExpress from "vite-express";

const app = express();

// MongoDB connection URI
const uri = "mongodb+srv://cspeavey:2huuCZ.sC!2fXYLV-Jg@gpacluster.0gt60k9.mongodb.net/?retryWrites=true&w=majority&appName=gpaCluster";

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log("Connected to MongoDB");

    // Get reference to the database
    const db = client.db("userdb");
    const collection = db.collection("users");
    console.log(collection);

    // Example route to insert a document into a collection
    app.post("/insert", async (req, res) => {
      try {
        const collection = db.collection("users");
        const result = await collection.insertOne(req.body);
        res.json(result);
      } catch (error) {
        console.error("Error inserting document:", error);
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // Other routes and middleware can be added here

    // Start the server
    ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });
