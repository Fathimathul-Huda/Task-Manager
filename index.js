const express=require("express");
const mongodb=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors")
dotenv.config();
const app=express();
const port=3000;
app.use(express.json())
app.use(cors())
mongodb.connect(process.env.MONGO)
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log("db connection error:",err);
})
const userdot=require("./Routes/taskRoutes")
app.use("/",userdot)

app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})