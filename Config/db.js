const mongoose=require('mongoose')

module.exports.mongoConnect=mongoose.connect(
    process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true},
    (err)=>
    {
        if(!err){
            console.log('DB is connected sucessfully');

        }else{
            console.log('DB not found');
        }
     
    }
    
)