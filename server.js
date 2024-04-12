import express from 'express'
// import ViteExpress from 'vite-express'

const app = express()

let tasks = [
]

app.use(express.json())

app.use(express.static('dist'))

app.post('/add-task', (req, res) => {
    const isInList = tasks.findIndex(task => task.task === req.body.task)
    if (isInList !== -1) {
        tasks[isInList].dueDate = req.body.dueDate
    } else {
        tasks.push(req.body)
    }
    res.json(tasks)
})

app.get("/get-tasks", (req, res) => {
    res.json(tasks)
})

app.delete("/delete-tasks", (req, res) => {
    let inboundTasks = Array.from(req.body)
    tasks = tasks.filter((task, index) => {
        return !inboundTasks.some(inboundTask => inboundTask.task === task.task);
    })
    res.json(tasks)
})

app.get("*", (req, res) => {
    res.redirect("/")
})

app.post("*", (req, res) => {
    res.sendStatus(404)
})

app.delete("*", (req, res) => {
    res.sendStatus(404)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
