const express = require("express");
const app = express();

app.get("/",(req,res) =>{
   res.send("hi, i am the root");
});

app.listen("3000", ()=>
{
    console.log("server is listeingn to the port");
});