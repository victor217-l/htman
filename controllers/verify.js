var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
//var sign = require('.')
var mysql = require('mysql');


const {check, validationResult} = require('express-validator');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


// router.get('/', function(req,res){
//     res.render('verify.ejs')
// })

router.post('/', function(req, res){
    var id = req.body.id;
    var token = req.body.token;
    db.matchToken(id, token, function(err, result) {
        console.log(result)
        if(result.length>0){
            var email = result[0].email;
            var email_status = "verified";
            db.updateverify(email, email_status, function(err, result){
                res.send("Email verified");
            })
        }else{
            res.send('Token did not match')
        }
    })
})
//OddI3j27DwHlEzuom9Dw 
//b9c5llogjxf2oudkczw7
//OddI3j27DwHlEzuom9Dw
//ucgnt4bngpcioa5s


module.exports = router;
