const bookings = require('../Models/bookingSchema');

exports.addBooking = async (req, res) => {
    const userId = req.payload;

    // Extract flight and passenger details from request body
    const { 
        airline,
        flightNumber,
        airlineLogo,
        departureAirport,
        destinationAirport,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        classType,
        duration,
        layover,
        passengerDetails: [{
            fullName,
            contactNumber
        }]
    } = req.body;

    try {

        // Create a new booking
        const newBooking = new bookings({
            userId,
            flight: {
                airline,
                flightNumber,
                airlineLogo,
                departureAirport,
                destinationAirport,
                departureDate,
                departureTime,
                arrivalDate,
                arrivalTime,
                classType,
                duration,
                layover
            },
            passengerDetails: [{
                fullName,
                contactNumber
            }]
        });

        await newBooking.save();
        return res.status(201).json({ message: 'Booking added successfully', booking: newBooking });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

  
//get booked flights
exports.getBookings = async(req,res)=>{
    const userId = req.payload
  
    //api request
    try{
      const bookedFlights =await bookings.find({userId})
      console.log(bookedFlights);
      res.status(200).json(bookedFlights)//send response to the client
  }
  catch(err){
      res.status(401).json(err.message)
  }
}