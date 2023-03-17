const mongoose=require('mongoose')
let schema=mongoose.Schema

const CustomerData=new schema({
    customerFName:{
        type:String,
        minLength:5,
        maxLength:15
    },
    customerMName:{
       type:String,
       minLength:1,
       maxlength:10
    },
    customerLName:{
        type:String,
        min:5,
        max:100000000
    },
    custumerAge:{
        type:Number,
        minLength:4,
        maxLength:4
    },
    customerPhNo:{
        type:String,
        minLength:10,
        maxLength:200
    },
    customerAddress:{
        type:String,
        minLength:10,
        maxLength:200
    },
    customerAadharNo:{
        type:String,
        minLength:10,
        maxLength:200
    },
    customerDlNo:{
        type:String,
        minLength:10,
        maxLength:200
    },
   
})

module.exports=mongoose.model('CustomerDetails',CustomerData)