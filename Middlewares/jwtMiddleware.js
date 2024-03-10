const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwt middleware");
    //token verification
    //get token from req header
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    //verify token
    try {
        const tokenVerification = jwt.verify(token,"flapp2024");
        console.log(tokenVerification);
        req.payload = tokenVerification.userId;
        next();
      } catch (err) {
        console.error("Token Verification Error:", err.message);
        res.status(401).json("Authorization failed...please login again...");
      }
      
    }
module.exports = jwtMiddleware