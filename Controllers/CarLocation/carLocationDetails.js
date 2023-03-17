let carLocData = require("../../Models/CarLocation/carLocationSchema");
const jwt = require("jsonwebtoken");

let getAllCarLoc = async (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.role === "Customer" || payload.role === "Owner") {
    try {
      let dataOfCar = await carLocData.find().lean();
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

let AddCarLoc = async (req, res, next) => {
  console.log(req.body);
  let { name, model, address, location } = req.body;
  let token = req.headers["authorization"].split(" ")[1];
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.role === "Owner") {
    try {
      await carLocData.insertMany([{ name, model, address, location }]);
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
  }
};


let EditedCarLoc = async (req, res, next) => {
  let { _id, name, model, address, location } = req.body;
  let token = req.headers["authorization"].split(" ")[1];
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.role === "Owner") {
    try {
      await carLocData.updateOne(
        { _id: _id },
        {
          $set: {
            name,
            model,
            address,
            location,
          },
        }
      );
      res.json({
        error: false,
        message: "Car Data edited Sucessfully",
        data: { name, model, address, location },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    next();
  }
};

let DeleteCarLoc = async (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.role === "Owner") {
    try {
      await carLocData.deleteOne({ _id: req.body._id });
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

const findCars = async (req, res) => {
  try {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    console.log(latitude);
    console.log(longitude);

    const Car_Data = await carLocData.aggregate([
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
  getAllCarLoc,
  AddCarLoc,
  EditedCarLoc,
  DeleteCarLoc,
  // AddCarLocation,
  findCars,
};
