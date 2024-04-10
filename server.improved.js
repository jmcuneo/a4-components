
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json

const appdata = [
  { "name": "think about toyota", "description": "not to be confused with toy yoda", "creationDate": "2024-03-13", "priority": 1, "recommendedDeadline": "2024-03-14"},
  { "name": "discuss honda", "description": "honk honk", "creationDate": "2024-03-13", "priority": 2, "recommendedDeadline": "2024-03-15"},
  { "name": "get a chicken", "description": "i need a chicken so bad", "creationDate": "2024-03-13", "priority": 3, "recommendedDeadline": "2024-03-16"} 
]

app.get('/data', async (req, res) => {
  res.json(appdata);
});

app.post('/submit', (req, res) => {
  let data = req.body;  
  console.log(data);
  // Derive the recommended deadline from the priority and creation date
  let date = new Date(data.creationDate);
  let recDeadline = new Date(date);
  recDeadline.setDate(date.getDate() + +data.priority);
  data.recommendedDeadline = recDeadline.toISOString().slice(0, 10);


  // Check if the data already exists in the toDoList. If it is, return an error'
  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].name === data.name) {
      res.status(400).send("Name already exists");
      return;
    }
  }
  appdata.push(data);
  res.send("Data added to user's toDoList")
});

app.post('/delete', (req, res) => {
  let data = req.body;

  for (let i = 0; i < appdata.length; i++) {
    if (appdata[i].name === data.name) {
      appdata.splice(i, 1);
      res.send("Data deleted successfully");
      return;
    }
  }
  res.status(400).send("Name not found");

});

app.post('/edit', (req, res) => {
  let data = req.body;

for (let i = 0; i < appdata.length; i++) {
  if (appdata[i].name === data.name) {
    
    let date = new Date(data.creationDate);
    let recDeadline = new Date(date);
    recDeadline.setDate(date.getDate() + +data.priority);
    data.recommendedDeadline = recDeadline.toISOString().slice(0, 10);
    appdata[i] = data;
        
    res.send("Data edited successfully");
    return;
  }
}
res.status(400).send("Edit failed: Name not found");

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

