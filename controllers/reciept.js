var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var jwt = require('jsonwebtoken');
require('dotenv').config();


// router.get('*', function(res,req,next){
//     if(req.cookies['username'] == null){
//         res.redirect('/login')
//     }else{
//       next();
//     }
// })

router.get('/', authenticateToken, function(req, res){
    db.getAllemployee(function(err, result){
        if(err){
            res.status(500).json({msg : err.toString()})
        }else{
            res.json({msg: "all message", status:"200", employee:result})
        }
        //res.render('salary.ejs', {employee: result})
    })
});

router.get('/generateslip', function(req,res){
    var id = req.body.id;
    db.getEmpbyId(id, function(err, result){
        var name = result[0].name;
        var id = result[0].id;
        var email = result[0].email;
        var role = result[0].role;
        var salary = result[0].salary;
        var join_date = result[0].join_date;
        var contact = result[0].contact;
        res.json('payslip.ejs', {
            name:name, id:id, email:email, role:role, salary:salary, 
            join_date:join_date, contact:contact }) 

    })
})




module.exports = router;

function authenticateToken(res,req,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader &&  authHeader.split(' ')[1];
    if(token == null){
        return res.sendStatus(201) // unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(203) //forbidden
        }

    req.user = user;
    next()
    })
}