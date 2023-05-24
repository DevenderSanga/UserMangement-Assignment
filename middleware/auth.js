// const { request } = require("express");
const jwt = require("jsonwebtoken");


module.exports=(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const tokenVerify=jwt.verify(token,"Bunny");
        req.userId=tokenVerify.id
        next()
    }catch {
        res.status(401).json({
            message: 'Authentication failed'
        })
    }
      
}
