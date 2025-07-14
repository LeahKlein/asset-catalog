const express = require("express");
const app=express()

app.post("/save",(req,res)=>{
    console.log(req.query);
    res.send("The file uploaded");
})
app.listen(3001,()=>{
    console.log("running");
})
