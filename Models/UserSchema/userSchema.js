const mongoose=require('mongoose')
let schema=mongoose.Schema

const userDataSchema=new schema({
userName:{
    type:String,
    minLength:5,
    maxLength:20,
    required:true
},
email:{
    type:String,
    minlength:3,
    maxlength:100
},
password:{
    type:String,
    minLength:3,
    maxLength:100,
    },
role:{
    type:String,
    minlength:1,
    maxlength:20
},
date:{
    type:Date,
    default:Date.now()
}
})

module.exports=mongoose.model('RentalUserDetails',userDataSchema)