// const express= require('express')
const express=require('express')
let route=express.Router()

const dataOfOwner=require('../../Controllers/OwnerDetails/OwnerDetails')
const auth=require('../../Middleware/auth')

route.get('/get-owner',auth.authorizeOwner,dataOfOwner.getAllOwnerDetails)
route.post('/add-owner',auth.authorizeOwner,dataOfOwner.AddOwnerData)
route.put('/put-owner',auth.authorizeOwner,dataOfOwner.EditedOwnerData)
route.delete('/delete-owner',auth.authorizeOwner,dataOfOwner.DeleteOwnerData)

module.exports=route;