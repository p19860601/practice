const express = require('express');
const { request } = require('express');
const app = express();

app.get("/", function(req, res){ //req=require, res=respond
    res.send("<h1>Hello there on the server</h1>");
});

app.get("/contact", function(req, res){
    res.send("Contact me at: bumble.com");
});

app.get("/about", function(req, res){
    res.send("About me: Lovely and friendly and down to earth");
});

app.listen(3000, function(){
    console.log("server started on port 3000");
});
