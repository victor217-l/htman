var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require.main.require('./models/db_controller');
var db_query = require('../models/db_model')
var jwt = require('jsonwebtoken');
require('dotenv').config();


// router.get('*', function(res,req,next){
//     if(req.cookies['username'] == null){
//         res.redirect('/login')
//     }else{
//       next();
//     }
// })

router.get('/',  authenticateToken, async function(req,res){

    let result = await db_query.getcomplain()

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg:"Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "all complains ", list:result.data})
    }

    // db.getcomplain( function(err, result) {
    //     if(err){
    //         res.status(500).json({msg: err.toString()})
    //     }else{
    //       res.json({msg: "all school", list:result})
    //     }
    // })
   // res.render('complain.ejs')
});

router.post('/', authenticateToken,  async function(req,res){
    var message = req.body.message;
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;

    let result = await db_query.postcomplain(message,name,email,subject);

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg:"Invalid credentials"})
    }else if (result.status == true){
        res.statusCode = 200;
        res.json({ms: "complain sent", list:result.data})
    }

    db.postcomplain(message, name, email, subject, function(err, result){
        if(err){
            res.status(500).json({msg:err.toString()})
        }else{
            res.json({status: "20", msg:"complain sen", list:result})
        }
       // res.redirect('back')
    })
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
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




module.exports =router;