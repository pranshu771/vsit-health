var express= require("express");
app=express();
bodyParser=require("body-parser"); 
var mongoose=require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var http = require('http');
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(require("express-session")({
    secret: "pavitra",
    resave:false,
    saveUnitialiszed:false
  }));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/medical",{useNewUrlParser:true, useUnifiedTopology: true});
// var passportlocalmongoose=require("passport-local-mongoose");
//var calender=require("./calender");

var userschema=new mongoose.Schema({
    username:String,
    password:String,
    history:[{
        bp:[],
        sugar:Number,
        pulse:Number,
        date:{
            type:String
        }
    }
    ]
    
});  
userschema.plugin(passportLocalMongoose);
var user=mongoose.model("user",userschema);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser()); 
passport.deserializeUser(user.deserializeUser()); 

app.use(function(req,res,next) {
  res.locals.currentUser = req.user; 
  next();
})

//  var newuser=new user({
//      username:"pavitra",
//      password:"password"
//  })
// newuser.save()
app.get("/",function(req,res)
{
    res.send(`Signed in as : ${ req.user.username}`)
});
app.get("/lhome",function(req,res)
{
    res.render("lhome.ejs");
});

app.get("/new1",function(req,res)
{
    res.render("new1");
});

app.post("/data",function(req,res){
    user.findById(req.user._id,(err,founded)=>{
        const d = new Date();
        let d1 = `${d.getFullYear()}`
        if((d.getMonth()+1)<10) {
            d1+=`0${d.getMonth()+1}`
        }
        else{
            
            d1+=`${d.getMonth()+1}`

        }
        if((d.getDate()+1)<10) {
            d1+=`0${d.getDate()}`
        }
        else{
            
            d1+=`${d.getDate()}`

        }
        const obj = {
            bp : [req.body.user.systolic,req.body.user.diastolic],
            sugar:req.body.user.sugar,
            pulse:req.body.user.pulse,
            date: d1
        } 
        console.log(founded["history"].push(obj))
        founded.save((err,saved)=>{
            if(err) console.log(err)
            else console.log(saved)
        })
    })
});
app.get("/show",function(req,res)
{
    res.render("show");
});
app.post("/show",function(req,res){
   // console.log("here");
    let d = req.body.user.date
    d = d.split("-")
    d = d.join("") 
    user.findById(req.user._id,function(err,found)
    {
        //console.log(found);
        //console.log(d);
        //console.log(found.history);
         let result = []
         found.history.forEach(element => {
            if(element.date == d) result.push(element)
        });
        console.log(result);
        res.render("data",{result});
    }); 

});

app.get("/register",function(req,res){
    res.render("register");
});
app.post("/register",function(req,res){
    var newuser = new user({username:req.body.username,password:req.body.password});
    user.register(newuser,req.body.password,function(err,user){
      if(err){
        
        res.redirect("/register");
       }
      else{
        
       passport.authenticate("local")(req,res,function(){
  
        user.save(); 
      res.redirect("/");
    });}
    });
   
  });

  app.get("/login",function(req,res){
    res.render("login");
  })
  app.post("/login",passport.authenticate("local",{successRedirect:"/lhome",failureRedirect:"/login"}),function(req,res){
    if (err) {console.log(err)}
    else
    {
        console.log(obj)
    }
   });
   app.get("/logout",isLoggedIn,function(req,res){
     req.logout(); 
     res.redirect("/");
   });
   
   function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
       return next();
     } 
     res.redirect("/login");
   }
  //disease
  app.post("/disease",function(req,response){

    var result=req.body.disease.title;
    var value=result.toString();
    value = value.replace(/\s/, '');
    console.log(result);
    var options = {
        'method': 'GET',
        'hostname': 'www.healthos.co',
        'path': '/api/v1/search/diseases/'+value,
        'headers': {
          'Authorization': 'Bearer 6a4860b58fd9f53d8ed1bb99ed6157eb70876edc40119e4b106f1236c9aec379'
        }
      };
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          var results=JSON.parse(body);
          response.render("dshow",{results});
          console.log(results);
        });
      
        res.on("error", function (error) {
          console.error(error);
        });
      
      });
      req.end();
        
});
app.get("/disease/find",function(req,res)
{
    res.render("find");
});
app.get("/disease/:id",function(request,response){
    console.log("here");
    var options = {
        'method': 'GET',
        'hostname': 'www.healthos.co',
        'path': '/api/v1/diseases/'+request.params.id,
        'headers': {
          'Authorization': 'Bearer 6a4860b58fd9f53d8ed1bb99ed6157eb70876edc40119e4b106f1236c9aec379'
        }
      };
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          var results=JSON.parse(body);
          response.render("show1",{results:results});
          console.log(results);
        });
      
        res.on("error", function (error) {
          console.error(error);
        });
      
      });
      req.end();
});
//food
app.post("/food",function(req,response){

    var result=req.body.food.title;
    var value=result.toString();
    value = value.replace(/\s/, '');
    console.log(result);
    var options = {
        'method': 'GET',
        'hostname': 'www.healthos.co',
        'path': '/api/v1/search/food/items/'+value,
        'headers': {
          'Authorization': 'Bearer 6a4860b58fd9f53d8ed1bb99ed6157eb70876edc40119e4b106f1236c9aec379'
        }
      };
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          var results=JSON.parse(body);
          response.render("fshow",{results:results});
          console.log(results);
        });
      
        res.on("error", function (error) {
          console.error(error);
        });
      
      });
      req.end();
        
});
app.get("/food/find",function(req,res)
{
    res.render("ffind");
});
app.get("/food/:id",function(request,response){
    console.log("here");
    var options = {
        'method': 'GET',
        'hostname': 'www.healthos.co',
        'path': '/api/v1/food/items'+request.params.id,
        'headers': {
          'Authorization': 'Bearer 6a4860b58fd9f53d8ed1bb99ed6157eb70876edc40119e4b106f1236c9aec379'
        }
      };
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          var results=JSON.parse(body);
          response.render("fshow1",{results:results});
          console.log(results);
        });
      
        res.on("error", function (error) {
          console.error(error);
        });
      
      });
      req.end();
});
//medicines
app.post("/medicine",function(request,response)
{
    var value=request.body.medicine.title;
    var options = {
        'method': 'GET',
        'hostname': 'www.healthos.co',
        'path': '/api/v1/search/medicines/brands/'+value,
        'headers': {
          'Authorization': 'Bearer 6a4860b58fd9f53d8ed1bb99ed6157eb70876edc40119e4b106f1236c9aec379'
        }
      };
      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          var results=JSON.parse(body);
          response.render("mshow",{results:results});
          console.log(results);
        });
      
        res.on("error", function (error) {
          console.error(error);
        });
      });
      
      req.end();
});
app.get("/medicine/find",function(req,res)
{
    res.render("mfind");
});
app.get("/medicine/:id",function(request,response){
    console.log("here");
   console.log(request.params.id);

    var options = {
            'method': 'GET',
            'hostname': 'www.healthos.co',
            'path': '/api/v1/medicines/brands/'+request.params.id,
            'headers': {
                    'Authorization': 'Bearer 6a4860b58fd9f53d8ed1bb99ed6157eb70876edc40119e4b106f1236c9aec379'
            }
    };

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
    chunks.push(chunk);
    });

    res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    var results=JSON.parse(body);
    console.log(results);
    response.render("mshow1",{results:results});
    
    });

    res.on("error", function (error) {
    console.error(error);
     });
});

req.end();
});

app.listen("4000",function(){
    console.log("server started");
});