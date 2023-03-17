const express=require('express')
let route=express.Router()

// const multer=require('multer');
// const path=require("path");

const dataOfCarss=require('../../Controllers/CarLocation/carLocationDetails')
const auth=require('../../Middleware/auth')

route.get('/get-carloc',auth.authorizeOwner,dataOfCarss.getAllCarLoc)
route.post('/add-carloc',auth.authorizeOwner,dataOfCarss.AddCarLoc)  
route.put('/put-carloc',auth.authorizeOwner,dataOfCarss.EditedCarLoc)
route.delete('/delete-carloc',auth.authorizeOwner,dataOfCarss.DeleteCarLoc)

// route.post('/added-carloc',auth.authorizeOwner,dataOfCarss.AddCarLocation) 

route.post('/find-carloc',dataOfCarss.findCars)

module.exports=route