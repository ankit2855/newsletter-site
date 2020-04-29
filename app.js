// jshint esversion:6

const express = require("express");
const bodyparser= require("body-parser");
const https=require("https");

const app=express();

 app.use(express.static("Public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const emailid = req.body.email;

var data={
  members:[
    {
    status:"subscribed",
    email_address:emailid,
    merge_fields:{
FNAME:firstname,
LNAME:lastname
    }
  }
  ]
};

var jsonData = JSON.stringify(data);

const url = "https://us19.api.mailchimp.com/3.0/lists/efeac9cfd9";

const options={
  method:'POST',
  auth:'ankit07:6d3066eb76a0e9657bf2274cf63f16b8-us19'
};

const request = https.request(url, options, function(response){


if(response.statusCode === 200)
{
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}


    response.on("data", function(data){
    console.log(JSON.parse(data));


  });


});

request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT||3000,function(){
  console.log("Server started at port 3000");
});


