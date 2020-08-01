const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//get api from source
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

app.post("/", function(req, res){
        
        //ask the user to enter the city, get dynamic data
        const query = req.body.cityName;
        const appID = "bc0c84824b928d697d90d134dcf4f8da"; //authentication by API key
        const unit = "metric";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + appID + "&units="+ unit; //structure our URL based on that query


    // for one city: const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=bc0c84824b928d697d90d134dcf4f8da&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode); //get the data for that particular location

        response.on("data",function(data){      //create const to hold nformaion we want to display
            const weatherData = JSON.parse(data) //parse json data
           const temp = weatherData.main.temp
           const description = weatherData.weather[0].description
           const icon = weatherData.weather[0].icon
           const imageURL= "https://openweathermap.org/img/wn/"+ icon + "@2x.png";


           //write the information onto the page, send it over to the  browser using express and node modules
           res.write("<h1>The weather is currently " + description + " in "+ query +"</h1>");
           res.write("<h2>The temperute in "+ query +" is " + temp + " degrees Celcius.</h2>");
            res.write("<img src=" + imageURL + ">");
           res.send(); //send request 
        })
    })
    })
        
})

app.listen(3000, function(){
    console.log("Server is running");
});