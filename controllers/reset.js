var express = require('express');
var flash = require('flash');
var router =  express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');
const { route } = require('./signup');
var db = require.main.require('./models/db_controller')

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// router/get('/', function(req,res) {
//     res.render('resetpassword.ejs')
// })

router.post('/', function(req,res) {
    var email = req.body.email;
    db.findOne(email, function(err, resultone){
        if(!resultone){
            console.log("Mail does not exist")
            res.send('mail does not exist')
        }
        var id = resultone[0].id;
        var email = resultone[0].email;
        var token = randomToken(6);
        db.temp(id,email, token, function(err, resulttwo){
            var output = `<p> Dear user, </p>
            <p> You are receiving this email because 
            you requested  a new password
            </p>
            <ul>
            <li> User Id: `+id+` </li>
            <li> Token: `+token+` </li>

            </ul>
            `
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: "victoribeojo8@gmail.com",
                    pass:"tjhdefqtnllqsqqm",
                }
            });

            var mailOptions = {
                from: "HMS Team",
                subject: 'Password Reset',
                to:email,
                html: output,
            }

            transporter.sendMail(mailOptions, function(err,info){
                if(err){ 
                 return console.log(err)
            }else{
                console.log(info)
                 }
            })
        })
    })
    res.send("A token has been sent to your email address")
})



module.exports = router; 
