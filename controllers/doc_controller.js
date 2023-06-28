var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db_query = require('../models/db_model');
const sanitize_data = require('../utility/sanitize_data.util');
var multer = require('multer');// for database 
var jwt = require('jsonwebtoken')

var fs = require('fs');
var path = require('path');
const { default: authtoken } = require('../utility/autoken');


module.exports = router;    


/*
router.get('*', function(req,res, next){
    if(req.cookies['username'] == null){
        res.redirect('/login');
    }else{
     next();
    }
 })  */


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

/*router.get('/', function(req,res){
     if(err){
        throw err;
        res.render('doctors.ejs', {list: result})

     }else{

     }
}) */

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/add_doctor',   async function(req,res){
    

    let result = await db_query.getAllDoc();

    if(result.status == false){
         res.statusCode = 500;
         res.json({msg: "Invalid credentials"})
    }else if(result.status === true){
        res.statusCode = 200;
        res.json({msg: "All doctor", data: list})
    }

    // db.getAlldept(function(err,result){
    //     if (err) {
    //         return res.sendStatus(500); // Internal Server Error
    //       }
      
    //     res.json({list:result})
    //      // res.render('add_doctor.ejs', {list:result})
    //      })
}); 


router.post('/add_doctor',authenticateToken, upload.single("image"), function(req,res){

        db.add_doctor(req.body.first_name, req.body.lastname,
            req.body.email, req.body.dob,req.body.gender, req.body.address ,
            req.body.phone, req.file.filename,req.body.department,
            req.body.biography, function(err){
                if(err){
                    res.status(500).json({status: "500", msg: err.toString() })
                } else{
                    if(db.add_doctor){
                        console.log('1 doctor inserted')
                      }
                      
                    res.json({ status: "200", msg: "it has entered",})

                }
            } )
            
            
          //  res.render('add_doctor');


});


router.get('/edit_doctor/:id',  authenticateToken, function(req,res){
    var id = req.params.id;
   // let result = db.getusertoken()
    db.getDocbyId(id, function(err,result){
        if(err){
            res.status(500).json({msg: err.toString()})
        }else{
            res.json({list: result})
        }
       
       // res.render('edit_doctor.ejs', {list:result})
    })
});

router.post('/edit_doctor/:id', authenticateToken, function(res,req){
    var id = req.body.id;
    db.editDoc(req.body.first_name, req.body,lastname,
        req.body.email, req.body.dob,req.body.gender, req.body.address ,
        req.body.phone, req.file.filename,req.body.department,
        req.body.biography, id,
        function(err,result){
         if(err)
         throw err;
         res.redirect('back');
        } )   
}) 

router.get('/deletedoctor', authenticateToken, function(req,res){
    var id = req.body.id;
    db.getDocbyId(id, function(err,result){
        res.json({status: "200", msg: "doc by id files", list:result })
      //  res.render('delete_doctor.ejs', {list:result})
    })
})

router.post('/deletedoctor', authenticateToken, function(req,res){
    var id = req.body.id;
    db.deleteDoc(id, function(err,result){
        if(err){
            res.status(500).json({status: "200", msg: err.toString()})
        }else{
            res.json({status: "200", list:result})
           // res.render('delete_doctor.ejs', {list:result})
        }
        
    })
})

router.get('/', authenticateToken, function(req,res){
    db.getAllDoc(function(err, result){
        if(err)
        throw err;
        res.json({msg: "all list of doctors", list:result})
       // res.render('doctor.ejs', {list:result})
    })
});

router.post('/search',  authenticateToken, function(req,res){
   var key = req.body.search;
   db.searchDoc(key, function(err, result){
    console.log(result);
    if(err){
        res.status(500).json(err.toString() )
    }else{
        res.json({list: result})
    } 
    
   // res.render('doctor.ejs', {list:result})
   } )
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

