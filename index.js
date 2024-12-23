const express = require('express')
require('dotenv').config({ path: ".env"})
const cors = require('cors')
const { StatusCodes } = require('http-status-codes')
const connectDB = require('./dbconfig')
const PORT = process.env.PORT

// ref to express
const app = express()

// bodyparser middleware
app.use(express.urlencoded({ extended: true })) // to access urlencoded data
app.use(express.json())

// cors - headers properties
app.use(cors())

// index route and controller
app.get(`/`, async (req,res) => {
    try {
        res.status(StatusCodes.OK).json({ msg: "Welcome to CRUD API"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err})
    }
})

// api route
app.use(`/api/user`, require('./user_route'))

// default route and controller
app.all(`*`, async (req,res) => {
    try {
        res.status(StatusCodes.NOT_FOUND).json({ msg: "Requested path not found"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err})
    }
})




// server listener
app.listen(PORT,() => {
    connectDB().then(res => {
        console.log(`mongodb connected`)
    }).catch(err => console.log(err))
    console.log(`server is running @ http://localhost:${PORT}`)
})