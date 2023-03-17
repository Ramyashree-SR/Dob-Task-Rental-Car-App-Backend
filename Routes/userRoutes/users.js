const express=require('express')
const usersRoute=express.Router()

let usersController=require("../../Controllers/userDetails/userDetails")

usersRoute.post("/register",usersController.register)
usersRoute.post("/login",usersController.login)

module.exports=usersRoute