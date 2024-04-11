import { config } from 'dotenv';
config(); 

let activeUser = "";
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import passport from './passport.js';
import User from './user.model.js';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session Middleware
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.use(session({
  secret: 'your secure secret here',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise: client.connect()
  })
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

/*function isLoggedIn(req, res, next) {
  if (req.session.isLoggedIn) {
    next(); // User is logged in, proceed to the route
  } else {
    res.redirect('/login'); // Redirect to the login page
  }
}*/

// Protected authentication check route
app.get('/check-auth', (req, res) => {
  if(activeUser !== ""){
    res.json({
      success: true,
      message: 'User is authenticated',
      username: activeUser // Access username set by Passport
    });
  }
  else {
    res.json({
      success: false,
      message: 'User is not authenticated',
    });
  }

});

//login route
app.post('/login', async (req, res) => {
  try {
    let userCollection = await client.db("foodLogData").collection("users");

    // Check for existing username
    const existingUser = await userCollection.findOne({ username: req.body.username });
    if (existingUser) {
      const isPasswordMatch = await bcrypt.compare(req.body.password, existingUser.password);
      if(isPasswordMatch) {
        // Set session variable to indicate user is logged in
        req.session.isLoggedIn = true;
        activeUser = req.body.username;
        passport.authenticate('local')(req, res, function() {
          res.json({ success: true, message: "Login successful" });
        });

      }
      else { // Incorrect password
        res.status(401).json({ success: false, message: 'Incorrect password' });
      }
    }
    else { // Username not found
      res.status(401).json({ success: false, message: 'Username not found' });
    }

  } catch (error) {
    console.error("Login error:", error.message); // Detailed error 
    res.status(500).json({ success: false, message: "Login error" });
  }
});

// Register Route
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword
    });

    let userCollection = await client.db("foodLogData").collection("users");
    // Check for existing username
    const existingUser = await userCollection.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Username already exists" });
    }

    const result = await userCollection.insertOne(newUser);
    const userCollectionName = "foodLog_" + req.body.username;
    await client.db("foodLogData").createCollection(userCollectionName);

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ success: false, message: "Registration error:" });
  }
});

// Logout Route
app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    activeUser = "";
    res.json({ success: true, message: "Logged out" });
  });
});

// Route to get all documents
app.get('/docs', async (req, res) => {
  const collectionName = "foodLog_" + activeUser;
  const collection = client.db("foodLogData").collection(collectionName);
  try {
    const docs = await collection.find({}).toArray();
    res.json(docs);
  } catch (error) {
    console.error("Error fetching docs:", error);
    res.status(500).json({ error: "Error retrieving documents" });
  }
});

// Add Route
app.post('/add', async (req, res) => {
  const collectionName = "foodLog_" + activeUser;
  const collection = client.db("foodLogData").collection(collectionName);
  const newItem = req.body;
  const updatedItem = calculateItemProperties(newItem);

  const result = await collection.insertOne(updatedItem);
  res.json(result);
});

// Delete Route
app.delete('/delete', async (req, res) => {
  const collectionName = "foodLog_" + activeUser;
  const collection = client.db("foodLogData").collection(collectionName);
  const itemId = req.body.itemId;
  try {
    const objectId = new ObjectId(itemId);
    const deleteResult = await collection.deleteOne({ _id: objectId });

    if (deleteResult.deletedCount === 1) {
      res.status(200).send("Document deleted");
    } else {
      res.status(404).send("Document not found");
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send("Error deleting document");
  }
});

// Update Route
app.post('/edit-item', async (req, res) => {
  const collectionName = "foodLog_" + activeUser;
  const collection = client.db("foodLogData").collection(collectionName);
  const itemId = req.body.itemId;
  const updatedData = req.body;
  delete updatedData.itemId;

  const finalData = calculateItemProperties(updatedData);

  try {
    const updateResult = await collection.updateOne({ _id: new ObjectId(itemId) }, { $set: finalData });

    if (updateResult.modifiedCount === 1) {
      res.status(200).send("Document updated");
    } else {
      res.status(404).send("Document not found");
    }
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).send("Error updating document");
  }
});

function calculateItemProperties(item) {
  item.total = (parseFloat(item.wages, 10) + parseFloat(item.tips, 10)).toFixed(2);
  item.gasUsed = (parseFloat(item.miles, 10) / parseFloat(item.mpg, 10)).toFixed(2);
  item.gasCost = (parseFloat(item.gasUsed, 10) * parseFloat(item.gasPrice, 10)).toFixed(2);
  item.income = (parseFloat(item.total, 10) - parseFloat(item.gasCost, 10)).toFixed(2);
  item.hourlyPay = (parseFloat(item.income, 10) / (parseFloat(item.time, 10) / 60)).toFixed(2);
  return item;
}

async function run() {
  try {
    await client.connect();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening to port ${port}`));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(503).send("Error connecting to database");
  }
}

run();
