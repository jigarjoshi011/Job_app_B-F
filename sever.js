
const express = require('express')
// import bodyParser from 'body-parser';
const bodyParser = require('body-parser')

// const connectDB = require('./conn/conn')
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
let Course1

app.get('/all', (req, res) => {

  conn.query(`select * from state_master`,(err,res)=>{
    if(err) return console.log(err.message);
    else{
      State_menu=res;
      console.log(State_menu);
    }
  })


  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=1;`, (err, result) => {
    if (err) return err.message
    else {
      relationship_menu = result
    }
  })

  // conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=2;`, (err, result) => {
  //   if (err) return err.message
  //   else {
  //     State_menu = result
  //   }
  // })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=7`, (err, result) => {
    if (err) return err.message
    else {
      Course1 = result
      // console.log(Course1);
    }
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=3;`, (err, result) => {
    if (err) return err.message
    else {
      Langs = result
      // console.log(Langs);
    }
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=4;`, (err, result) => {
    if (err) return err.message
    else {
      Tech = result
      // console.log(Tech);
    }
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=5;`, (err, result) => {
    if (err) return err.message
    else {
      Dept = result
      // console.log(Dept);
    }
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=6;`, (err, result) => {
    if (err) return err.message
    else {
      Loc = result
      // console.log(Loc);
      res.render('firstCompo', { State_menu: State_menu, relationship_menu: relationship_menu, Course: Course1, Langauges: Langs, Tech: Tech, Dept: Dept, Loc: Loc })
    }
  })

})

function allpost() {

  app.post('/all', (req, res) => {
    let id;

    var alldata = req.body
    // console.log(alldata);

    const { fname, lname, Designation, Address, pAddress, Email, phnumber, City, gender, Relationship, State, dob, Zipcode, } = req.body
    console.log(fname, lname, Designation, Address, pAddress, Email, phnumber, City, gender, Relationship, State, dob, Zipcode);

    let BIquery = `Insert into Job_application.personal_info (first_name,last_name,designation,contact_no,address,address_2,email,gender,city,dob,state,relationship,Zipcode,created_at) values ('${fname}','${lname}','${Designation}',${phnumber},'${Address}','${pAddress}','${Email}','${gender}','${City}','${dob}','${State}','${Relationship}','${Zipcode}',NOW())`



    // INSERT BASIC INFORMATION
    conn.query(BIquery, (err, result) => {
      if (err) return console.log(err.message);
      else {

        console.log(result, "Inserted Succesfully");



        id = result.insertId
        console.log(id);

        //INSERT INTO EDUCATION_DETAILS
        const { Course, institution, Percentage, Passing_Year } = req.body
        console.log(Course, institution, Percentage, Passing_Year);


        if (typeof (Course, institution, Percentage, Passing_Year) == "string") {
          let EDdetails = `Insert into Job_application.Academic (personal_id,course,board,passing_year,percentage) values('${id}','${Course}', '${institution}',${Percentage},${Passing_Year});`

          conn.query(EDdetails, (err, result) => {
            if (err) return console.log(err.message);
            else {

              console.log(result, "Inserted Succesfully");
            }

          })
        }
        else {
          for (let i = 0; i < Course.length; i++) {
            console.log(Course[i], institution[i], Percentage[i], Passing_Year[i]);
            let EDdetail = `Insert into Job_application.Academic (personal_id,course,board,passing_year,percentage) values('${id}','${Course[i]}', '${institution[i]}',${Percentage[i]},${Passing_Year[i]});`

            conn.query(EDdetail, (err, result) => {
              if (err) return console.log(err.message);
              else {

                console.log(result, "Inserted Succesfully");
              }

            })

          }
        }

        // //FINAL FOR LANGAUGES
        conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=3;`, (err, result) => {
          var query_lan;
          console.log(result);
          for (let i = 0; i < result.length; i++) {

            // console.log(req.body);
            var vj = req.body[result[i].option_value];
            // console.log(vj);
            var r = req.body[result[i].option_value + "r"];
            var w = req.body[result[i].option_value + "w"];
            var s = req.body[result[i].option_value + "s"];
            if (typeof (r) == "undefined") r = "0";
            if (typeof (w) == "undefined") w = "0";
            if (typeof (s) == "undefined") s = "0";

            if (typeof (vj) == "string") {
              query_lan = `insert into Job_application.Languages_Known (personal_id,language_name,read_lang,write_lang,speak) values(${id},'${vj}','${r}','${w}','${s}');`
              conn.query(query_lan, (err, result) => {
                if (err) console.log(err.message);
                else {
                  console.log(result, "Inserted Technology");
                }
              })
              console.log(query_lan);
            }
          }
        })



        // FINAL FOR TECHNOLOGOIES
        conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=4;`, (err, result) => {
          console.log(result);
          for (let i = 0; i < result.length; i++) {
            var tech = req.body[result[i].option_value]
            var a = req.body[result[i].option_value + 'a']

            console.log(tech);
            console.log(a);


            if (typeof (tech) == "string") {
              var query_tech = `insert into Job_application.Technologies (personal_id,technology,profiency) values ('${id}','${tech}','${a}')`
              console.log(query_tech);

              conn.query(query_tech, (err, result) => {
                if (err) console.log(err.message);
                else {
                  console.log(result, "Inserted Technologoy successfully");
                }
              })
            }
          }

        })
        //FINAL FOR REFERENCE

        const { ref_name1, ref_email1, ref_name2, ref_email2, Relation1, Relation2 } = req.body;

        var my_ref1 = `Insert into Job_application.Reference_Tab (personal_id,name,email,relation) values ('${id}','${ref_name1}','${ref_email1}','${Relation1}')`
        conn.query(my_ref1, (err, result) => {
          if (err) return console.log(err.message);
          console.log(result);
        })
        var my_ref2 = `Insert into Job_application.Reference_Tab (personal_id,name,email,relation) values ('${id}','${ref_name2}','${ref_email2}','${Relation2}')`
        conn.query(my_ref2, (err, result) => {
          if (err) return console.log(err.message);
          console.log(result);
        })




        //Now Peference Starts


        let { loc_name, Current_CTC, Expacted_CTC, Department } = req.body
        console.log(loc_name, Current_CTC, Expacted_CTC, Department);
        let loca = "";
        loc_name.forEach(loc => {

          loca += loc + " "


        });
        console.log(loca);

        let insert_prefs = `insert into Job_application.CTC (personal_id,Current_CTC, Expected_CTC,Preferred,Department) values (${id},${Current_CTC},${Expacted_CTC},'${loca}','${Department}')`
        console.log(insert_prefs);
        conn.query(insert_prefs, (err, result) => {
          if (err) return console.log(result);
          else {
            console.log(result, "Inserted Succesfully into CTC");
          }
        })


      }

      //work Exp
      const { company, Designation_name, start_date, end_date } = req.body
      console.log(company, Designation_name, start_date, end_date);

      if (typeof (company, Designation_name, start_date, end_date) == "string") {
        let EDdetails = `Insert into Job_application.Expirence (personal_id,company_name,Designation_name,start_date,end_date) values('${id}','${company}', '${Designation_name}',${start_date},${end_date});`

        conn.query(EDdetails, (err, result) => {
          if (err) return console.log(err.message);
          else {

            console.log(result, "Inserted Succesfully");
          }

        })
      }
      else {
        for (let i = 0; i < company.length; i++) {
          console.log(company[i], Designation_name[i], start_date[i], end_date[i]);
          let EDdetail = `Insert into Job_application.Expirence (personal_id,company_name,Designation_name,start_date,end_date) values('${id}','${company[i]}', '${Designation_name[i]}',${start_date[i]},${end_date[i]});`

          conn.query(EDdetail, (err, result) => {
            if (err) return console.log(err.message);
            else {

              console.log(result, "Inserted Succesfully");
            }

          })

        }
      }


      res.render("insert_msg")

    })


  })


}


allpost();


let currStr;


//ALL RECORDS

app.get('/showall', (req, res) => {

  conn.query(`SELECT * FROM personal_info where isDelete='0' order by id desc `, (err, ans) => {
    if (err) return console.log(err.message);
   
    res.render("showall", { ans, currStr: "" });
  })
})

let allrecords = 0;
let limit = 5
var offset = 0;



//PAGINATION
app.get('/showall/list', (req, res) => {

  conn.query(`select count(*) as total_rec from personal_info`, (err, result1) => {

    allrecords = result1[0].total_rec

})
  let page = req.query.page || 1;
  offset = (page - 1) * limit;

  conn.query(`SELECT * FROM personal_info where isDelete='0' order by id desc limit ${offset}, ${limit}`, (err, ans) => {
    if (err) return console.log(err.message);
    allrecords = Math.ceil(allrecords / limit)+1;
    res.json({page:page,data:ans})
    // res.render("things", { ans, currStr: "" ,allrecords});
  })
})


app.get('/showall/things', (req, res) => {

  conn.query(`select count(*) as total_rec from personal_info`, (err, result1) => {

    allrecords = result1[0].total_rec

})
  let page = req.query.page || 1;
  offset = (page - 1) * limit;

  conn.query(`SELECT * FROM personal_info where isDelete='0' order by id desc limit ${offset}, ${limit}`, (err, ans) => {
    if (err) return console.log(err.message);
    allrecords = Math.ceil(allrecords / limit);
    // res.json({page:allrecords,data:ans})
    // console.log(allrecords);
    res.render("things", { ans, currStr: "" ,allrecords});
  })
})


//SEARCHING RECORDS
app.post('/find', (req, res) => {
  let currStr = req.body.search_query
  let name = "";
  let arr = ['^', '$', '&'];


  console.log(currStr);

  var count = 0;
  for (let i = 0; i < currStr.length; i++) {
    if (arr.includes(currStr[i])) {
      name += " " + currStr[i];
      count++;
    }
    else {
      name += currStr[i];
    }
  }




  let currname = name.split(" ")

  let queryStr = ``;
  currname.forEach(name => {
    if (name[0] == '^') {
      count--;

      if (count)
        queryStr += `first_name LIKE '${name.slice(1)}%' AND `
      else {
        queryStr += `first_name LIKE '${name.slice(1)}%'`
      }
    }



    if (name[0] == '$') {
      count--
      if (count) {
        queryStr += `last_name Like '${name.slice(1)}%' AND `

      }
      else {
        queryStr += `last_lame Like '${name.slice(1)}%' `
      }

    }

    if (name[0] == '&') {

      count--;
      if (count) {
        queryStr += `city Like '${name.slice(1)}%' AND `
      }
      else {
        queryStr += `city Like '${name.slice(1)}%'`
      }

    }


  })
  console.log(currStr);

  conn.query(`select * from personal_info where ${queryStr}`, (err, result) => {
    if (err) return err.message
    else {
      res.render('showallSearch', { data: result, currStr })
    }
  })



})





app.get('/dataDetails/:id', (req, res) => {
  let get_id = req.params.id;
  let personal_data, education_data, experience_data, language_data, technology_data, reference_data, CTC_data;
  let personal_query = `SELECT * FROM personal_info where id = ${get_id}`;
  conn.query(personal_query, (err, ans) => {
    personal_data = ans;
  })
  let education_query = `SELECT * FROM Academic where personal_id = ${get_id}`;
  conn.query(education_query, (err, ans) => {
    if (err) return console.log(err.message);
    education_data = ans;

  })
  let experience_query = `SELECT * FROM Experience where personal_id = ${get_id}`;
  conn.query(experience_query, (err, ans) => {
    if (err) return console.log(err.message);
    experience_data = ans;

  })
  let language_query = `SELECT * FROM Languages_Known where personal_id = ${get_id}`;
  conn.query(language_query, (err, ans) => {
    if (err) return console.log(err.message);
    language_data = ans;

  })
  let technology_query = `SELECT * FROM Technologies where personal_id = ${get_id}`;
  conn.query(technology_query, (err, ans) => {
    if (err) return console.log(err.message);
    technology_data = ans;

  })

  let reference_query = `SELECT * FROM Reference_Tab where personal_id = ${get_id}`;
  conn.query(reference_query, (err, ans) => {
    if (err) return console.log(err.message);
    reference_data = ans;
  })

  let preference_query = `SELECT * FROM CTC where personal_id = ${get_id}`;
  conn.query(preference_query, (err, ans) => {
    if (err) return console.log(err.message);
    CTC_data = ans;
    res.render("dataDetails", { personal_data, education_data, experience_data, language_data, technology_data, reference_data, CTC_data });

  })
})

var cities;
app.get('/all/state/:id',(req,res)=>{
  let id = req.params.id;
  cities_query =`select * from city_master where state_id=${id}`
  conn.query(cities_query,(err,result)=>{
    if(err) console.log(err.message); 
    return res.json({result})
  })
})
app.get('/all/delete/:id',(req,res)=>{
  let id = req.params.id;
  delete_query =`update personal_info set isDelete='1' where id=${id}`
  conn.query(delete_query,(err,result)=>{
    if(err) console.log(err.message); 
  })
  return res.json({message: "got ans"})
})
app.get('/all/deleteall/:id',(req,res)=>{
  let id = req.params.id;
  var s_id=id.split(",")
  // console.log(s_id);
  // console.log(id);
  // console.log(id);

  for(let i = 0 ; i<s_id.length;i++){
    // console.log(s_id[i]);
    let muldelete_query =`update personal_info set isDelete='1' where id=${s_id[i]}`
    conn.query(muldelete_query,(err,result)=>{
      if(err) console.log(err.message);
    })
  }
  // return res.json({result})
})



app.get('/all/archive',(req,res)=>{


    let archdelete_query =`select * from personal_info where isDelete='1'`
    conn.query(archdelete_query,(err,result)=>{
      if(err) console.log(err.message);
      let arch= result
      res.render("archive",{ans:arch})
    })

})


app.get('/all/restore/:id',(req,res)=>{
  let id = req.params.id;
  delete_query =`update personal_info set isDelete='0' where id=${id}`
  conn.query(delete_query,(err,result)=>{
    if(err) console.log(err.message); 
    var ans = result
    return res.json({message: ans})
  })
})



app.get('/all/restoreall/:id',(req,res)=>{
  let id = req.params.id;
  var s_id=id.split(",")
  // console.log(s_id);
  // console.log(id);
  // console.log(id);

  for(let i = 0 ; i<s_id.length;i++){
    // console.log(s_id[i]);
    let muldelete_query =`update personal_info set isDelete='0' where id=${s_id[i]}`
    conn.query(muldelete_query,(err,result)=>{
      if(err) console.log(err.message);
    })
  }
  // return res.json({result})
})


app.listen(PORT, console.log(`Server start on port ${PORT}`));


//EDITING FORM


app.get('/edit/:id',(req,res)=>{
  let get_id = req.params.id;
  let personal_data, education_data, experience_data, language_data, technology_data, reference_data, CTC_data;
  let personal_query = `SELECT * FROM personal_info where id = ${get_id}`;
  conn.query(personal_query, (err, ans) => {
    personal_data = ans;
    // console.log((personal_data[0].dob).toString())
    // console.log(personal_data[0].zipcode);
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=1;`, (err, result) => {
    if (err) return err.message
    else {
      relationship_menu = result
      // console.log(Course1);
    }
  })

  conn.query(`select * from state_master`,(err,res)=>{
    if(err) return console.log(err.message);
    else{
      State_menu=res;
      // console.log(State_menu);
    }
  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=7`, (err, result) => {
    if (err) return err.message
    else {
      Course1 = result
      // console.log(Course1);
    }
  })
  let education_query = `SELECT * FROM Academic where personal_id = ${get_id}`;
  conn.query(education_query, (err, ans) => {
    if (err) return console.log(err.message);
    education_data = ans;
    // console.log(education_data);

  })
  let experience_query = `SELECT * FROM Experience where personal_id = ${get_id}`;
  conn.query(experience_query, (err, ans) => {
    if (err) return console.log(err.message);
    experience_data = ans;

  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=3;`, (err, result) => {
    if (err) return err.message
    else {
      Langs = result
      console.log(Langs);
    }
  })
  let language_query = `SELECT * FROM Languages_Known where personal_id = ${get_id}`;
  conn.query(language_query, (err, ans) => {
    if (err) return console.log(err.message);
    language_data = ans;
    console.log(language_data);

  })
  conn.query(`SELECT option_value FROM Job_application.Options_Master where Option_id=4;`, (err, result) => {
    if (err) return err.message
    else {
      Tech = result
      // console.log(Tech);
    }
  })
  let technology_query = `SELECT * FROM Technologies where personal_id = ${get_id}`;
  conn.query(technology_query, (err, ans) => {
    if (err) return console.log(err.message);
    technology_data = ans;
    // console.log(technology_data);

  })

  let reference_query = `SELECT * FROM Reference_Tab where personal_id = ${get_id}`;
  conn.query(reference_query, (err, ans) => {
    if (err) return console.log(err.message);
    reference_data = ans;
  })

  let preference_query = `SELECT * FROM CTC where personal_id = ${get_id}`;
  conn.query(preference_query, (err, ans) => {
    if (err) return console.log(err.message);
    CTC_data = ans;
    res.render("edit", { personal_data, education_data, experience_data,Langauges:Langs,Tech, language_data, technology_data, reference_data, CTC_data ,relationship_menu,State_menu,Course1});

  })




})



//updating query ...


app.post('/update/:id',(req,res)=>{

})