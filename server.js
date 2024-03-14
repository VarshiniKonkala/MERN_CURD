const mongoose=require('mongoose')
const express=require('express')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cors())
const port=3000
const conn_str="mongodb+srv://varshini:Varshini2003@cluster0.st30aiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose
.connect(conn_str)
.then(()=>{console.log("Connected to MongoDB successfully")})
.catch((err)=>{console.log(err)})
const ProTitlesSchema=new mongoose.Schema({
    name:String,
    cgpa:Number,
    title:String
});
const db_oper=new mongoose.model("pro_titles",ProTitlesSchema);
app.get("/",(req,res)=>{
    res.send("Server is running");
})
app.get("/pro_titles",async(req,res)=>{
    let data=await db_oper.find();
    res.send(data)
})
app.get("/pro_titles/:id",async(req,res)=>{
    let data=await db_oper.find({_id:req.params.id});
    res.send(data);
})
app.post("/pro_titles",async(req,res)=>{
    let obj=new db_oper(req.body);
    let result=await obj.save()
    res.send(result)
})
app.put("/pro_titles/:id",async(req,res)=>{
    let result=await db_oper.updateOne(
        {_id:req.params.id},
        {$set:{
            name:req.body.name,
            cgpa:req.body.cgpa,
            title:req.body.title
        }}
    );
    res.send(result);
});
app.delete("/pro_titles/:id",async(req,res)=>{
    let result=await db_oper.deleteOne({_id:req.params.id});
    res.send(result);
});
server=app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is running at http://localhost:"+server.address().port);
    }
});