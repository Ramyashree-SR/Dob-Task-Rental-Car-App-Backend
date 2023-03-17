let carDatas = require("../../Models/CarSchema/CarSchema");
const jwt = require("jsonwebtoken");

let getAllCarDetails = async (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.role === "Customer" || payload.role==="Owner") {
    try {
      let dataOfCar = await carDatas.find().lean();
      res.json({
        error: false,
        message: "Data of All The Cars",
        data: dataOfCar,
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.json({
      error: true,
      message: "Not an Owner To See All Car",
      data: null,
    });
    next();
  }
};

let AddCarData = async (req, res, next) => {
  let { no,
    name,
    model,
    year,
    color,
    type,
    RcNo,
    address,
    location } =
    req.body;
  let token = req.headers["authorization"].split(" ")[1];
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.role === "Owner") {
    try {
      await carDatas.insertMany([
        { no,
          name,
          model,
          year,
          color,
          type,
          RcNo,
          address,
          location },
      ]);
      res.json({
        error: false,
        message: "Car Data Added Sucessfully",
        data: null,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.json({
      error: true,
      message: "Not an Owner To Add A Car",
      data: null,
    });
    // next()
  }
};

let EditedCarData = async (req, res, next) => {
  let { _id, no,
    name,
    model,
    year,
    color,
    type,
    RcNo,
    address,
    location } =
    req.body;
  let token = req.headers["authorization"].split(" ")[1];
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.role === "Owner") {
    try {
      await carDatas.updateOne(
        { _id: _id },
        {
          $set: {
            no,
            name,
            model,
            year,
            color,
            type,
            RcNo,
            address,
            location
          },
        }
      );
      res.json({
        error: false,
        message: "Student Data edited Sucessfully",
        data: { no,
          name,
          model,
          year,
          color,
          type,
          RcNo,
          address,
          location},
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    next();
  }
};

let DeleteCarData = async (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.role === "Owner") {
    try {
      await carDatas.deleteOne({ _id: req.body._id });
      res.json({
        error: false,
        message: "Car Data is Deleted Sucessfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
};

const searchCardetails=async(req,res)=>{
  try{
    var search=req.body.search
    var car_data=await carDatas.find({"name":{$regex:".*"+search+".*",$options:'i'}})
    if(car_data.length>0){
      res.status(200).json({
        error:true,
        message:"car details found",
        data:car_data
      })
    }else{
      res.status(200).json({
        error:true,
        message:"car Details not found",
        data:null
      })
    }
  }catch(err){
    next(err)
  }
}

const findCarsDetails = async (req, res) => {
  try {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    console.log(latitude);
    console.log(longitude);

    const Car_Data = await carDatas.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          key: "location",
          maxDistance: parseFloat(1000) * 1609,
          distanceField: "dist.calculated",
          spherical: true,
          
        },
      },
    ]);
    res.status(200).json({
      error: false,
      message: "Car Details found",
      data: Car_Data,
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      error: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllCarDetails,
  AddCarData,
  EditedCarData,
  DeleteCarData,
  searchCardetails,
  findCarsDetails
};
