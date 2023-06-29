var express = require('express');
var router = express.Router();
var db_query = require('../models/db_model')
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller')
var jwt = require('jsonwebtoken')




module.exports = router;

// router.get('*', function(req,res){
//     if(req.cookies['ussername']= null){
//         res.redirect('/login')
//     }else{
//         next();
//     }
// })

router.get('/', authenticateToken, async function(req,res){

    let result = await db_query.getallappoint();

    if(result.status == false){
        res.statusCode == 500;
        res.json({msg: "Invalid credentials"})
    }else if(result.status == true){
        res.statusCode == 200;
        res.json({msg: "all appointments", list: result.data})
    }

    // db.getallappointment(function(err, result){
    //     console.log(result);
    //     if(err){
    //         res.status(500)
    //     }else{
    //         res.status(200).json({
    //             list:result })
    //     }
    //     res.render('appointment.ejs', {list: result})
    // })
})

router.get('/add_appointment', function(req,res){
    res.render('add_appointment.ejs');
})

router.post('/add_appointment', authenticateToken, function(req,res){
    db.add_appointment(req.body.p_name, req.body.department, req.body.d_name, 
       req.body.date, req.body.time,  req.body.email,req.body.phone,
       function(err, result){
        if(err){
            res.status(500).json({msg: err.toString()})
        }else{
            res.status(200).json({msg: "new appointment", list:result})
        }
        
        // req.redirect('/appointment')
       }
    )
})

router.get('/edit_appointment',  authenticateToken, function(res, res){
    var id = req.body.id;
    db.getallappointmentbyid(id, function(err,result){
      console.log(result);
      if(err){
        res.status(500).json({msg: err.toString()})
      }else{
        res.json({msg: ""})
      }
     // res.render('edit_appointment.ejs', {list: result})
    })
}) 

router.post('/edit_appointment', authenticateToken,  function(req,res){
    var id = req.body.id;
    db.editappointment(req.body.p_name, req.body.department, req.body.d_name, 
       req.body.date, req.body.time,  req.body.email,req.body.phone,id,
       function(err, result){
        if(err){
            res.status(500).json({msg: err.toString()})
        }else{
          res.json({msg: " appointment edited",})
        }
        // req.redirect('/appointment')
       }
    )
})

router.get('/delete_appointment', authenticateToken, function(req,res){
    var id = req.body.id; 
    db.getallappointmentbyid(id, function(err, result){
        console.log(result)
        if(err){
           res.status(500).json({msg: err.toString()}) 
        }else{
            res.render('delete_appointment.ejs',{list: result})
        }
       
    })
})

router.post('/delete_appointment', authenticateToken, function(req,res){
    var id = req.body.id;
    db.deleteappointment(id, function(err, result){
        if(err){
            res.status(500).json({msg: err.toString()})
        }else{
            res.json({msg: "it has beem deleted"})
        }
        //res.redirect('/appointment')
    })
})




function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401); // Unauthorized
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
 }

 ////  "dev": "nodemon server"


module.exports = router;