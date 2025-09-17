const express=require("express")
const route=express.Router()
const Task = require("../models//Task");
route.post("/",async(req,res)=>{
    try {
        const task=new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({error:error.message })
    }
});
route.get("/view",async(req,res)=>{
    try {
         const tasks=await Task.find();
         res.status(200).json(tasks)
    } catch (error) {
         res.status(500).json({ error:error.message})
         }
    });

    route.get("/:id",async(req,res)=>{
    try {
         const task=await Task.findById(req.params.id);
         if(!task)return res.status(404).json({error:"Task not found"});
         res.status(200).json(task);
    } catch (error) {
         res.status(400).json({ error:"Invalid task ID"});
         }
    });


    route.put("/:id",async(req,res)=>{
        try{
            const {title,description,status,duedate}=req.body;
            const updatedTask=await Task.findByIdAndUpdate(req.params.id,{title,description,status,duedate},{new:true});
            if(!updatedTask)
                return res.status(404).json({message:"Task not found"});
            res.json(updatedTask);
        } catch (error){
            res.status(400).json({error:error.message})

        }
    });
    route.delete("/:id",async(req,res)=>{
        try {
            const deletedTask=await Task.findByIdAndDelete(req.params.id);
            res.json(deletedTask);
           
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    })
route.get('/status/:status', async (req, res) => {
    const { status } = req.params;
    const validStatuses = ['pending', 'in-progress', 'completed'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error:'Invalid status value' });
    }

    try {
        const tasks = await Task.find({ status });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports=route;