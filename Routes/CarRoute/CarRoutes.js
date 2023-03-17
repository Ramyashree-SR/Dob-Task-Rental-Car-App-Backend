// const { Router } = require('express')
const express=require('express')
let route=express.Router()

const dataOfCars=require('../../Controllers/CarDetails/CarDetails')
const auth=require('../../Middleware/auth')

route.get('/get-car',auth.authorizeOwner,dataOfCars.getAllCarDetails)
route.post('/add-car',auth.authorizeOwner,dataOfCars.AddCarData)
route.put('/edit-car',auth.authorizeOwner,dataOfCars.EditedCarData)
route.delete('/delete-car',auth.authorizeOwner,dataOfCars.DeleteCarData)
route.get("/search-car",dataOfCars.searchCardetails)
route.post('/find-car',dataOfCars.findCarsDetails)

module.exports=route;