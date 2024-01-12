const { response } = require("express");
var express = require("express");
var app = express();
var mysql = require("mysql");
var fileupload = require("express-fileupload");
app.use(express.static("public"));
app.use(fileupload());

app.listen(2007, function () {
  console.log("started..");
})
//----------open index pge--------------
app.get("/index-pge", function (req, resp) {
  var path = process.cwd() + "/public/index.html";
  resp.sendFile(path);

})

console.log("reached");
var configObj = {
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
}/*
var configObj = {
  host: "b9wqpy2f95es6axdgmat-mysql.services.clever-cloud.com",
  user: "umggq8fnanmqqxpb",
  password: "UulIEDM7Unvt2hXqeT6Q",
  database: "b9wqpy2f95es6axdgmat"
}*/
var dbCtrl = mysql.createConnection(configObj);
dbCtrl.connect(function (err) {
  if (err)
    console.log(err);
  else
    console.log("database connected...");
})

//------signup-dashboard(ajax)-------------

app.get("/ajax_signup", function (req, resp) {

  var e = req.query.email;
  var p = req.query.pwd;
  var t = req.query.type;
  //console.log(e);
  //console.log(p);
  dbCtrl.query("insert into users values(?,?,?)", [e, p, t], function (err) {
    if (err)
      resp.send(err);
    else
      resp.send("record saved successfuly!!!!");
  })
})
//----------login(using AJAx)----------
app.get("/JSON_login", function (req, resp) {
  var e = req.query.email;
  var p = req.query.pwd;
  dbCtrl.query("select * from users where email=? and pwd=?", [e, p], function (err, result) {
    if (err)
      resp.send(err.toString());
    else {
      resp.send(result);
    }
  })
})
//===========open pitcher dshboard===========
app.get("/pitcher-dashboard", function (req, resp) {
  var path = process.cwd() + "/public/pitcher_dashboard.html";
  resp.sendFile(path);

})

//----------open pitcher profile pge-----------
app.get("/pitcher-profile-pge", function (req, resp) {
  var path = process.cwd() + "/public/pitcher_profile.html";
  resp.sendFile(path);

})
//--------PITCHER PROFILE signup button--------- (formaction is used on button click)
app.post("/signup_pitcher_profile", function (req, resp) {
  console.log(req);
  var e = req.body.email;
  var n = req.body.name;
  var c = req.body.contact;
  var a = req.body.address;
  var city = req.body.city;
  var comp = req.body.company;
  var s = req.body.site;
  var info = req.body.info;

  var picNameid = req.files.idpic.name;

  var des = __dirname + "/public/uploads/" + picNameid;
  //saving file in folder
  req.files.idpic.mv(des, function (err) {
    if (err)
      console.log(err);
    else
      console.log("File Uploaded Successfully");
  });
  var picNamepp = req.files.profilepic.name;

  var des = __dirname + "/public/uploads/" + picNamepp;
  //saving file in folder
  req.files.profilepic.mv(des, function (err) {
    if (err)
      console.log(err);
    else
      console.log("File Uploaded Successfully");
  });
  var ary = [e, n, c, a, city, comp, s, picNameid, picNamepp, info];
  dbCtrl.query("insert into profile_pitcher values(?,?,?,?,?,?,?,?,?,?)", ary, function (err) {
    if (err)
      resp.send(err);
    else
      resp.send("record saved successfuly!!!!");
  })
})
//------Pitcher profile fetch details--------------
app.get("/fetch_pitcher_profile", function (req, resp) {
  var e = req.query.email;
  dbCtrl.query("select * from profile_pitcher where emailed=?", [e], function (err, result) {
    if (err)
      resp.send(err);
    else
      resp.send(result);
  })
})
//-----------------pitcher profile update button-----------------
app.post("/update_pitcher_profile", function (req, resp) {
  console.log(req);
  var e = req.body.email;
  var n = req.body.name;
  var c = req.body.contact;
  var a = req.body.address;
  var city = req.body.city;
  var comp = req.body.company;
  var s = req.body.site;
  var info = req.body.info;

  var picNameid = req.files.idpic.name;

  var des = __dirname + "/public/uploads/" + picNameid;
  //saving file in folder
  req.files.idpic.mv(des, function (err) {
    if (err)
      console.log(err);
    else
      console.log("File Uploaded Successfully");
  });
  var picNamepp = req.files.profilepic.name;

  var des = __dirname + "/public/uploads/" + picNamepp;
  //saving file in folder
  req.files.profilepic.mv(des, function (err) {
    if (err)
      console.log(err);
    else
      console.log("File Uploaded Successfully");
  });
  var ary = [n, c, a, city, comp, s, picNameid, picNamepp, info, e];
  dbCtrl.query("update profile_pitcher set name=?,contact=?,address=?,city=?,company=?,site=?,idpic=?,profilepic=?,info=? where emailid=? ", ary, function (err) {
    if (err)
      resp.send(err);
    else
      resp.send("record updated successfuly!!!!");
  })
})
//-------------pitcher-update-password--------------
app.get("/upadte-pitcher-pwd", function (req, resp) {
console.log("aaggeee...");
  var e = req.query.email;
  var p = req.query.pwd;
  var n = req.query.newpwd;
  console.log(e);
  console.log(p);
  dbCtrl.query("update users set pwd=? where email=? and pwd=?", [n, e, p], function (err) {
    if (err)
      resp.send(err);
    else
      resp.send("record updated successfuly!!!!");
  })
})
//------------open pitcher idea page--------------
app.get("/pitcher-idea-pge", function (req, resp) {
  var path = process.cwd() + "/public/pitcher-idea.html";
  resp.sendFile(path);

})
//----------list pitcher idea-------------
app.post("/list_pitcher_idea",function(req,resp){
  var e = req.body.email;
  var c = req.body.category;
  var t = req.body.ititle;
  var w = req.body.work;
  var i = req.body.income;
  var f = req.body.fund;
  var yr = req.body.year;
  var inv = req.body.investment;
  var p = req.body.partner;
  var info = req.body.info;
  var ary=[e,c,t,w,i,f,yr,inv,p,info];

  dbCtrl.query("insert into ideas values(?,?,?,?,?,?,?,?,?,?)", ary, function (err) {
    if (err)
      resp.send(err);
    else
      resp.send("Idea Listed successfuly!!!!");
  })
})
//==========
app.get("/admin",function(req,resp)
{
    var path=process.cwd()+"/public/admin-panel.html";
    resp.sendFile(path);

})
//======ADMIN-PANEL-Fetch All Users=======================
app.get("/FetchAllUsers",function(req,resp){
  var e=req.query.email;
  dbCtrl.query("select * from users",[e],function(err,result){
    if(err)
    resp.send(err.toString());
    else{
      console.log(result);
      resp.send(result);
    }
  })
})
//------delete user----------
app.get("/delUser-admin",function(req,resp){
  var email=req.query.email;
  dbCtrl.query("delete from users where email=?",[email],function(err,result){
    if(err)
     resp.send(err);
    else{
      if(result.affectedRows==0)
       resp.send("invalid email..");
      else
       resp.send("record deleted..."); 
    } 
  })
})
//======ADMIN-PANEL-Fetch All Ideas=======================
app.get("/FetchAllIdeas",function(req,resp){
  var e=req.query.email;
  dbCtrl.query("select * from ideas",[e],function(err,result){
    if(err)
    resp.send(err.toString());
    else{
      console.log(result);
      resp.send(result);
    }
  })
})
//-----------delete idea----------
app.get("/delIdea-admin",function(req,resp){
  var email=req.query.email;
  dbCtrl.query("delete from ideas where email=?",[email],function(err,result){
    if(err)
     resp.send(err);
    else{
      if(result.affectedRows==0)
       resp.send("invalid email..");
      else
       resp.send("record deleted..."); 
    } 
  })
})
//=====open find pitcher page==========
app.get("/find-pitcher", function (req, resp) {
  var path = process.cwd() + "/public/find_pitcher.html";
  resp.sendFile(path);

})
//=========Find Pitcher (Categories)===========
app.get("/fetchCategory",function(req,resp){

  dbCtrl.query("select distinct category from ideas",function(err,result){
      if(err)
          resp.send(err);
      else{
          console.log(result);
          resp.send(result);
      }
  })
})
//=======find pitcher(pitcher details)=========
app.get("/pitcherDetails",function(req,resp){
  var e=req.query.emailed;
  dbCtrl.query("select * from profile_pitcher where emailed=?",e,function(err,result){
    if(err)
     resp.send(err);
    else{ 
     console.log(result);
     resp.send(result);
    }
  })
})
//=======idea deatails=======
app.get("/IdeaDetails",function(req,resp){
  var t=req.query.title;
  dbCtrl.query("select * from ideas where title=?",t,function(err,result){
    if(err)
     resp.send(err);
    else{ 
     console.log(result);
     resp.send(result);
    }
  })
})
//========Find pitcher(all ideas)===========
app.get("/pitcher-info-all",function(req,resp){
  var ca=req.query.category;
  var ary=[ca];
  console.log(ca);
  dbCtrl.query("select * from ideas where category=?",ary,function(err,result){
    if(err)
     resp.send(err);
    else{ 
     console.log(result);
     resp.send(result);
    }
  })
})
