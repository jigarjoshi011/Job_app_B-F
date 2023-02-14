
const express = require('express')
// import bodyParser from 'body-parser';
const bodyParser = require('body-parser')

// const connectDB = require('./conn/connection')
const e = require('express');
const conn = require('./connection/connectDB');


PORT = 5005;

// conn();

const app = express();



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

let relationship_menu;
let State_menu;
let Langs;
let Tech;
let Dept;
let Loc;

app.get('/all', (req, res) => {
  
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=1;`,(err,result)=>{
    if(err) return err.message
    else{
     relationship_menu = result
    }
  })

  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=2;`,(err,result)=>{
    if(err) return err.message
    else{
      State_menu =result
    }
  })
  conn.query(`SELECT course FROM Job_application.Academic;`,(err,result)=>{
    if(err) return err.message
    else{
      Course =result
    }
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=3;`,(err,result)=>{
    if(err) return err.message
    else{
      Langs =result
      console.log(Langs);
    }
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=4;`,(err,result)=>{
    if(err) return err.message
    else{
      Tech =result
      console.log(Tech);
    }
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=5;`,(err,result)=>{
    if(err) return err.message
    else{
      Dept =result
      console.log(Dept);
    }
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=6;`,(err,result)=>{
    if(err) return err.message
    else{
      Loc =result
      console.log(Loc);
    }
  })

  res.render('firstCompo',{State_menu:State_menu, relationship_menu:relationship_menu,Course:Course,Langauges:Langs,Tech:Tech,Dept:Dept,Loc:Loc})

})





app.post('/all',(req,res)=>{


  var alldata = req.body
  console.log(alldata);

})


app.listen(PORT, console.log(`Server start on port ${PORT}`));
