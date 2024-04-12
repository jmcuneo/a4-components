const mongoose = require('mongoose')
const dotenv = require('dotenv') //for .env file

const path = require("path")
const path4 = path.join(__dirname, "config", ".env")
dotenv.config({ path: path4 })
const url = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/billingsystemreact`

//establishing mongodb connection
const connectDb = async ()=> {
    try {
        const conn = await mongoose.connect(url, {

        })
        console.log('MongoDB connected')
    }catch (err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDb