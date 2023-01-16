const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title : String,
    body : String,
    device :String,
    userID:String
},{
    versionKey:false
})

const PostModel = mongoose.model("posts",postSchema);

module.exports={
    PostModel
}
