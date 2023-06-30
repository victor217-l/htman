
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
    return new Promise((resolve,reject) => {
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
    return new Promise((resolve,reject) => {
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
    return new Promise((resolve,reject) => { // new must be there
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


 var searchdoc = (key) => {
    return new Promise((resolve, reject) => {
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


 var getallappoint = () => {
    return new Promise((resolve, reject) => {
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


//  module.exports.add_appointment =  function(p_name, department, d_name, date, time,email, phone, callback, ){
//     var query = "insert into `appointment`(`patient_name`, `department`, `doctor_name`,`date`,`time`,`email`, `phone`) values(?,?,?,?,?,?,?)";
//     var values = [p_name, department, d_name,   date, time,email, phone];
//   con.query(query, values, callback);
//   console.log(query)
// }


var add_appointment = (p_name, department, d_name, date, time,email, phone) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err
            connection.query("insert into `appointment`(`patient_name`, `department`, `doctor_name`,`date`,`time`,`email`, `phone`) values(?,?,?,?,?,?,?)",[p_name, department, d_name,   date, time,email, phone], async (err,rows) => {
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


// module.exports.editappointment = function(p_name, department, d_name, date, time, email, phone,id,  callback){
//     var query = "update `appointment` set patient_name = ?, department = ?, date= ?, doctor_name = ?, time= ?, email = ?, phone = ?  where  id = ?";
//     var values =  [p_name, department, d_name, date, time, email, phone, id];
//     con.query(query, values, callback);
//     console.log(query)
// }


var editappointment = (p_name, department, d_name, date, time, email, phone,id) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err,connection) => {
            if(err)throw err
            connection.query("update `appointment` set patient_name = ?, department = ?, date= ?, doctor_name = ?, time= ?, email = ?, phone = ?  where  id = ?",[p_name, department, d_name, date, time, email, phone, id], async (err, rows)=> {
                connection.release()

                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true, data: rows})
                }
            })
        })
    })
}


// module.exports.deleteappointment = function(id, callback){
//     var query = "delete from appointment where  id = ?";
//     var values = [id];
//     con.query(query, values, callback);
//   } 


  var deleteappointment = (id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("delete from appointment where id = ?", async (err,rows) => {
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


//   module.exports.getAllemployee = function(callback){
//     var query = "select * from employee";
//     con.query(query, callback);
//     console.log(query)
// }


var getAllemployee = () => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("select * from employee", async (err,rows) => {
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


// module.exports.add_employee = function(name, email,  contact, join_date, role,  salary,callback){
//     var query = "insert into employee(`name`,`email`,`contact`,`join_date`,`role`,salary) values(?,?,?,?,?,?)";
//     var values = [name, email,  contact, join_date, role,  salary];
//     con.query(query, values,callback);
//     console.log(query);
// }

var add_employee = (name,email,contact, join_date,role, salary) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async(err,connection) => {
            if(err) throw err;
            connection.query("insert into employee(`name`,`email`,`contact`,`join_date`,`role`,`salary`) values(?,?,?,?,?,?)", [name, email,  contact, join_date, role,  salary], async (err,rows) => {
                connection.release()
                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true, data:rows})
                }
            } )
        })
    })
}

// module.exports.getAllleave = function(callback){
//     var query = "select * from leaves";
//     con.query(query, callback)
// }


var getAllLeave = () => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("select * from leaves", async (err,rows) => {
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



// module.exports.deleteleave = function(id, callback){
//     var query = "delete from leaves where id = ?";
//     var values = [id];
//     con.query(query, values,callback);
//     console.log(query)
// }

var deleteleave = (id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("delete from leaves where id = ?", [id], async (err,rows) => {
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


// module.exports.editEmp= function(id, name, email, contact, join_date, salary, role, callback ){
//     var query = "update `employee` set `name` = ?, `email` = ?, `contact` = ?, `join_date` = ?, `role` = ?, `salary` = ? where `id` = ? ";//dont put comma before were
//      var values = [name, email,  contact, join_date, salary, role,id];
//     con.query(query, values, callback )
//     console.log(query)
//  }


 var editEmp = (id,name,email,contact,join_date,salary,role) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("update `employee` set `name` = ?, `email` = ?,`contact` =?, `join_date`=?, `role`=?, `salary`=? where id = ?", [id,name,email,contact,join_date,salary,role], async (err,rows) => {
                connection.release();

                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true})
                }
            } )
        })
    })

 }


//  module.exports.deleteEmp= function(id,  callback ){
//     var query = "delete from employee where id = ?" ; //comma ahounldnt be at the end
//     var values = [id];
//     con.query(query, values, callback);
//     console.log(query)
//  }


 var deleteEmp = (id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("delete from employee where id = ?", [id], async (err,rows) => {
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


//  module.exports.searchEmp = function(key, callback){
//     var query = 'select  * from employee where name like "%' +key+ '%" ' ;
//     con.query(query,callback);
//     console.log(query)
//  }


 var searcEmpp = (key) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query('select * from employee where name like "%' +key+ '%" ',async (err,rows)=> {
                connection.release();
                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({status: true, data:rows})
                }
            } )
        })
    })
 }


//  module.exports.add_leave = function(name, id, type,from,to,reason,callback){
//     var query = "insert into `leaves` (`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) values(?,?,?,?,?,?)";
//     var values = [name, id, type, from, to, reason, ];
//     con.query(query, values,callback);
//     console.log(query);
// }

var add_leave = (name,id,type,from,to,reason) => {
    return new Promise((resolve,reject)=> {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("insert into `leaves` (`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) values(?,?,?,?,?,?)", [name,id,type,from,to,reason], async (err,rows) => {
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


// module.exports.getallmed = function(callback){
//     var query = "select * from store order by id desc";
//     con.query(query,callback)
//     console.log(query)
//   }


  var getallmed = () => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
          connection.query("select * from store order by id desc", async (err,rows) =>{
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

//   module.exports.addMed = function(name, p_date, expire, e_date, price, quantity, callback){
//     var query = "insert into `store` (name, p_date,expire,expire_end,price, quantity) values (?,?,?,?,?,?)";
//     var values = [name, p_date, expire, e_date, price, quantity];
//     con.query(query, values, callback);
//     console.log(query)
//  }

 var addMed = (name,p_date,expire,e_date,price,quantity) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("insert into store (`name`,`p_date`,`expire`,`expire_end`,`price`,`quantity`) values(?,?,?,?,?,?)", [name,p_date,expire,e_date,price,quantity], async (err,rows) => {
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

//  module.exports.editmed = function(id, name, p_date, expire, e_date, price, quantity, callback){
//     var query = " update `store` set `name` = ?, `p_date` = ?, `expire` = ?, `expire_end` = ?, `price`=?, `quantity`=? where id = ?";
//     var values = [name, p_date, expire, e_date, price, quantity, id];
//     con.query(query, values,callback);
//     console.log(query)
//  }


 var editmed = (id, name, p_date, expire, e_date, price, quantity) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("update `store` set `name` = ?, `p_date` = ?, `expire` = ?, `expire_end` = ?, `price`=?, `quantity`=? where id = ?", [name, p_date, expire, e_date, price, quantity, id], async (err,rows) => {
                connection.release();

                if(err){
                    return resolve({status: false})
                }else{
                    return  resolve({status: true, data:rows})
                }
            })
        })
    })
 }


//  module.exports.deletemed = function(id, callback){
//     var query = "delete from store where id = ?";
//     var values =  [id];
//     con.query(query, values, callback);
//  }

 var deletemed = (id) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("delete from store where id = ?", [id], async (err,rows) => {
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


//  module.exports.searchmed = function(key, callback){
//     var query = 'select * from store where name like "%' +key+'%" ';
//     con.query(query,callback);
    
//  }

 var searchmed = (key) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async(err,connection) => {
            if(err) throw err;
            connection.query('select * from store where name like "%' +key+ '%"', async (err,rows) => {
                connection.release()
                if(err){
                    return resolve({status: false})
                }else{
                    return resolve({statu: true, data:rows})
                }
            })
        })
    })
 }

//  module.exports.getcomplain = function(callback){
//     var query = "select * from complain";
//     con.query(query,callback);
//  }

 var getcomplain = () => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("select * from complain", async (err,rows) => {
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


//  module.exports.postcomplain = function(message,name, email, subject, callback){
//     var query = "insert into complain(message,name, email,subject) values(?,?,?,?)";
//     var values = [message,name, email, subject];
//     con.query(query, values, callback)
//  }

 var postcomplain = (message,name, email,subject) => {
    return new Promise((resolve,reject) => {
        pool.getConnection(async (err,connection) => {
            if(err) throw err;
            connection.query("insert into complain(`message`,`name`,`email`,`subject`) values(?,?,?,?)", [message,name,email,subject], async (err,rows) => {
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
    add_appointment,
    editappointment,
    deleteappointment,
    getAllemployee,
    add_employee,
    getAllLeave,
    deleteleave,
    editEmp,
    deleteEmp,
    searcEmpp,
    add_leave,
    getallmed,
    addMed,
    editmed,
    deletemed,
    searchmed,
    getcomplain,
    postcomplain,
}