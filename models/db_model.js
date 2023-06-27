
const pool = require('../models/db_controller'); //Connect to database





var signup = (username, email, password, email_status) => {
    return new Promise((resolve, reject) => {
        con.getConnection(async (err, connection) => {
            if(err) throw err
          //  connection.query('INSERT INTO refresh_tokens(token, creation_date) VALUES(?, CURRENT_TIMESTAMP)',
           // var query = 'INSERT INTO users(username,email,password,email_status) VALUES(?,?,?,?,), [username, email, password, email_status]
            connection.query('INSERT INTO users(username, email, password, email_status) VALUES(?,?,?,?,)', [username, email, password, email_status], async (err, rows) => {
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
    pool.getConnection((async(err,connection)  => {
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
    ))
  })
}




    var verify = (username, email,token, callback) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(async (err, connection) => {
                if(err) throw err
             
                connection.query('INSERT INTO verify(username, email, token,) VALUES(?,?,?,?,)', [username, email,token, callback], async (err, rows) => {
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
    
  

var getuserid = ( email, callback) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(async (err, connection) => {
            if(err) throw err
         
            connection.query('SELECCT * FROM verify WHERE email =  ?', [ email, callback], async (err, rows) => {
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



module.exports = {
    signup,
    verify,
    getuserid,
    check_username_password
    

}