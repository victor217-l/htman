var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db_query = require('../models/db_model');
var db = require('../models/db_controller');
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

router.get('/add_doctor', authenticateToken,  async function(req,res){
    

    let result = await db_query.getAllDoc();

    if(result.status == false){
         res.statusCode = 500;
         res.json({msg: "Invalid credentials"})
    }else if(result.status === true){
        res.statusCode = 200; 
        res.json({msg: "All doctor", list: result.data})
    }


}); 


router.post('/add_doctor',authenticateToken, upload.single("image"), async function(req,res){

    let result = await db_query.add_doctor(req.body.first_name, req.body.lastname,
        req.body.email, req.body.dob,req.body.gender, req.body.address ,
        req.body.phone, req.file.filename,req.body.department,
        req.body.biography)

        if(result.status == false){
            res.statusCode = 500;
            res.json({msg:"invalid credentials" })
        }else if(result.status == true){
            res.statusCode = 200;
            res.json({msg: "its in", list: result.data})
        }


        // db.add_doctor(req.body.first_name, req.body.lastname,
        //     req.body.email, req.body.dob,req.body.gender, req.body.address ,
        //     req.body.phone, req.file.filename,req.body.department,
        //     req.body.biography, function(err){
        //         if(err){
        //             res.status(500).json({status: "500", msg: err.toString() })
        //         } else{
        //             if(db.add_doctor){
        //                 console.log('1 doctor inserted')
        //               }
                      
        //             res.json({ status: "200", msg: "it has entered",})

        //         }
        //     } )
            
            
          //  res.render('add_doctor');


});


router.get('/edit_doctor/:id',  authenticateToken,  async function(req,res){
    var id = req.params.id;
   // let result = db.getusertoken()
   let result = db_query.getDocbyId(id);

   if(result.status == false){
     res.statusCode == 500;
     res.json({msg: "Invalid credentials"})
   }else if (result.status == true){
     res.statusCode == 200;
     res.json({msg: "All doc ", list:result.data})

   }
    
});

router.post('/edit_doctor/:id', authenticateToken, async function(res,req){
    var id = req.body.id;

    let result = await db_query.editDoc(req.body.first_name, req.body,lastname,
        req.body.email, req.body.dob,req.body.gender, req.body.address ,
        req.body.phone, req.file.filename,req.body.department,
        req.body.biography, id);

        if(result.status == false){
            res.statusCode = 500;
            res.json({msg: "Invalid credentials"})
        }else if(result.status == true){
          res.statusCode = 200;
          res.json({msg: "Doctor updated", list: result.data})
        }

     
}) 

// router.get('/deletedoctor', authenticateToken, function(req,res){
//     var id = req.body.id;
//     db.getDocbyId(id, function(err,result){
//         res.json({status: "200", msg: "doc by id files", list:result })
//       //  res.render('delete_doctor.ejs', {list:result})
//     })
// })

router.post('/deletedoctor', authenticateToken, async function(req,res){
    var id = req.body.id;
    let result = await db_query.deletDoc(id);

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg:"Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "delete doctor ", list: result.data})

    }    
})

router.get('/', authenticateToken, async function(req,res){

    let result = await db_query.getAllDoc();
    if(result.status == false){
        res.statusCode == 500;
        res.json({msg: "Invalid credentials"})
    }else if (result.status == true){
        res.statusCode == 200;
        res.json({msg: "all deoctors", list: result.data})
        
    } 

    // db.getAllDoc(function(err, result){
    //     if(err)
    //     throw err;
    //     res.json({msg: "all list of doctors", list:result})
    //    // res.render('doctor.ejs', {list:result})
    // })
});

router.post('/search',  authenticateToken,  async function(req,res){
   var key = req.body.search;

   let result = await db_query.searchdoc(key);

   if(result.status == false){
    res.statusCode == 500;
    res.json({msg: "Invalid credentials"})
   }else if(result.status == true){
    res.statusCode == 200;
    res.json({msg: "Search complete", list:result.data});

   }

//    db.searchDoc(key, function(err, result){
//     console.log(result);
//     if(err){
//         res.status(500).json(err.toString() )
//     }else{
//         res.json({list: result})
//     } 
    
//    // res.render('doctor.ejs', {list:result})
//    } )
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

