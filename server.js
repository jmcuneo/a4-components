import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3009;

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

const tasks = [{ yourname: "To-Do:" }];

app.post("/submit", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(tasks);
});

app.delete("/delete", (req, res) => {
  const index = req.body.index;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.json(tasks);
});

app.put("/edit", (req, res) => {
  const { index, newText } = req.body;
  if (index >= 0 && index < tasks.length) {
    tasks[index].yourname = newText;
  }
  res.json(tasks);
});

app.get("/get-tasks", (req, res) => {
  res.json(tasks);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
