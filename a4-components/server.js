import express from 'express'
import ViteExpress from 'vite-express'

const app = express()

const appdata = [
  { "Part": "Spinner", "Material": "Steel", "Quantity": 1, "Weight": 0.702084 },
  { "Part": "Back Plate", "Material": "Aluminum", "Quantity": 1, "Weight": 0.0380388 },
  { "Part": "Uprights", "Material": "UHML", "Quantity": 2, "Weight": 0.0871949} 
]

app.use(express.json())
app.use(express.static('/'))

app.use((req, res, next) => {
    console.log(req.url)
    next()
})

app.get('/receive', function(req, res) {
    console.log("Made it to receive")
    res.json(appdata)
})

app.post('/add', function(req, res) {
    var quantity = parseInt(req.body.quantity)
    var weight_per_unit = parseFloat(req.body.weight_per_unit)
    const entry_index = appdata.findIndex(v => v.Part === req.body.part_name)

    if(entry_index != -1){
        appdata[entry_index].Material = req.body.material
        appdata[entry_index].Quantity = quantity
        appdata[entry_index].Weight = quantity * weight_per_unit
    }else{
        appdata.push({"Part": req.body.part_name, "Material": req.body.material, "Quantity": quantity, "Weight": quantity * weight_per_unit})
    }
    res.json(appdata)
})

app.post('/remove', (req, res) => {
    const entry_index = appdata.findIndex(v => v.Part === req.body.part_name)
    if(entry_index != -1){appdata.splice(entry_index, 1)}
    res.json(appdata)
})

ViteExpress.listen(app, 3000, () => console.log("Server listening"))
