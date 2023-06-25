var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
//var sign = require('.')
var mysql = require('mysql');
//var session = require('express-session');
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

// router.use(session({
//     secret: 'secret',
//     resave: true,//save yser details, when user hasnt log out
//     saveUninitialized: true 
// }))

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json());

let refreshTokens = []


router.post('/' , [check('username').notEmpty().withMessage("username is reqired"),
check('password').notEmpty().withMessage("Password is required") ],
function(req, res) {
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

    if (username && password) {
        con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
          if (error) {
            console.error('Error executing the query:', error);
            res.status(500).send('Internal Server Error');
            return;
          }
      
          if (results.length > 0) {
            var status = results[0].email_status;
            if (status === 'not_verified') {
              res.status(500).json({msg:'Please verify your email'});
            } else {
              //sweetalert.fire('Logged in');
              res.status(200).json({ status: 200, accessToken: accessToken, msg: 'Login successful', refreshToken: refreshToken });
            }
          } else {
            res.status(500).json({msg:'Incorrect username/password'});
          }
          
        });
      } else {
        res.status(500).json({msg:'Please enter your username and password'});
       // response.end();
      }
      

    // if(username && password){
    //     con.query('select * from users where username = ? and password = ? ', [username, password],
    //     function(error, results, fielsds){
    //         if (error) {
    //             console.error('Error executing the query:', error);
    //             response.status(500).send('Internal Server Error');
    //             return
    //         }
    //         if(results.length>0){
    //            // req.session.loggedin = true;
    //             //req.session.username = username;
    //             //response.cookie('username', username); 
    //             var status = results[0].email_status
    //             if(status=="not_verified"){
    //               response.send("please verify your emai")
    //             }else{
    //                 sweetalert.fire('Logged in'); 
    //                // response.status('200')
                
    //                 response.status(200).json({ accessToken:accessToken , msg:"Login sucessful", refreshToken: refreshToken})
    //                // response.redirect('/home'); 
    //             }
    //         }else{
    //             response.send("incorrect Username/password");
    //         }
    //         response.end();  
    //     })
    // }else{
    //     response.send("please enter your username and password")
    //     response.end();  
    // }
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


