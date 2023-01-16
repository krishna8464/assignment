const jwt = require("jsonwebtoken");
const {PostModel} = require("../model/post.model");
require("dotenv").config();

async function authenticat(req,res,next){
    req.body.userID="asdfas"
    try {
        const token = req.headers.authorization;
        if(token){
            const decoded = jwt.verify(token,process.env.key);
            if(decoded){
                const userid = decoded.userid;
                req.body.userID=  userid;
                next()

            }else{
                res.send("Access Denied")
            }

        }else{
            res.res("Access Denied")
        }
    } catch (error) {
        res.send({"err":"Please login first"})
    }
}

module.exports={
    authenticat
}