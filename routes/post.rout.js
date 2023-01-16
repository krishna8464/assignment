const {PostModel} = require("../model/post.model");
const express = require("express");
require("dotenv").config();
// const {authentication} = require("../middleware/Authentication");
const postRout = express()

// postRout.use(authentication)

postRout.get("/",async(req,res)=>{
    const query = req.query;
    query.userID=req.body.userID
    console.log(query)
    try {
        const posts = await PostModel.find(query);
        res.send(posts)
    } catch (error) {
        res.send({"msg":"Something went wrong in posts get route"})
    }
})

postRout.post("/create",async(req,res)=>{
        const data = req.body;
    try {
        const post = new PostModel(data);
        await post.save();
        res.send("post created")
    } catch (error) {
        console.log(err);
        res.send({"msg":"Something went wrong"})
    } 
})

postRout.patch("/update/:id",async(req,res)=>{
    const data = req.body;
    const id = req.params.id
    const note = await PostModel.findOne({"_id":id})
    const userid_in_note = note.userID
    const useerid_in_req = req.body.userID
    // console.log(data)
    try {
        if(userid_in_note === useerid_in_req){
            await PostModel.findByIdAndUpdate({_id:id},data);
            res.send("post Updated Successfully")
        }else{
            res.send("Not Authorized")
        }
        
    } catch (error) {
        res.send({"err":"Something went wrong in note update"})
    }
})

postRout.delete("/delete/:id",async(req,res)=>{
   
    const id = req.params.id
    const note = await PostModel.findOne({"_id":id})
    const userid_in_note = note.userID
    const useerid_in_req = req.body.userID
    // console.log(data)
    try {
        if(userid_in_note === useerid_in_req){
            await PostModel.findByIdAndDelete({_id:id});
            res.send("post Deleted Successfully")
        }else{
            res.send("Not Authorized")
        }
        
    } catch (error) {
        res.send({"err":"Something went wrong in note update"})
    }
})



module.exports={
    postRout
}