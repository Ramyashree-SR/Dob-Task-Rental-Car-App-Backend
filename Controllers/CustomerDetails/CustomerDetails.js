let customerDatas = require("../../Models/CustomerSchema/CustomerSchema");
let carDatas = require("../../Models/CarSchema/CarSchema");

let getAllCustomerDetails = async (req, res, next) => {
  try {
    let dataOfCustomer = await customerDatas.find().lean();
    res.json({
      error: false,
      message: "Data of All The Customer",
      data: dataOfCustomer,
    });
  } catch (err) {
    next(err);
  }
};

// let CustomerDetails = async (req, res, next) => {
//     let{ userName,password}=req.body
//     try {
//       let dataOfCustomer = await customerDatas.findOne({userName,password})
//       res.json({
//         error: false,
//         message: "Logged in Sucessfully",
//         data: null
//       });
//       next 
//     } catch (err) {
//       next(err);
//     }
//   };

let AddCustomerData = async (req, res, next) => {
  let {
    customerFName,
    customerMName,
    customerLName,
    custumerAge,
    customerPhNo,
    customerAddress,
    customerAadharNo,
    customerDlNo,
  } = req.body;
  try {
    await customerDatas.insertMany([
      {
        customerFName,
        customerMName,
        customerLName,
        custumerAge,
        customerPhNo,
        customerAddress,
        customerAadharNo,
        customerDlNo,
      },
    ]);
    res.json({
      error: false,
      message: "Customer Data Added Sucessfully",
      data: null,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

let EditedCustomerData = async (req, res, next) => {
  let {
    _id,
    customerFName,
    customerMName,
    customerLName,
    custumerAge,
    customerPhNo,
    customerAddress,
    customerAadharNo,
    customerDlNo,
  } = req.body;
  try {
    await customerDatas.updateOne(
      { _id: _id },
      {
        $set: {
          customerFName,
          customerMName,
          customerLName,
          custumerAge,
          customerPhNo,
          customerAddress,
          customerAadharNo,
          customerDlNo,
        },
      }
    );
    res.json({
      error: false,
      message: "Customer Data edited Sucessfully",
      data: {
        customerFName,
        customerMName,
        customerLName,
        custumerAge,
        customerPhNo,
        customerAddress,
        customerAadharNo,
        customerDlNo,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

let DeleteCustomerData = async (req, res, next) => {
  try {
    await customerDatas.deleteOne({ _id: req.body._id });
    res.json({
      error: false,
      message: "Customer Data is Deleted Sucessfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

let getAllCarDetails = async (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload.role === "Owner") {
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
      message: "Not an Owner",
      data: null,
    });
    next();
  }
};

module.exports = {
  getAllCustomerDetails,
  AddCustomerData,
  EditedCustomerData,
  DeleteCustomerData,
  getAllCarDetails
//   CustomerDetails
};
