var exp=require('express')
var mysql=require('mysql2')
var bp=require('body-parser')
var app=exp();

app.use(exp.static('resources'))
app.use(bp.urlencoded({extended:false}))

var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"dac"
})

conn.connect(function(err){
    if(!err)
        console.log("db connected")
    else
        console.log("db connection failed")
})

app.listen(9000,function(){
    console.log("Server started")
})

app.get('/info',function(req,res){
    res.sendFile(__dirname+"/json_ajax.html")
})

app.post('/getemps',function(req,res){
    var userid=req.body.user;
    console.log(userid);
    conn.query("select * from login where userid = "+userid,function(err,result){
        if(!err)
        {
            console.log(result);
            res.send(JSON.stringify(result));
        }
    }) 
})

