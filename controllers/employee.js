var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//const { validationResult } = require('express-validator');
//var db = require.main.require('./models/db_controller');
var db_query = require('../models/db_model')
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config()




module.exports = router;

// router.get('*', function(req,res, next){ // so that the user will login before
//     // having acces to this route

//     if(req.cookies['username'] == null){
//         res.redirect('/login');
//     }else{
//         next()
//     }
// }) 


router.get('/',  authenticateToken, async function(req,res){

    let result = await db_query.getAllemployee();

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "all employee", list:result.data})

    }

    // db.getAllemployee(function(err, result){
    //     if(err){
    //         res.status(500).json({ msg: err.toString()})
    //     }else{
    //         res.status(200).json({list: result})
    //     }
    //     //res.json({list: result})
    //    // res.render('employee.ejs', {employee:   result})
    // })
}) 

router.get('/add', function(req, res){
    res.render('add_employee.ejs')
})

router.post('/add_employee', authenticateToken, async function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.contact;
    var join_date = req.body.join_date;
    var role = req.body.role;
    var salary = req.body.salary;

    let result = await db_query.add_employee(name,email,contact,join_date,role,salary);

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"})
    }else if(result.status == true){
      res.statusCode = 200;
      res.json({msg: "employee insert", list:result.data})
    }

    // db.add_employee(name,email,contact,join_date,role,salary, function(err,result){
    //    console.log('employee detail');
    //    if(err){
    //     res.status(500).json({msg: err.toString()})
    //    }else{
    //     res.json({msg:"New employee", list: result})
    //    }
       
    //   // res.redirect('/employee');
    // });

});


router.get('/leave', authenticateToken, async function(req,res){

    let result = await db_query.getAllLeave()

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "all people on leave", list: result.data})
    }

    // db.getAllleave(function(err,result){
    //     if(err){
    //         res.status(500).json({msg: err.toString()})
    //     }else{
    //         res.json({user:result})
    //     }
        
    //    // res.render('leave.ejs' , {user: result});
    // })
})

router.get('/add_leave', function(req,res){
   // res.render('add_leave.ejs');
})

router.get('/edit_leave', function(req,res){
    var id = req.params.id
    db.getleavebyid(id, function(err,result){
        //res.json({user: list})
        res.render('edit_leave.ejs', {user:result})
    })
})

router.post('/edit_leave', authenticateToken, function(req,res){
    var id = req.body.id


    db.edit_leave(id,req.body.name, req.body.leave_type
        , req.body.from, req.body.to, req.body.reason, function(err,result){
            if(err){
                res.status(500).json({msg: err.toString()})
            }else{
                res.json({msg: "leave edit",}) 
            }
            res.send("entered");
            //res.redirect('/employee/leave');
        })
})

router.get('/delete_leave/:id', function(req, res){
     var id = req.params.id;
     db.getleaveid(id, function(err, result){
         res.render('/delete_leave.ejs', {user:result})
     })
})

router.post('/delete_leave', authenticateToken, async function(req,res){
    var id = req.body.id;

    let result = await db_query.deleteleave(id)

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "leave gone", list: result.data})
    }

    // db.deleteleave(id, function(err, result){
    //     if(err){
    //         res.status(500).json({msg: err.toString()})
    //     }else{
    //         res.json({status: "200", msg: "message delete"})
    //     }
        
    //    // res.redirect('/employee/leave')
    // })
})

router.get('/edit_employee/:id', function(req,res){
    var id = req.params.id;
    db.getEmpbyId(id, function(err, result){
        res.render('edit_employee.ejs', {list: result})
    })
}) 

router.post('/edit_employee', authenticateToken, async function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.contact;
    var join_date = req.body.join_date;
    var role = req.body.role;
    var salary = req.body.salary;

    let result = await db_query.editEmp(id,name,email,contact,join_date,role,salary)

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"})
    }else if(result.status == true){
        res.statusCode =  200;
        res.json({msg: "Employee edit", list:result.data})
    }

    // db.editEmp(id,name,email,contact,join_date,role,salary, function(err,result){
    //    //console.log('employee detail are edited');
    //    if(err){
    //     res.status(500).json({msg: err.toString()})
    //    }else{
    //     res.status(200).json({msg: "employee edit", })
    //    }
    //   // res.redirect('/employee');
    // });

});
 
router.get('/delete_employee/:id', function(req,res){
var id = req.params.id;
db.getEmpbyId(id, function(err, result){
    res.json({list:result})
    //res.render('delete_employee.ejs', {list: result})
})
})

router.post('/delete_employee', authenticateToken, async function(req,res){
    var id = req.body.id;

    let result = await db_query.deleteEmp(id)

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg:"Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg:"employee remo", list:result.data})
    }

    // db.deleteEmp(id, function(err, result){
    //    // res.send("employee deleted")
    //     if(err){
    //         res.status(500).json({msg: err.toString()})
    //     }else{
    //         res.status(200).json({msg: "employee remove"})
    //     }
    // })
})

router.post('/search', authenticateToken, async function(req,res){
    var key = req.body.search;

    let result = await db_query.searcEmpp(key);

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg:"search complete", list: result.data})
    }


    // db.searchEmp(key, function(err, result){
    //     console.log(result)
    //     if(err){
    //         res.status(500).json({msg: err.toString()})
    //     }else{
    //         res.json({list: result})
    //     }
    //    // res.render('employee.ejs', {employee: result});
    // })
})

router.post('/add_leave', authenticateToken, [check('name').notEmpty(), 
check('id').notEmpty(),
 check('leave_type').notEmpty(),
 check('from').notEmpty().withMessage('select from date'),
 check('to').notEmpty().withMessage(''),
 check('reason').notEmpty().withMessage('specify a reason ')
 ],  async function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({errors: errors.array()})
    }


    let result = await db_query.add_leave(req.body.id,req.body.name,req.body.leave_type,req.body.from,req.body.to,req.body.reason);

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"}) 
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "leave inser"})
    }

 

    
    // var name = req.body.name;
    // var email = req.body.email;
    // var contact = req.body.contact;
    // var join_date = req.body.date;
    // var role = req.body.role;
    // var salary = req.body.salary;

//   db.add_leave(req.body.id,req.body.name,req.body.leave_type,req.body.from,req.body.to,req.body.reason, function(err, results){
//     if(err){
//         res.status(500).json({msg: err.toString()})
//     }else{
//       res.json({list: results});
//     }
    
//     //  res.redirect('/employee/leave');
//   });
})


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
       return res.sendStatus(401)// unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
           return res.sendStatus(403)// forbidden
        }
        req.user = user;
        next();
    })

    // "dev": "nodemon start"

}








