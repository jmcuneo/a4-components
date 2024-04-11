if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const port = 3000
const express = require("express")
const {MongoClient} = require("mongodb")
const path = require("path")
const ViteExpress = require("vite-express")

const bodyParser = require("body-parser")
const app = express();


app.use(bodyParser.urlencoded({extended:true}))
//app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, "dist"), {
  setHeaders: (res, path, stat) => {
    if (path.endsWith(".js")) {}
    res.set("Content-Type", "application/javascript")
  }
}))

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri)

let studentdb = null

async function run() {
  try{
    await client.connect()
    studentdb = client.db("studentdb").collection("students")
    console.log("MongoDB database connected successfully")

    ViteExpress.listen(app, 3000)

    // app.listen(process.env.PORT || port, () => {
    //   console.log(`Server is running on port ${process.env.PORT || port}`)
    // })

  }
  catch(error){
    console.error("Error connecting to MongoDB:", error)
  }
}

run().catch(console.error)

app.get('/', (req, res) => {
  // Send the HTML file when accessing the root URL
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/studentData", async (req, res) => {
  try {
    if (studentdb){
      const studentData = await studentdb.find({}).toArray()
      res.json(studentData)
    }
    else{
      res.status(503).json({message: "MongoDB connection not established"})
    }
  }
  catch (error){
    console.error(error)
    res.status(500).json({message: "Internal Server Error"})
  }
})

app.post("/submit", async(req, res) => {
  try{
    const {name, credits} = req.body

    let classStanding, classOf

    if (credits > 108){
      classStanding = "Senior";
      classOf = 2024;
    }
    else if (credits > 72){
      classStanding = "Junior";
      classOf = 2025;
    }
    else if (credits > 36){
      classStanding = "Sophomore";
      classOf = 2026;
    }
    else{
      classStanding = "Freshman";
      classOf = 2027;
    }

    const student = {name, credits, classStanding, classOf}

    const existingStudent = await studentdb.findOne({name: name})

    if (existingStudent) {
      await studentdb.updateOne({name: name}, {$set: {credits: credits, classStanding: classStanding, classOf: classOf}})
      console.log("Student updated")
      res.json({message: "Student updated successfully"})
    }
    else {
      const result = await studentdb.insertOne(student)
      console.log("Student added")
      res.json({message: "Student added successfully", _id: result.insertedId })
    }
  }
  catch(error) {
    console.error(error)
    res.status(500).json({message: "Internal Server Error"})
  }
})

app.post("/delete", async (req, res) => {
  try {
    const result = await studentdb.deleteOne({
      name: req.body.name
    })
    console.log("Student deleted")
    res.json(result)
  }
  catch(error){
    console.error(error)
    res.status(500).json({message: "Internal Server Error"})
  }
})


