import express from  'express'
import ViteExpress from 'vite-express'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()

app.use(express.static('public'))
app.use(express.static('views'))
app.use(express.json())

import 'dotenv/config'

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri)

let collection
let userCollection

(async function () {
  await client.connect()
  const database = client.db('A4')
  collection = database.collection('dataA4')
})();

import session from 'express-session';

app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: false,
  saveUninitialized: false
}));

let totalCredits = 0
let totalGradePoints = 0
let id = 0
let gpa = 0

const handlePost = function (request, response) {
  let dataString = "";

  request.on("data", function (data) {
    dataString += data;
  });

  request.on("end", async function () {
    let parsedJSON = JSON.parse(dataString);

    const grade = parsedJSON.grade;
    const numCredits = parseFloat(parsedJSON.credits);
    const className = parsedJSON.class;

    console.log("running handlePost")

    const searchForID = await findDocumentById(collection, id);
    if (searchForID) {
      id = id + 10
    }

    let individualGradePoints = 0;

    switch (grade) {
      case 'A':
        individualGradePoints = 4;
        break;
      case 'B':
        individualGradePoints = 3;
        break;
      case 'C':
        individualGradePoints = 2;
        break;
      case 'D':
        individualGradePoints = 1;
        break;
      default:
        individualGradePoints = 0;
        break;
    }

    totalGradePoints = individualGradePoints * numCredits;
    totalCredits = numCredits;

    const existingData = await collection.find({}).toArray();

    existingData.forEach((doc) => {
      const existingGrade = doc.grade;
      const existingNumCredits = doc.credits;

      let existingIndividualGradePoints = 0;
      switch (existingGrade) {
        case 'A':
          existingIndividualGradePoints = 4;
          break;
        case 'B':
          existingIndividualGradePoints = 3;
          break;
        case 'C':
          existingIndividualGradePoints = 2;
          break;
        case 'D':
          existingIndividualGradePoints = 1;
          break;
        default:
          existingIndividualGradePoints = 0;
          break;
      }

      totalGradePoints += (existingIndividualGradePoints * existingNumCredits);
      totalCredits += existingNumCredits;
    });

    gpa = (totalGradePoints / totalCredits).toFixed(2);

    const insertToDB = await collection.insertOne({
      "id": id,
      "class": className,
      "grade": grade,
      "credits": numCredits,
      "currentGPA": gpa
    });

    console.log(insertToDB);
    console.log(gpa)

    id++;

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(gpa.toString());
  });
};


async function findDocumentById(collection, id) {
  if(collection !== null){
    const doc = await collection.findOne({ "id": id });
    return doc;
  }
}

const handleDelete = function (request, response) {
  let dataString = ""

  request.on("data", function (data) {
    dataString += data
  })

  request.on("end", async function () {

    let parsedJSON = JSON.parse(dataString)
    const toBeDeletedID = parseFloat(parsedJSON.id)

    let individualGradePoints = 0

    const deletedDoc = await collection.findOne({ "id": toBeDeletedID })
    if (deletedDoc) {
      switch (deletedDoc.grade) {
        case 'A':
          individualGradePoints = 4
          break;
        case 'B':
          individualGradePoints = 3
          break;
        case 'C':
          individualGradePoints = 2
          break;
        case 'D':
          individualGradePoints = 1
          break;
        default:
          individualGradePoints = 0
          break;
      }
      totalGradePoints -= individualGradePoints * deletedDoc.credits
      totalCredits -= deletedDoc.credits

      gpa = (totalGradePoints / totalCredits).toFixed(2)
    }

    const deleteFromDB = await collection.deleteOne({ "id": toBeDeletedID})

    const count = await collection.countDocuments()
    if (count === 0) {
      response.writeHead(204, "NO CONTENT", { "Content-Type": "text/plain" })
    } else {
      response.writeHead(200, "OK", { "Content-Type": "text/plain" })
    }
    response.end(gpa.toString())
  })
}

const handlePut = function (request, response) {
  let dataString = ""

  request.on("data", function (data) {
    dataString += data
  })

  request.on("end", async function () {
    //console.log( JSON.parse( dataString ) )

    let parsedJSON = JSON.parse(dataString)
    const idToBeModified = parseFloat(parsedJSON.id)
    const gradeModified = parsedJSON.grade
    const numCreditsModified = parseFloat(parsedJSON.credits)
    const classNameModified = parsedJSON.class

    const docToBeModified = await collection.findOne({ "id": idToBeModified }); 

    const individualGradePointsOriginal = gradePointCalc(docToBeModified.grade);
    const individualGradePointsModified = gradePointCalc(gradeModified);

    totalGradePoints -= individualGradePointsOriginal * docToBeModified.credits;
    totalGradePoints += individualGradePointsModified * numCreditsModified;

    totalCredits -= docToBeModified.credits;
    totalCredits += numCreditsModified;

    gpa = (totalGradePoints / totalCredits).toFixed(2);

    const updateDB = await collection.updateOne(
      { "id": idToBeModified }, 
      {
        $set: {
          "class": classNameModified,
          "grade": gradeModified,
          "credits": numCreditsModified,
          "currentGPA": gpa
        }
      }
    );

    console.log(updateDB);

    response.writeHead(200, "OK", { "Content-Type": "text/plain" });
    response.end(gpa.toString());
  });
};

function gradePointCalc(grade) {
  switch (grade) {
    case 'A':
      return 4;
    case 'B':
      return 3;
    case 'C':
      return 2;
    case 'D':
      return 1;
    default:
      return 0;
  }
}



app.post('/calculate', (req, res) => {
  handlePost(req, res)
})

app.delete('/calculate', (req, res) => {
  handleDelete(req, res)
})

app.put('/calculate', (req, res) => {
  handlePut(req, res)
})

app.get('/appdata', async (req, res) => {
  if (collection !== null) {
    const docs = await collection.find().toArray()
    res.json(docs)
  }
})

app.get('/gpa', async (req, res) => {
  if (collection !== null) {

    const docs = await collection.find({}).toArray()

    let totalCredits = 0
    let totalGradePoints = 0

    docs.forEach((doc) => {
      const grade = doc.grade
      const numCredits = doc.credits

      let individualGradePoints = 0
      switch (grade) {
        case 'A':
          individualGradePoints = 4
          break;
        case 'B':
          individualGradePoints = 3
          break;
        case 'C':
          individualGradePoints = 2
          break;
        case 'D':
          individualGradePoints = 1
          break;
        default:
          individualGradePoints = 0
          break;
      }

      totalGradePoints += (individualGradePoints * numCredits);
      totalCredits += numCredits
    });

    gpa = (totalGradePoints / totalCredits).toFixed(2);

    const count = await collection.countDocuments({});
    if (count === 0) {
      gpa = 0
    }

    res.json({gpa});
  }
})

ViteExpress.listen( app, 3000 )
