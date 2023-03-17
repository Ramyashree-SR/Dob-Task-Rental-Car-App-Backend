const mongoose=require('mongoose')
let schema=mongoose.Schema

const CarData=new schema({
    no:{
        type:String,
        minLength:5,
        maxLength:15
    },
    name:{
       type:String,
       minLength:5,
       maxlength:10
    },
    model:{
        type:String,
        min:5,
        max:100000000
    },
    year:{
        type:Number,
        minLength:4,
        maxLength:4
    },
    color:{
        type:String,
        minLength:5,
        maxLength:200
    },
    type:{
        type:String,
        minLenght:6,
        maxLength:10
    },
    RcNo:{
        type:String,
        minLength:6,
        maxLength:200
    },
    address:{
        type:String,
        min:10,
        max:15
    },
    location:{
        type:{
        type:String,
        min:10,
        max:15},
        coordinates:[]
    }
})


CarData.index({location:"2dsphere"})
module.exports=mongoose.model('CarDetails',CarData)