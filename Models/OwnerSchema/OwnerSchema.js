const mongoose=require('mongoose')
let schema=mongoose.Schema

const OwnerData=new schema({
    ownerName:{
        type:String,
        minLength:5,
        maxLength:15
    },
    ownerPhno:{
       type:String,
       minLength:10,
       maxlength:10
    },
    // ownerEmail:{
    //     type:String,
    //     minLength:10,
    //     maxLenght:200
    // },
    ownerAddress:{
        type:String,
        min:20,
        max:100000000
    },
    ownerAadhar:{
        type:Number,
        minLength:12,
        maxLength:20
    },
    
})

module.exports=mongoose.model('OwnerDetails',OwnerData)
