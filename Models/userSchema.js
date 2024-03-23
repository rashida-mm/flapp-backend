const mongoose = require('mongoose')
//model is to bring the mongodb to backend
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
      },
    email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['user', 'admin'], // Define possible roles
        default: 'user', // Default role is 'user'
      },
      bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bookings' }],
    });

    const users = mongoose.model("users",userSchema)
    ///users is the collection v creat in mongodb
    module.exports=users
