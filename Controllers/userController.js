const users = require('../Models/userSchema')
//import jwt
const jwt = require('jsonwebtoken')


// Register logic
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Determine the role based on the name (assign 'admin' if name is 'admin', else 'user')
    const role = name.toLowerCase() === 'admin' ? 'admin' : 'user';

    // Check if the email is already registered
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(401).json("User already registered");
    }

    // Create a new user with the determined role
    const newUser = new users({
      name,
      email,
      password,
      role,
      bookings: [],  // Assuming bookings is an array property
    });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
};




//login logic
exports.login = async(req,res)=>{
  const {email,password} = req.body //obj destructing
  try{
    //check if they are existing
    const user = await users.findOne({email,password})
    if(user){
      //token generation
      const token = jwt.sign({userId:user._id,role: user.role},"flapp2024")
      console.log(token);
      res.status(200).json({user , token})//response
      
    }
    else{
      res.status(401).json("Login Failed")
    }

  }
  catch(err){
    res.status(500).json("server error" +err.message)
  }
}