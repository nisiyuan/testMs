// var _mysql = require('mysql');
// var mysql = _mysql.createConnection({
//     host:'127.0.0.1',
//     user:'root',
//     password: 'wangying1001',
//     port:'3306',
//     database:'testdb',
// });
// var _sql = "SELECT * FROM userinfo Where user_id =100001"
// mysql.connect(function(err){
//     if(err){
//         console.log(err)
//         console.log("连接失败了")
//         return
//     }
//     console.log("连接成功了")
// })
// router.get('/mySystem/userinfo',(req,res) => {
//     var s = "user_id"+"100001";
//     mysql.query.apply(_sql,function(err,rows){
//         if(err){
//             console.log(err)
//             return
//         }
//         res.send(rows)
//     }) 
// })
// // mysql.query(_sql,function(err,rows){
// //     if(err){
// //         console.log("query"+err)
// //     }
// //     console.log("query succeed"+rows.toString());
// //     console.dir(rows)

// // });
// mysql.end(function(err){
//     if(err){
//         return;
//     }
//     console.log("close succeed")
// })