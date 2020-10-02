const express=require('express');

const path=require('path');

const body_parser=require('body-parser');

const mysql=require('mysql');


const db=mysql.createConnection({
    host   : 'localhost',
    user   : 'root',
    password :   '',
    database : 'bgpswles_add_medicine'
})

db.query("select * from vet_data ",function(err,row){
    console.log(row)
});

const app=express();

app.engine('html', require('ejs').renderFile);

app.use(body_parser.urlencoded())

app.use(express.static(path.join(__dirname,'frontend')))

app.post('/add_medicine',(req,res,next)=>{
    
    let sq="select "
    
    let sql="insert into vet_data SET ?";

    let msg;
    db.query(sql,req.body,function(err,result){
          if(err)
          {
             res.render(__dirname+"/frontend/add_medicine_form.html",{msg: "failed"})
          }
          else{
             res.render(__dirname+"/frontend/add_medicine_form.html",{msg: "success"})
          }
    });
    
    
})

app.use('/',(req,res,next)=>{

    res.sendFile(path.join(__dirname,'frontend','add_medicine_form.html'))
});



app.listen(8081)

