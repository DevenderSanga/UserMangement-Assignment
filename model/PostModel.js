const mongooose = require('mongoose');
const PostSchema = new mongooose.Schema({
    tittle: {
        type: String,
        required: true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})
module.exports=mongooose.model("Post",PostSchema);

