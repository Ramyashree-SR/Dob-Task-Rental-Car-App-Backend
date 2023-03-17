let ownerDatas=require('../../Models/OwnerSchema/OwnerSchema')


let getAllOwnerDetails=async(req,res,next)=>{
  try{
       let dataOfOwner=await ownerDatas.find().lean()
       res.json({
          error:false,
          message:"All Owner Datas",
          data:dataOfOwner
        })
      }
      catch(err){
        next(err)
    }
  }
  

  let AddOwnerData=async(req,res,next)=>{
   let {ownerName,ownerPhno,ownerAddress,ownerAadhar,ownerRcNo }=req.body
    try{
     await ownerDatas.insertMany([{ownerName,ownerPhno,ownerAddress,ownerAadhar,ownerRcNo }])
      res.json({
        error:false,
        message:"Owner Data Added Sucessfully",
        data:null
      })
    
    }catch(err){
      console.log(err);
     next(err)
  }
    }
   


  let EditedOwnerData=async(req,res,next)=>{
    let {_id,ownerName,ownerPhno,ownerAddress,ownerAadhar,ownerRcNo }=req.body
    try{
        await ownerDatas.updateOne({_id:_id},{
            $set:{
                ownerName,ownerPhno,ownerAddress,ownerAadhar,ownerRcNo 
                }
        })
        res.json({
          error:false,
          message:"Owner Data edited Sucessfully",
          data:{ownerName,ownerPhno,ownerAddress,ownerAadhar,ownerRcNo }
        })
    }catch(err){
      console.log(err);
        next(err)
    }
  }
  

  let DeleteOwnerData=async(req,res,next)=>{
   try{
      await ownerDatas.deleteOne({_id:req.body._id})
         res.json({
           error:false,
           message:"Owner Data is Deleted Sucessfully",
           data:null
         })
    }catch(err){
        next(err)
    }
}

module.exports={
    getAllOwnerDetails,
    AddOwnerData,
    EditedOwnerData,
    DeleteOwnerData
}