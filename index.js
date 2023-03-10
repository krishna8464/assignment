const express = require("express");
const {connection}=require("./config/db")
const {userRout}= require("./routes/user.rout");
const {postRout}= require("./routes/post.rout");
const {authenticat}= require("./middleware/Authentication")
require('dotenv').config()

const cors = require("cors")




app = express();
app.use(express.json())

app.use(cors({
    origin:"*"
}))

app.get("/",async(req,res)=>{
    try {
        res.send("welcome to the mediaapp")
    } catch (error) {
        res.send("not work")
    }
})

app.use("/users",userRout)
app.use(authenticat)
app.use("/posts",postRout)

app.listen(process.env.port,async()=>{

    try {
        await connection
        console.log("Connected to DB")
        
    } catch (error) {
        console.log("Error while connecting to DB")
    }
    console.log(`The server is running at ${process.env.port}`)
})
