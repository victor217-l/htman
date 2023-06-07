const con = require('../models/db_controller'); //Connect to database




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



//module.exports.verify = function(username, email,token, callback) {
    //     var query = "INSERT INTO `verify`(`username`,`email`,`token`)VALUES ('"+username+"', '"+email+"', '"+token+"')" 
    //    con.query(query,callback) 
    // } 

    var verify = (username, email,token, callback) => {
        return new Promise((resolve, reject) => {
            con.getConnection(async (err, connection) => {
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
    
    // module.exports.getuserid = function(email,callback){
//     var query = "SELECT * FROM `verify` WHERE email = '"+email+"'"
//   con.query(query.callback) 
// }

var getuserid = ( email, callback) => {
    return new Promise((resolve, reject) => {
        con.getConnection(async (err, connection) => {
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




module.exports = {
    signup,
    verify,
    getuserid,

}