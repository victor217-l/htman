
const pool = require('../models/db_controller'); //Connect to database





var signup = (username, email, password, email_status) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if(err) throw err
          //  connection.query('INSERT INTO refresh_tokens(token, creation_date) VALUES(?, CURRENT_TIMESTAMP)',
           // var query = 'INSERT INTO users(username,email,password,email_status) VALUES(?,?,?,?,), [username, email, password, email_status]
           
            connection.query('INSERT INTO users(`username`, `email`, `password`, `email_status`) VALUES (?, ?, ?, ?)', [username, email, password, email_status], async (err, rows) => {
                connection.release() // return the connection to pool

                if (err) {
                    return resolve({ status: false });
                } else {
                    return resolve({ status: true, data: rows });
                }
            })
        });
    });
}

var signupp = (username,email,password,email_status) => {
  return new Promise((resolve,reject) => {
    pool.getConnection(async(err,connection)  => {
        if(err)throw err
        connection.query("Insert into users(`username`,`email`,`password`,`email_status`) values(?,?,?,?)", [username,email,password,email_status],  async (err,rows) => {
            connection.release();

            if(err){
                return resolve({status: false})
            }else{
                return resolve({status: true, data:rows});
            }

        }
        )
    }
    )
  })
}




    var verify = (username, email,token,) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(async (err, connection) => {
                if(err) throw err
             
                connection.query('INSERT INTO verify(`username`, `email`, `token`) VALUES(?,?,?)', [username, email,token,], async (err, rows) => {
                    connection.release() // return the connection to pool
    
                    if (err) {
                        return resolve({ status: false });
                    } else {
                        return resolve({ status: true, data: rows });
                    }
                })
            });
        });
    }
    
  

var getuserid = ( email) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if(err) throw err
         
            connection.query('SELECT * FROM verify WHERE email =  ?', [email], async (err, rows) => {
                connection.release() // return the connection to pool

                if (err) {
                    return resolve({ status: false });
                } else {
                    return resolve({ status: true, data: rows });
                }
            })
        });
    });
}





var check_username_password  = (username,password) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if(err) throw err
            connection.query('SELECT * FROM users WHERE username = ? and password = ?;', [ username,password ], async (err, rows) => {
                connection.release() // return the connection to pool

                if (err) {
                    return resolve({ status: false,  });
                } else {
                    console.log(username)
                    return resolve({ status: true, data: rows });
                }
            })
        });
    });
}

var getAllDoc  = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if(err) throw err
            connection.query('select * from doctor;', async (err, rows) => {
                connection.release() // return the connection to pool

                if (err) {
                    return resolve({ status: false,  });
                } else {
                    
                    return resolve({ status: true, data: rows });
                }
            })
        });
    });
}



// module.exports.add_doctor = function(first_name, last_name,email,dob, gender,address,phone, image,department,biography, callback){
//     var query = "insert into `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) VALUES(?,?,?,?,?,?,?,?,?,?)";
//     var values = [first_name, last_name,email,dob, gender,address,phone, image,department,biography];
//     con.query(query,values,callback); 
//     console.log(query);
// }


var add_doctor  = (first_name, last_name,email,dob, gender,address,phone, image,department,biography) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if(err) throw err;
            connection.query("insert into `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) VALUES(?,?,?,?,?,?,?,?,?,?)",[first_name, last_name,email,dob, gender,address,phone, image,department,biography], async (err,rows) => {
                connection.release();
                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true, data: rows})
                }
            })
        })

    })

}

// module.exports.getDocbyId = function(id, callback){
//     var query = "select * from doctor where id = ?";
//     var values = [id];
//     con.query(query, values, callback);
//     console.log(query);
// }


var getDocbyId = (id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("select * from doctor where id = ?", [id], async (err,rows) => {
                connection.release();
                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true, data:rows})
                }
            })
        })
    })
}

// module.exports.editDoc = function(id,first_name, last_name,email,dob, gender,address,phone, image,department,biography,callback){
//     var query = "update doctor set `first_name` = ? ,`last_name` = ?,`email` = ?,`dob` = ?,`gender` = ?,`address` = ?,`phone` = ?,`image` = ?,`department` = ?,`biography` = ? where id = ?";
//     var values = [first_name, last_name,email,dob, gender,address,phone, image,department,biography,id];
//     con.query(query, values,callback); 
//     console.log(query);
// }


var editDoc = (id,first_name, last_name,email,dob, gender,address,phone, image,department,biography) => {
    return Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err
            connection.query("update doctor set  `firstname` = ?, `lastname`= ?, `email`=?, `dob`=?, `gender`=?, `address` = ?,`phone` = ?,`image` = ?,`department` = ?,`biography` = ? where id = ?", [first_name, last_name,email,dob, gender,address,phone, image,department,biography,id], async (err,rows) =>{
                connection.release();
                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true, data:rows})
                }
            })
        })
    })
}


// module.exports.deleteDoc = function(id,callback){
//     var query = "delete  from doctor where id = ?";
//     var values = [id];
//     con.query(query, values,callback);
//     console.log(query)
// }

var deletDoc = (id) => {
    return Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("delete  from doctor where id = ?", [id], async (err,rows)=> {
                connection.release();
                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true, data: rows})
                }
            } )
        })
    })
}

var getAllDoc = () => {
    return Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("select * from doctor", async (err,rows) => {
                connection.release();
                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status:true, data:rows})
                }
            })
        })
    })
}


// module.exports.searchDoc = function(key, callback){
//     var query = 'select  * from doctor where first_name like "%' + key + '%"';
//     con.query(query,callback);
//     console.log(query)
//  }

 var searchdoc = (key) => {
    return Promise((resolve, reject) => {
        pool.getConnection(async(err,connection) => {
            if(err) throw err;
            connection.query('select * from doctor where first_name like "%' + key + '%"', async (err,rows) => {
                connection.release();
                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true, data: rows})

                }

            });
        })
    })

 }


//  module.exports.getallappoint =  function(callback){
//     var query = "select * from appointment";
//     con.query(query, callback)
//     console.log(query)
//  }


 var getallappoint = () => {
    return Promise((resolve, reject) => {
        pool.getConnection(async(err,connection) => {
            if(err) throw err;
            connection.query("select * from appointment", async (err,rows) => {
                connection.release();

                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true, data:rows})
                }
            })

        })
    })
 }



module.exports = {
    signup,
    signupp,
    verify,
    getuserid,
    check_username_password,
    getAllDoc,
    add_doctor,
    getDocbyId,
    editDoc,
    deletDoc,
    getAllDoc,
    searchdoc,
    getallappoint,
    

}