const express = require('express')

//import usercontroller
const usercontroller = require('../Controllers/userController')
const flightController = require('../Controllers/flightController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//create a router object for defining the paths
const router = new express.Router()
//using router object to define paths
//register API routes
router.post('/register',usercontroller.register)

//login API routes
router.post('/login',usercontroller.login)

//add flight API
router.post('/flight/add',jwtMiddleware,multerConfig.single('airlineLogo'), flightController.addFlight)

//get adminFlights API
router.get('/flight/all-admin-flights',jwtMiddleware,flightController.getAdminFlights)

//get search flight api
router.get('/flight/all-search-flights',flightController.getFlightsbySearch)

//update flight
router.put('/flight/update-flights/:id',jwtMiddleware,multerConfig.single('airlineLogo'),flightController.editFlight)

//delet Flight
router.delete('/flight/delete-flights/:fid',jwtMiddleware,flightController.deleteAdminFlights)

module.exports=router
