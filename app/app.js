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
var sweetarlert = require('sweetalert2')//to give a customized alert
var bodyParser = require('body-parser');
const http = require('http');
var db = require('../models/db_controller')
var signup = require('../controllers/signup');
var login = require('../controllers/login');
var verify = require('../controllers/verify');
var reset = require('../controllers/reset');
var doctors = require('../controllers/doc_controller');
var employee  = require('../controllers/employee');
var appointment  = require('../controllers/appointment.js');
var store = require('../controllers/store');
var refresh_token = require('../controllers/refreshtoken')
var reciept = require('../controllers/reciept')
var complain = require('../controllers/complain')
var app = express();

app.set('view engine','ejs');
const server = http.createServer(app);
 
app.use(express.static('./public'));//consist of the .html images, 
app.use(bodyParser.urlencoded({extended:true}));// to open it 
app.use(bodyParser.json());
app.use(cookie());
const PORT = process.env.Port || 3306 //300
//if port is localhost let it run on port 3000
server.listen(PORT, ()=> console.log(`server runing on port ${PORT}`))

//> require('crypto').randomBytes(64).toString('hex')


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



