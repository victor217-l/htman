require('dotenv').config()
var express = require('express');
var session = require('express-session');
var cookie = require('cookie-parser');
var path = require('path');
var ejs = require('ejs')//showcase data to the users
var multer = require('multer');// to save images to our database
var async = require('async');
var nodemailer = require('nodemailer');// to send massages when the user signs up
var crypto = require('crypto');
var expressValidator = require('express-validator');
var sweetalert = require('sweetalert2');
var jwt = require('jsonwebtoken')

var mysql = require('mysql');

var sweetarlert = require('sweetalert2')//to give a customized alert
var bodyParser = require('body-parser');
const http = require('http');
var db = require.main.require('./models/db_controller')
var signup = require('./controllers/signup');
var login = require('./controllers/login');
var verify = require('./controllers/verify');
var reset = require('./controllers/reset');
var doctors = require('./controllers/doc_controller');
var employee  = require('./controllers/employee');
var appointment  = require('./controllers/appointment.js');
var store = require('./controllers/store');
var refresh_token = require('./controllers/refreshtoken')
var reciept = require('./controllers/reciept')
var complain = require('./controllers/complain')
var app = express();
require('dotenv').config()

const {check, validationResult} = require('express-validator');


app.set('view engine','ejs');
const server = http.createServer(app);
 
app.use(express.static('./public'));//consist of the .html images, 
app.use(bodyParser.urlencoded({extended:true}));// to open it 
app.use(bodyParser.json());
app.use(cookie());
const PORT = process.env.Port || 3000//300
//if port is localhost let it run on port 3000
server.listen(PORT, () => console.log(`server runing on port ${PORT}`))

//> require('crypto').randomBytes(64).toString('hex')

app.get('/api', (req,res) => {
    res.send( "server");
})

function generateAccessToken(loginn)  {
    return jwt.sign(loginn, process.env.ACCESS_TOKEN_SECRET,)
}

// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'hmsystem'
//  })
 
 // router.use(session({
 //     secret: 'secret',
 //     resave: true,//save yser details, when user hasnt log out
 //     saveUninitialized: true 
 // }))


// app.post('/api/login' , [check('username').notEmpty().withMessage("username is reqired"),
// check('password').notEmpty().withMessage("Password is required") ],
// function(req, response) {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return response.status(422).json({errors: errors.array()});
//     }
//     var username = req.body.username;
//     var password = req.body.password;
//     console.log(username);

//     const loginn = {
//         name: username,
//         passwrod: password,
//     }

//     const accessToken = generateAccessToken(loginn);
//     const refreshToken = jwt.sign(loginn, process.env.ACCESS_TOKEN_SECRET,)

//     if (username && password) {
//         con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
//           if (error) {
//             console.error('Error executing the query:', error);
//             response.status(500).send('Internal Server Error');
//             return;
//           }
      
//           if (results.length > 0) {
//             var status = results[0].email_status;
//             if (status === 'not_verified') {
//               response.send('Please verify your email');
//             } else {
//               sweetalert.fire('Logged in');
//               response.status(200).json({ status: 200, accessToken: accessToken, msg: 'Login successful', refreshToken: refreshToken });
//             }
//           } else {
//             response.status(500).json({msg:'Incorrect username/password'});
//           }
         
//         });
//       } else {
//         response.status(500).json({msg:'Please enter your username and password'});
        
//       }
      

//     // if(username && password){
//     //     con.query('select * from users where username = ? and password = ? ', [username, password],
//     //     function(error, results, fielsds){
//     //         if (error) {
//     //             console.error('Error executing the query:', error);
//     //             response.status(500).send('Internal Server Error');
//     //             return
//     //         }
//     //         if(results.length>0){
//     //            // req.session.loggedin = true;
//     //             //req.session.username = username;
//     //             //response.cookie('username', username); 
//     //             var status = results[0].email_status
//     //             if(status=="not_verified"){
//     //               response.send("please verify your emai")
//     //             }else{
//     //                 sweetalert.fire('Logged in'); 
//     //                // response.status('200')
                
//     //                 response.status(200).json({ accessToken:accessToken , msg:"Login sucessful", refreshToken: refreshToken})
//     //                // response.redirect('/home'); 
//     //             }
//     //         }else{
//     //             response.send("incorrect Username/password");
//     //         }
//     //         response.end();  
//     //     })
//     // }else{
//     //     response.send("please enter your username and password")
//     //     response.end();  
//     // }
// }



// )


app.use('/signup',signup)
app.use('/login', login);
app.use('/verify', verify);
app.use('/reset', reset);
app.use('/doctor',doctors);
app.use('/employee', employee); 
app.use('/appointment', appointment);
app.use('/store', store);
app.use('/reciept',reciept);
app.use('/complain', complain);



