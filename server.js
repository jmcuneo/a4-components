import express from 'express'
import ViteExpress from 'vite-express'

const app = express()

const tasks = [

]

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.url)
    next()
})

// this will most likely be 'build' or 'public'
app.use(express.static('dist'))

app.post('/add-task', (req, res) => {
    const isInList = tasks.findIndex(task => task.task === req.body.task)
    console.log(JSON.stringify(req.body))
    console.log(isInList)
    if (isInList !== -1) {
        tasks[isInList].dueDate = req.body.dueDate
    } else {
        tasks.push(req.body)
    }
    res.status(200).json(tasks)
})

app.get("/get-tasks", (req, res) => {
    res.status(200).json(tasks)
})

ViteExpress.listen(app, 3000)
