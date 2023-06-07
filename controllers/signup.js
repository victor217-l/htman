require('dotenv').config();
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
//var sign = require('.')
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var randomToken = require('random-token');
const {check, validationResult} = require('express-validator');
const { verify } = require('../models/db_controller');
const { default: authtoken } = require('../utility/autoken');
const multer = require('multer');


router.use(bodyParser.urlencoded({entended: true}));
router.use(bodyParser.json()); 

let refreshTokens = []



var storage =  multer.diskStorage({
    destination: function(req, file, cb){
         cb(null, "public/assets/images/upload_images")
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, file.originalname)

    }
});

var upload = multer({storage:storage});


var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets/images/upload_images")
    }, 
    filename: function(req, file, cb){
        console.log(file)
       cb(null, file.originalname)
    }
})

router.post('/' ,[check('username').notEmpty().withMessage("username is required"),
check('password').notEmpty().withMessage("password is required"),
check('email').notEmpty().withMessage("email is required"),
], function (req,res) {
    // res.setHeader('Access-Control-Allow-Origin', process.env.URL);
    // res.setHeader('Access-Control-Allow-Methods', 'POST');
    // res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Authorization, Accept');

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }

    
    var email_status = "not_verified";
    var email = req.body.email;
    var username = req.body.username;

    const singup = {
        name: username,
        emaill: email,
        email: email_status,
    }
   // const accessToken = generateAccessToken(singup)
    //const refreshtoken = jwt.sign(singup, process.env.REFRESH_TOKEN_SECRET)
      refreshTokens.push(refreshtoken) 
    
     db.signup(req.body.username,req.body.email,req.body.password,email_status,); 
    
     var token = randomToken(6);   
    db.verify(req.body.username,email,token)  
      
    db.getuserid(email, function(err, result){
        var id = result[0].id;
        var output = `<p> Dear ${username}, </p>
        <p> Thanks for sign up. Your verification id 
        and token is given below; </p> 
        <ui>
        <li> User ID: ${id}  </li>
        <li> Token: ${token} </li>
        </ul>
        <p>verify link : <a hreft = "http://localhost:3000/verify">Verify </a> </p>
        <p><b> This is automatically generated mail</b></p>

        `;

        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "victoribeojo8@gmail.com",
                pass:"tjhdefqtnllqsqqm",
            }
        });

        
        var mailOptions = {
           from: 'Hms@gmail.com',
           to:email,
           subject: 'Email verificarion',
           html: output
        };
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                return console.log(err);          
        }
        console.log(info);
        });
        
    
       // res.send("check your email for token to verify")
        res.json({status: "check your email to  verify", })
        
    })
    


});


function generateAccessToken(singup)  {
    return jwt.sign(singup, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
}


router.post('/token', (req,res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, singup ) => {
        const accessToken = generateAccessToken({ name: singup.name})
        res.json({ accessToken: accessToken})
    })
})







module.exports = router;