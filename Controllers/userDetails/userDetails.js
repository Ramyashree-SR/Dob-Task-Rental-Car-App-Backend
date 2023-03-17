const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let usersModel = require('../../Models/UserSchema/userSchema')

let register = async (req, res, next) => {
    let { userName, email, password, role } = req.body
    try {
        let emailExists = await usersModel.findOne({ email: email })
        console.log("entering",emailExists)
        if (emailExists) {
            res.status(401).json({
                error: true,
                message: "Email already exists",
                data: null
            })
        } else {
            let saltRounds = 10;
            //salting
            let salt = await bcrypt.genSalt(saltRounds)
            // console.log("salt",salt);
            let hashedPassword = await bcrypt.hash(password, salt)
            // console.log("hashedPassword",hashedPassword);
            await usersModel({ userName, email, password: hashedPassword, role }).save()
            // await usersModel.insertMany([{ userName, email, password: hashedPassword, role }])

            res.status(200).json({
                error: false,
                message: "User registered successfully",
                data: null
            })
        }
    } catch (err) {
        next(err)
    }
}

let login = async (req, res, next) => {
    let { email, password } = req.body
    try {
        let userData = await usersModel.findOne({ email: email }).lean()
        if (userData) {
            let { userName, role } = userData
            isPasswordMatch = await bcrypt.compare(password, userData.password)
            if (isPasswordMatch) {
                let payload = { userName, role }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: "10h"
                })
                res.status(200).json({
                    error: false,
                    message: "Login successful",
                    data: {
                       userName, role, token
                    }
                })
            } else {
                res.status(400).json({
                    error: false,
                    message: "Invalid password",
                    data: null
                })
            }
        } else {
            res.status(400).json({
                error: false,
                message: "Email doesn't exist, create an account",
                data: null
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login
}