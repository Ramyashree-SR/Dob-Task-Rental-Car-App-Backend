const mongoose=require('mongoose')
let schema=mongoose.Schema

const CarLocation=new schema({
    name:{
        type:String,
        minLength:5,
        maxLength:15
    },
    model:{
       type:String,
       minLength:5,
       maxlength:10
    },
    address:{
        type:String,
        min:5,
        max:100000000
    },
    location:{
        type:{type:String},
        coordinates:[]
    },
})

CarLocation.index({location:"2dsphere"})
module.exports=mongoose.model('CarLocations',CarLocation)