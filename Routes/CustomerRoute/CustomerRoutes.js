const express=require('express')
let route=express.Router()

const dataOfCustomers=require('../../Controllers/CustomerDetails/CustomerDetails')

route.get('/get-customer',dataOfCustomers.getAllCustomerDetails)
route.get('/get-car',dataOfCustomers.getAllCarDetails)
route.post('/add-customer',dataOfCustomers.AddCustomerData)
route.put('/put-customer',dataOfCustomers.EditedCustomerData)
route.delete('/delete-customer',dataOfCustomers.DeleteCustomerData)

module.exports=route;