const flights = require('../Models/flightSchema')

// add flight details login for admin
exports.addFlight = async (req, res) => {
  // res.status(200).json("add flight detail req");

  // get user id and role
  const userId = req.payload;

  // add flight details
  const { airline, flightNumber, departureAirport, destinationAirport, departureDate, departureTime, arrivalDate, arrivalTime, price, layover, duration } = req.body; // get image
  const airlineLogo = req.file.filename;
  console.log(airlineLogo);

  // logic for adding flight details
  try {
    const existingFlight = await flights.findOne({ flightNumber });
    if (existingFlight) {
      res.status(406).json({ message: 'Flight already exists' });
    } else {
      const newFlight = new flights({
        airline,
        airlineLogo,
        flightNumber,
        departureAirport,
        destinationAirport,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        price,
        layover,
        duration,
        userId,
      });
      await newFlight.save();
      res.status(200).json({ message: 'Flight added successfully' });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//get admin flights
exports.getAdminFlights = async(req,res)=>{
    const userId = req.payload
  
    //api request
    try{
      const allAdminFlights =await flights.find({userId})
      console.log(allAdminFlights);
      res.status(200).json(allAdminFlights)//send response to the client
  }
  catch(err){
      res.status(401).json(err.message)
  }
}

//get fligths for search
exports.getFlightsbySearch = async (req, res) => {
  const searchParams = {
    departureAirport: req.query.departureAirport,
    destinationAirport: req.query.destinationAirport,
    departureDate: req.query.departureDate,
    arrivalDate: req.query.arrivalDate,
  };
  const query = {};

  if (searchParams.departureAirport) {
    query.departureAirport = {
      $regex: searchParams.departureAirport, // Use $regex on the specific city field
      $options: "i",
    };
  }

  if (searchParams.destinationAirport) {
    query.destinationAirport = {
      $regex: searchParams.destinationAirport, // Use $regex on the specific city field
      $options: "i",
    };
  }

  if (searchParams.departureDate) {
    query.departureDate = searchParams.departureDate;
  }

  if (searchParams.arrivalDate) {
    query.arrivalDate = searchParams.arrivalDate;
  }

  try {
    const matchingFlights = await flights.find(query);
    console.log(matchingFlights);
    res.status(200).json(matchingFlights);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

//edit flight details
exports.editFlight= async(req,res)=>{
  const { airline,airlineLogo, flightNumber, departureAirport, destinationAirport, departureDate, departureTime, arrivalDate, arrivalTime, price, layover, duration } = req.body; // get image
  const uploadImage = req.file?req.file.filename:airlineLogo;
  const userId=req.payload
  const {id}=req.params//in the request parameter we pass the id

  try{
    const updateFlight = await flights.findByIdAndUpdate({_id:id},{
      airline,airlineLogo:uploadImage,
       flightNumber, departureAirport, destinationAirport, departureDate, departureTime, arrivalDate, arrivalTime, price, layover, duration,userId
    },{new:true})
    //save the update project details
    await updateFlight.save()
    //response send back to client
    res.status(200).json(updateFlight)
  }catch(err){
    res.status(401).json(err)
  }
}

//delete flight
exports.deleteAdminFlights = async(req,res)=>{
  const {fid} = req.params
  try{
const deleteData = await flights.findByIdAndDelete({_id:fid})
res.status(200).json(deleteData)  
}catch(err){
    res.status(401).json(err)
  }
}