var express= require("express");
app=express();
bodyParser=require("body-parser"); 
var mongoose=require("mongoose");

app.set("view engine","ejs");
app.use(express.static("public"));
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
//userschema.plugin(passportlocalmongoose);

var user=mongoose.model("user",userschema);
 var newuser=new user({
     username:"pavitra",
     password:"password"
 })
newuser.save()
app.get("/new1",function(req,res)
{
    res.render("new1");
});

app.post("/data",function(req,res){
    user.findOne({username:"pavitra"},(err,founded)=>{
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
    user.findOne({username:"pavitra"},function(err,found)
    {
        //console.log(found);
        //console.log(d);
        //console.log(found.history);
        found.history.forEach(obj => {
            if(obj.date==d)
                console.log(obj);
        });
       
    });

});
 
app.listen("4000",function(){
    console.log("server started");
});