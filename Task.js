const mongoose=require("mongoose");
const TaskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true,default:"pending"},
    Duedate:{type:Date,required:true}


})
module.exports=mongoose.model("Task",TaskSchema);