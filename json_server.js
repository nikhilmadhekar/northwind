var exp=require('express')
var mysql=require('mysql2')
var bp=require('body-parser')

var app=exp();

app.use(exp.static('resources'))
app.use(bp.urlencoded({extended:false}))

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"dac"
})

con.connect(function(err){
    if(!err)
        console.log("db conected")
    else
        console.log("db not connected")
})

app.get('/form',function(req,res){
    res.sendFile(__dirname+"/dept_emp.html");
})

app.post('/getemps',function(req,res){
    //db query
    //json result
    var dno=req.body.deptno;
    console.log(dno);
    con.query("select * from emp where deptno = "+dno,function(err,result){
        if(!err)
        {
            console.log(result.length);
            res.send(JSON.stringify(result));
        }
    })
})

app.listen(9000,function(){
    console.log("Server started");
})