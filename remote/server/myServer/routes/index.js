var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* POST home page */ 
router.post('/', function(req, res, next) {
    console.log('post');
    // res.json({name: 'syc', value: '1231231'});
    res.send('post request');
  });
//ceshi
var _mysql = require('mysql');
var mysql = _mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password: 'wangying1001',
    port:'3306',
    database:'testdb',
});
mysql.connect(function(err){
    if(err){
        console.log(err)
        console.log("连接失败了")
        return
    }
    console.log("连接成功了")
})
//登录
router.get('/mySystem/userinfo_login',(req,res) => {
    var Json = req.query;
    // console.log(Json)
    
    var _sql = "SELECT * FROM userinfo Where "+"user_name='"+Json.user_name+"'AND password='"+Json.password+"'";
    // console.log(_sql)
    mysql.query(_sql,function(err,rows){
        var data = {

        }
        if(err){
            console.log(err)
            return
        }
        if(rows.length == 0){
            data={
                errcode: 100001,
                errmsg:"用户名或密码错误"
            }
        }else{
            data={
                errcode:0,
                data:rows
            }
            // data.data[0].password="******";
        }
        res.send(data)
    }) 
})
//获取所有教师信息
router.get('/mySystem/userinfo_alluser',(req,res) => {
    var _sql = "SELECT * FROM userinfo";
    // console.log(_sql)
    mysql.query(_sql,function(err,rows){
        var data = {

        }
        if(err){
            console.log(err)
            return
        }else{
            data={
                errcode:0,
                data:rows
            }
        }
        res.send(data)
    }) 
})
//获取所有教师权限信息
router.get('/mySystem/all_access',(req,res) => {
    var _sql = "SELECT * FROM teachersub";
    // console.log(_sql)
    mysql.query(_sql,function(err,rows){
        var data = {

        }
        if(err){
            console.log(err)
            return
        }else{
            data={
                errcode:0,
                data:rows
            }
            // console.log(data)
        }
        res.send(data)
    }) 
})
//添加教师
router.post('/mySystem/userinfo_addUser',(req,res) => {
    var userInfo = req.body;
    var sql1 = "SELECT * FROM userinfo Where "+"user_name='"+userInfo.name +"'";     
    // console.log(sql1)
    mysql.query(sql1,function(err,rows){
        var data = {};
        if(err){
            console.log(err)
            return
        }else if(rows.length>0){
            data={
                errcode:100001,
                data:{
                    errorMsg:"用户名已存在，请更换用户名后重新添加",
                }
            }
            res.send(data);
        }else{
            var sql2 = "INSERT INTO userinfo (user_name,age,sex,level,phone) VALUES ('"+userInfo.name+"','"+userInfo.age+"','"+userInfo.sex+"','"+userInfo.admin+"','"+userInfo.phone+"')";
            // console.log(sql2)
            mysql.query(sql2,function(err,rows){
                // console.log(rows)
                if(err){
                    console.log(err)
                    data={
                        errcode:100002,
                        data:{
                            errorMsg:"查询失败",
                        }
                    }
                    res.send(data);
                    return
                }else{
                    var  sql4 = "INSERT INTO teachersub (teacher_name,subject) VALUES ('"+userInfo.name+"','"+userInfo.access+"')";
                    // console.log(sql4)
                    mysql.query(sql4,function(err,rows){
                        var  sql3 = "SELECT * FROM userinfo";
                        mysql.query(sql3,function(err,rows){
                            data = {
                                errcode:0,
                                data:rows
                            }
                            res.send(data);
                        })
                    })
                }
            })
        }
    }) 
})
//编辑教师
router.post('/mySystem/userinfo_editUser',(req,res) => {
    var userInfo = req.body;
    var sql1 = "UPDATE userinfo SET "+"user_name='"+userInfo.name +"',age='"+userInfo.age+"',phone='"+userInfo.phone+"',level='"+userInfo.admin+"',sex='"+userInfo.sex+"' WHERE "+ "user_id='"+userInfo.user_id +"'";      
    // console.log(sql1)
    mysql.query(sql1,function(err,rows){
        var data = {};
        if(err){
            console.log(err)
            return
        }else{
            var sql3 = "UPDATE teachersub SET "+"subject= '"+userInfo.access +"' WHERE  "+ "teacher_name='"+userInfo.name +"'";  
            // console.log(sql3)
            mysql.query(sql3,function(err,rows){
                var  sql2 = "SELECT * FROM userinfo";
                mysql.query(sql2,function(err,rows){
                    data = {
                        errcode:0,
                        data:rows
                    }
                    res.send(data);
                })
            })
            
        }
    }) 
})

//修改个人信息
router.post('/mySystem/userinfo_myInfo',(req,res) => {
    var userInfo = req.body;
    // console.log(userInfo)
    var sql1 = "UPDATE userinfo SET "+"user_name='"+userInfo.name +"',age='"+userInfo.age+"',phone='"+userInfo.phone+"',password='"+userInfo.password+"',sex='"+userInfo.sex+"' WHERE "+ "user_id='"+userInfo.user_id +"'";      
    console.log(sql1)
    mysql.query(sql1,function(err,rows){
        var data = {};
        if(err){
            console.log(err)
            return
        }else{
            var  sql2 = "SELECT * FROM userinfo WHERE"+" user_id='"+userInfo.user_id +"'"; 
            console.log(sql2)
            mysql.query(sql2,function(err,rows){
                data = {
                    errcode:0,
                    data:rows
                }
                res.send(data);
            })
        }
    }) 
})
//删除教师
router.get('/mySystem/userinfo_delUser',(req,res) => {
    var userId = req.query.user_id; 
    var sql1 = "DELETE FROM userinfo WHERE "+"user_id='"+userId +"'";
    // console.log(sql1)
    mysql.query(sql1,function(err,rows){
        var data = {

        }
        if(err){
            console.log(err)
            return
        }else{
            var  sql2 = "SELECT * FROM userinfo";
            mysql.query(sql2,function(err,rows){
                data = {
                    errcode:0,
                    data:rows
                }
                res.send(data);
            })
        }
    }) 
})
//获取学科
router.get('/mySystem/getSubject',(req,res) => {
    var user_name =req.query.user_name;
    var _sql = "SELECT * FROM teachersub WHERE teacher_name ='"+user_name+"'";
    console.log(_sql)
    mysql.query(_sql,function(err,rows){console.log(rows)
        var data = {

        }
        if(err){
            console.log(err)
            return
        }else{
            data={
                errcode:0,
                data:rows[0].subject.split(",")
            }
        }
        res.send(data)
    }) 
})
//获取题目信息
router.get('/mySystem/getQues',(req,res) => {
    var subject =req.query.subject;
    var _sql = "SELECT * FROM quesinfo WHERE subject ='"+subject+"'";
    // console.log(_sql)
    mysql.query(_sql,function(err,rows){
        var data = {

        }
        if(err){
            console.log(err)
            return
        }else{
            for(var j=0;j<rows.length;j++){
                if(rows[j].answerOptionList){
                    rows[j].answerOptionList=rows[j].answerOptionList.split(";");
                }
            }
            data={
                errcode:0,
                data:rows
            }
        }
        res.send(data)
    }) 
})
//添加题目
router.post('/mySystem/addQues',(req,res) => {
    var quesInfo = req.body;
    var sql2 = "INSERT INTO quesinfo (content,answer,analysis,subject,grade,type,answerOptionList) VALUES ('"+quesInfo.content+"','"+quesInfo.answer+"','"+quesInfo.analysis+"','"+quesInfo.subject+"','"+quesInfo.grade+"','"+quesInfo.type+"','"+quesInfo.answerOptionList+"')";
    // console.log(sql2)        
    mysql.query(sql2,function(err,rows){
        if(err){
            // console.log(err)
            data={
                errcode:100002,
                data:{
                    errorMsg:"插入数据失败",
                }
            }
            res.send(data);
            return
        }else{
            var  sql3 = "SELECT * FROM quesinfo WHERE subject ='"+quesInfo.subject+"'";
            mysql.query(sql3,function(err,rows){
                for(var j=0;j<rows.length;j++){
                    if(rows[j].answerOptionList){
                        rows[j].answerOptionList=rows[j].answerOptionList.split(";");
                    }
                }
                data = {
                    errcode:0,
                    data:rows
                }
            //    console.log(rows);
                res.send(data);
            })
        }
    })
})

//修改题目
router.post('/mySystem/editQues',(req,res) => {
    var quesInfo = req.body;
    // console.log(quesInfo)
    var sql1 = "UPDATE quesInfo SET "+"content='"+quesInfo.content +"',answer='"+quesInfo.answer+"',analysis='"+quesInfo.analysis+"',subject='"+quesInfo.subject+"',grade='"+quesInfo.grade+"',type='"+quesInfo.type+"',answerOptionList='"+quesInfo.answerOptionList+"' WHERE "+ "ques_id='"+quesInfo.ques_id +"'";      
    console.log(sql1)
    mysql.query(sql1,function(err,rows){
        var data = {};
        if(err){
            // console.log(err)
            return
        }else{
            var  sql3 = "SELECT * FROM quesinfo WHERE subject ='"+quesInfo.subject+"'";
            mysql.query(sql3,function(err,rows){
                for(var j=0;j<rows.length;j++){
                    if(rows[j].answerOptionList){
                        rows[j].answerOptionList=rows[j].answerOptionList.split(";");
                    }
                }
                data = {
                    errcode:0,
                    data:rows
                }
            //    console.log(rows);
                res.send(data);
            })
        }
    }) 
})
//删除题目
router.get('/mySystem/delQues',(req,res) => {
    var quesInfo = req.query; 
    var sql1 = "DELETE FROM quesInfo WHERE "+"ques_id='"+quesInfo.ques_id +"'";
    console.log(sql1)
    mysql.query(sql1,function(err,rows){
        var data = {

        }
        if(err){
            console.log(err)
            return
        }else{
            var  sql3 = "SELECT * FROM quesinfo WHERE subject ='"+quesInfo.subject+"'";
            mysql.query(sql3,function(err,rows){
                for(var j=0;j<rows.length;j++){
                    if(rows[j].answerOptionList){
                        rows[j].answerOptionList=rows[j].answerOptionList.split(";");
                    }
                }
                data = {
                    errcode:0,
                    data:rows
                }
                res.send(data);
            })
        }
    }) 
})


//获取试卷信息
router.get('/mySystem/getAllTests',(req,res) => {
    var subject =req.query.subject;
    var _sql = "SELECT * FROM testInfo";
    // console.log(_sql)
    mysql.query(_sql,function(err,rows){
        var data = {

        }
        if(err){
            console.log(err)
            return
        }else{
            for(var j=0;j<rows.length;j++){
                if(rows[j].ques_list){
                    rows[j].ques_list=rows[j].ques_list.split(";");
                }
            }
            console.log(rows)
            data={
                errcode:0,
                data:rows
            }
        }
        res.send(data)
    }) 
})


// mysql.end(function(err){
//     if(err){
//         return;
//     }
//     console.log("close succeed")
// })
//ceshi



module.exports = router;
