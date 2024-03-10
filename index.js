///loads .env file into process.env
require('dotenv').config()

//import express
const express = require('express')
//import cors
const cors = require('cors')
//import router
const router = require('./Router/route')

const jwtMiddleware = require('./Middlewares/jwtMiddleware')

const db = require('./DB/connection')
//craete a backen app using express
const flappServer = express()

//use
flappServer.use(cors()) 
flappServer.use(express.json()) //returns middleare that only parses json data
flappServer.use(router)
flappServer.use('/uploads', express.static('./uploads')) //to export image from serer to client 
//port creation
 const PORT = 4000 || process.env.PORT

//server listen 
flappServer.listen(PORT,()=>{
    console.log('listening on port' +PORT);
})

//http = get resolving 
flappServer.get("/",(req,res)=>{
    res.send("flapp running")
})