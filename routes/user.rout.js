const {UserModel}= require("../model/user.model");
const express = require("express")
require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userRout = express.Router();

userRout.post("/register",async(req,res)=>{
    const { name, email, gender, password } = req.body;
    try {
        let all_data = await UserModel.find({email});
        if(all_data.length === 0){
            bcrypt.hash(password, 5,async(err,val)=>{
                if(err){
                    res.send("login is not working")
                }else{
                    const user = new UserModel({name,email,gender,password:val});
                    await user.save()
                    res.send("User registered Successfully")
                }
            })
        }else{
            res.send("User already Regester")
        }
    } catch (error) {
        res.send("Error in registering the user")
        console.log(error)
    }
})


userRout.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await UserModel.find({email});
        const hashed_pass = user[0].password;
        if(user.length>0){
            bcrypt.compare(password,hashed_pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userid:user[0]._id},process.env.key);
                    res.send({"msg":"Login Successfull","Access_Token":token})
                }else{
                    res.send("Wrong Credntials")
                }
            })
        }else{
            res.send("User Not registered")
        }
    } catch (error) {
        res.send("some thing went wrong in login")
    }
})

module.exports={
    userRout
}