var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
//var sign = require('.')
var mysql = require('mysql');
var session = require('express-session');
var sweetalert = require('sweetalert2');
var jwt = require('jsonwebtoken')
require('dotenv').config()

const {check, validationResult} = require('express-validator');



var con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'hmsystem'
})

router.use(session({
    secret: 'secret',
    resave: true,//save yser details, when user hasnt log out
    saveUninitialized: true 
}))

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json());

let refreshTokens = []


router.post('/' , [check('username').notEmpty().withMessage("username is reqired"),
check('password').notEmpty().withMessage("Password is required") ],
function(req, response) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return response.status(422).json({errors: errors.array()});
    }
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);

    const loginn = {
        name: username,
        passwrod: password,
    }

    const accessToken = generateAccessToken(loginn);
    const refreshToken = jwt.sign(loginn, process.env.ACCESS_TOKEN_SECRET,)


    if(username && password){
        con.query('select * from users where username = ? and password = ? ', [username, password],
        function(eror, results, fielsds){
            if(results.length>0){
                req.session.loggedin = true;
                req.session.username = username;
                response.cookie('username', username); 
                var status = results[0].email_status
                if(status=="not_verified"){
                  response.send("please verify your email")
                }else{
                    sweetalert.fire('Logged in'); 
                   // response.status('200')
                    response.json({status:'200', accessToken:accessToken , msg:"Login sucessful", refreshToken: refreshToken})
                   // response.redirect('/home'); 
                }
            }else{
                response.send("incorrect Username/password");
            }
            response.end();  
        })
    }else{
        response.send("please enter your username and password")
        response.end();  
    }
}



)

function generateAccessToken(loginn)  {
    return jwt.sign(loginn, process.env.ACCESS_TOKEN_SECRET,)
}


router.post('/token', (req,res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, loginn ) => {
        const accessToken = generateAccessToken({ name: loginn.name})
        res.json({ accessToken: accessToken})
    })
})

module.exports = router;


