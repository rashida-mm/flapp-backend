const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>
{console.log('MongoDB conection established');})
.catch((error)=>{
    console.log("connection error");
})
