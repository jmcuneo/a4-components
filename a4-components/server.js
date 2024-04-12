import express from 'express'
import ViteExpress from 'vite-express'

// Setting up an express app to handle server requests
const app = express()

// Table of part data maintained by the server
const appdata = [
  { "Part": "Spinner", "Material": "Steel", "Quantity": 1, "Weight": 0.702084 },
  { "Part": "Back Plate", "Material": "Aluminum", "Quantity": 1, "Weight": 0.0380388 },
  { "Part": "Uprights", "Material": "UHML", "Quantity": 2, "Weight": 0.0871949} 
]

app.use(express.json())

// Serves the '/' files (i.e. index.html when navigating to '/')
app.use(express.static('/'))

// Handling requests sent to the server
app.use((req, res, next) => {
    console.log(req.url)
    next()
})

// The '/receive' request for returning appdata to the client
app.get('/receive', function(req, res) {
    console.log("Made it to receive")
    res.json(appdata)
})

/* The '/add' function for adding data (if the passed part_name is not already present in the table);
 * if the matching name exists in the table, modify the entry with the new values
 */
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

/* The '/remove' function for removing data (if the passed part_name is present in the table);
 * if the matching name does not exist, do nothing
 */
app.post('/remove', (req, res) => {
    const entry_index = appdata.findIndex(v => v.Part === req.body.part_name)
    if(entry_index != -1){appdata.splice(entry_index, 1)}
    res.json(appdata)
})

ViteExpress.listen(app, 3000, () => console.log("Server listening"))
