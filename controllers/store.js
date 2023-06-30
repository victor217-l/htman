const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var db_query = require('../models/db_model')
var jwt = require('jsonwebtoken')

// router.get('*', function(res,req,next){
//     if(req.cookies['username'] == null){
//         res.redirect('/login')
//     }else{
//       next();
//     }
// })

router.get('/', authenticateToken, async function(req,res){

    let result = await  db_query.getallmed();

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credential"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "all medicine", list: result.data})
    
    }

    // db.getallmed(function(err, result){
    //     if(err){
    //         res.status(500).json({ msg: err.toString()})
    //     }else{
    //         res.json({msg: "all medicine", list:result})
    //     }
    //    // res.json({list: result})
    //     //res.render('store.ejs', {list: result})
    // })
})


router.get('/add_med', function(req,res){
    res.render('add_medd.ejs')
});
 
router.post('/add_med',  authenticateToken, async function(req,res){
    var name = req.body.name
    var p_date = req.body.p_date;
    var expire = req.body.expire;
    var e_date =req.body.e_date;
    var price = req.body.price;
    var quantity = req.body.quantity;


    let result = await  db_query.addMed(name,p_date,expire,e_date,price,quantity);

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "medicine in"})
    }



    // db.addMed(name, p_date, expire, e_date, price, quantity, function(err, result){
    //     if(err){
    //         res.status(500).json({msg: err.toString()})
    //     }else{
    //         res.json({msg: "post in", list:result})
    //     }
    //   //  req.redirect('/store')
    // })
});

router.get('/edit_med/:id', function(req, res){
    var id = req.params.id;
    db.getMedbyId(id, function(err, result){
        res.render('edit_med.ejs', {list:result})
    });
});

router.post('/edit_med', authenticateToken, async function(req,res){
    var id = req.body.id;
    var name = req.body.name
    var p_date = req.body.p_date;
    var expire = req.body.expire;
    var e_date = req.body.e_date;
    var price = req.body.price;
    var quantity = req.body.quantity;

    let result = await db_query.editmed(id,name, p_date, expire, e_date, price, quantity);

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg:"Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "edit medic", list: result.data})
    }

    // db.editmed(id,name, p_date, expire, e_date, price, quantity, 
    //     function(err, result){
    //         if(err){
    //             res.status(500).json({msg: err.toString()})
    //         }else{
    //             res.json({msg: "it edited ", list: result})
    //         }
    //   //  req.redirect('/store')
    // });
});

router.get('/delete_med/:id', function(req,res){
    var id = req.params.id;
    db.getMedbyId(id, function(err, result){
        res.render('delete_med.ejs', {list:result})
    })
});

router.post('/delete_med', authenticateToken,  async function(req,res){
    var id = req.body.id;

    let result = await db_query.deletemed(id);

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"})
    }else if(result.status == true){
        res.statusCode = 200;
        res.json({msg: "medicine remov", list: result.data})

    }
    

    // db.deletemed(id, function(err,result){
    //     if(err){
    //         res.status(500).json({msg: err.toString()})
    //     }else{
    //         res.json({status:
    //         "200", msg:"it has been ", list: result })    
    //     }
    //    // res.redirect('/store')
    // })
});

router.post('/search', authenticateToken, async function(req,res){
    var key =  req.body.search;            //what you want to use for the search

    let result = await db_query.searchmed(key);

    if(result.status == false){
        res.statusCode = 500;
        res.json({msg: "Invalid credentials"})
    }else if (result.status =- true){
        res.statusCode = 200;
        res.json({msg: "search complete", list:result.data})
    }

    
    // db.searchmed(key, function(err, result){
    //    // console.log(result);
    //     if(err){
    //         res.status(500).json({msg: err.toString()})
    //     }else{
    //         res.json({msg: "it has ", list:result})
    //     }
    // })
})

function authenticateToken(req,res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.sendStatus(401)// unauhorized
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403) // forbidden
        }
        req.user = user;
        next();
    })
}


module.exports = router;

