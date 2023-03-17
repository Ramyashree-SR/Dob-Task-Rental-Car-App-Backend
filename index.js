const express=require('express')
const app=express()
require('dotenv').config()
require('./Config/db')
const port=process.env.PORT||8000


let rentalcardetails=require('./Routes/CarRoute/CarRoutes')
let rentalOwnerdetails=require('./Routes/OwnerRoute/OwnerRoutes')
let rentalCustomerdetails=require('./Routes/CustomerRoute/CustomerRoutes')
let userDatas=require('./Routes/userRoutes/users')
let rentalcarlocation=require('./Routes/CarLocRoute/carLocRoute')
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/rentalcar',rentalcardetails)
app.use('/rentalOwner',rentalOwnerdetails)
app.use('/rentalCustomer',rentalCustomerdetails)
app.use('/rentaluserauth',userDatas)
app.use('/rentalCarLoc',rentalcarlocation)

let date=new Date()
 console.log(date); 

app.use((err,req,res,next)=>{
    res.status(500)
    res.json({
        err:true,
        message:err.message,
        data:null
    })

    
})

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})