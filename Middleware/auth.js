const jwt = require('jsonwebtoken')

let authorizeOwner = (req, res,next) => {

    if (req.headers['authorization']) {
        let token = req.headers['authorization'].split(" ")[1]
        let payload=jwt.verify(token,process.env.SECRET_KEY)
        // console.log("jwt",jwt);
        if(payload.role==="Owner" || payload.role==="Customer"){
            next()
        }else{
            // res.json({
            //     error:true,
            //     message:"authorized",
            //     data:null
            // })
            next()
        }
    }else{
        res.json({
            error:true,
            message:"not authorized",
            data:null
        })
    }
}

let authorizeAdmin = (req, res,next) => {
    if (req.headers['authorization']) {
        let token = req.headers['authorization'].split(" ")[1]
        let payload=jwt.verify(token,process.env.SECRET_KEY)
        if(payload.role==="Admin"){
            next()
        }else{
            res.json({
                error:true,
                message:"authorized",
                data:null
            })
        }
    }else{
        res.json({
            error:true,
            message:"not authorized",
            data:null
        })
    }
}

module.exports={
    authorizeOwner,
    authorizeAdmin
}

