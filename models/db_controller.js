var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


// var con = mysql.createConnection({
//     host: '127.0.0.1',//localhost
//     user: 'root',
//     password: '',
//     database: 'hmsystem',
// });

// const pool  = mysql.createPool({
//    // connectionLimit : process.env.CONNECTION_LIMIT,
//     host            : process.env.HOST,
//     user            : process.env.DB_USERNAME,
//     password        : '',
//     database        : process.env.DB_DBNAME,
//    // charset         : process.env.CHARSET,
//     multipleStatements: true,
//     connectionTimeout: 20000, 
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


pool.getConnection((err, conn) => {
  if(err) console.log(err)
  console.log("Connected successfully")
})



module.exports = pool;







module.exports.signup = function(username, email,password,status,callback){
    con.query('SELECT email FROM users WHERE email =  "'+email+'" ',
    function(err, result){
        console.log(result[0])
        if(result[0]==undefined){
            //"insert into `users`(`username`,`email`,`password`,`email_status`) VALUES ('"+username+"', '"+email+"','"+password+"', '"+status+"') "
          //  connection.query('INSERT INTO refresh_tokens(token, creation_date) VALUES(?, CURRENT_TIMESTAMP)',
          //'INSERT INTO student_classwork_response(classwork_id, user_id, is_done, attendance_value, response, class_code, score) VALUES(?, ?, ?, ?, ?, ?, ?)', [ classwork_id, user_id, 1, attendance_value, response, class_code, score ],
            con.query('insert into `users`(`username`,`email`,`password`,`email_status`) VALUES (?,?,?,?)',[ username, email, password, status]);
            //con.query(query,callback)
        //console.log(query);
        }else{ 
            console.log("error")
        }
    })    
}

// module.exports.check_username_password = (username, password) => {
//     return new Promise((resolve, reject) => {
//       pool.getConnection(async (err, connection) => {
//         if (err) {
//           reject(err);
//           return;
//         }
  
//         connection.query(
//           'SELECT * FROM account_details WHERE email = ?;',
//           [username, password],
//           async (err, rows) => {
//             connection.release(); // return the connection to pool
  
//             if (err) {
//               reject(err);
//             } else {
//               resolve({ status: true, data: rows });
//             }
//           }
//         );
//       });
//     });
//   };
  





//con.query('SELECT * FROM users WHERE username = ? AND password = ?',



module.exports.verify = function(username, email,token, callback) {
    var query = "INSERT INTO `verify`(`username`,`email`,`token`)VALUES ('"+username+"', '"+email+"', '"+token+"')" 
   con.query(query,callback) 
} 

module.exports.getuserid = function(email,callback){
    var query = "SELECT * FROM verify WHERE email = '"+email+"' "
  con.query(query, callback) 
}


module.exports.matchToken = function(id, token, callback){
    var query = "select * from verify where token = ? and id= ?";
    var values = [token, id];
    con.query(query, values, callback);
    console.log(query);
}

module.exports.updateverify = function(email, email_status, callback){
    var query = "update  `users` set `email_status` = '"+email_status+"' where `email` = '"+email+"' ";
    con.query(query, callback);
    console.log(query)
}


module.exports.findOne = function(email, callback){
    var query = "select * from users where email = '"+email+"' ";
    con.query(query, callback);
    console.log(query)
}

module.exports.temp = function(id,email,token, callback){
    var query = "insert into `temp`(id`,`email`,`token`) values(?,?,?)," [id,email, token];
    //  con.query("insert into `temp`(id`,`email`,`token`) values("+id+"','"+email+"', '"+token+"'),"                            "+id+"','"+email+"', '"+token+"'
    //var query = "insert into `temp`(id`,`email`,`token`) values("+id+"','"+email+"', '"+token+"'),"   ;
    con.query(query, callback);
    console.log(query);
}


module.exports.add_doctor = function(first_name, last_name,email,dob, gender,address,phone, image,department,biography, callback){
    var query = "insert into `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) VALUES(?,?,?,?,?,?,?,?,?,?)";
    var values = [first_name, last_name,email,dob, gender,address,phone, image,department,biography];
    con.query(query,values,callback); 
    console.log(query);
}

module.exports.getAllDoc = function(callback){
    var query = "select * from doctor";
    con.query(query,callback);
    console.log(query);
}

module.exports.getDocbyId = function(id, callback){
    var query = "select * from doctor where id = ?";
    var values = [id];
    con.query(query, values, callback);
    console.log(query);
}

module.exports.editDoc = function(id,first_name, last_name,email,dob, gender,address,phone, image,department,biography,callback){
    var query = "update doctor set `first_name` = ? ,`last_name` = ?,`email` = ?,`dob` = ?,`gender` = ?,`address` = ?,`phone` = ?,`image` = ?,`department` = ?,`biography` = ? where id = ?";
    var values = [first_name, last_name,email,dob, gender,address,phone, image,department,biography,id];
    con.query(query, values,callback); 
    console.log(query);
}

module.exports.deleteDoc = function(id,callback){
    var query = "delete  from doctor where id = ?";
    var values = [id];
    con.query(query, values,callback);
    console.log(query)
}

module.exports.searchDoc = function(key, callback){
   var query = 'select  * from doctor where first_name like "%' + key + '%"';
   con.query(query,callback);
   console.log(query)
}

module.exports.getAlldept = function(callback){
    var query = "select * from  departments";
    con.query(query,callback)
    console.log(query);
}

module.exports.getleavebyid = function(id, callback){
    var query = 'select * from leaves where id = ?';
    var values = [id];
    con.query(query, values,callback);
    console.log(query)
}

module.exports.getAllleave = function(callback){
    var query = "select * from leaves";
    con.query(query, callback)
}



module.exports.add_leave = function(name, id, type,from,to,reason,callback){
    var query = "insert into `leaves` (`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) values(?,?,?,?,?,?)";
    var values = [name, id, type, from, to, reason, ];
    con.query(query, values,callback);
    console.log(query);
}


// module.exports.add_leave = function (
//     name,
//     id,
//     type,
//     from,
//     to,
//     reason,
//     callback
//   ) {
//     var query =
//       "Insert into `leaves` (`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) values ('" +
//       name +
//       "','" +
//       id +
//       "','" +
//       type +
//       "','" +
//       from +
//       "','" +
//       to +
//       "','" +
//       reason +
//       "')";
//     console.log(query);
//     con.query(query, callback);
//   };

  


 

module.exports.deleteleave = function(id, callback){
    var query = "delete from leaves where id = ?";
    var values = [id];
    con.query(query, values,callback);
    console.log(query)
}

module.exports.getAllemployee = function(callback){
    var query = "select * from employee";
    con.query(query, callback);
    console.log(query)
}
 

module.exports.add_employee = function(name, email,  contact, join_date, role,  salary,callback){
    var query = "insert into employee(`name`,`email`,`contact`,`join_date`,`role`,salary) values(?,?,?,?,?,?)";
    var values = [name, email,  contact, join_date, role,  salary];
    con.query(query, values,callback);
    console.log(query);
}

module.exports.searchEmp = function(key, callback){
    var query = 'select  * from employee where name like "%' +key+ '%" ' ;
    con.query(query,callback);
    console.log(query)
 }

 module.exports.deleteEmp= function(id,  callback ){
    var query = "delete from employee where id = ?" ; //comma ahounldnt be at the end
    var values = [id];
    con.query(query, values, callback);
    console.log(query)
 }

 module.exports.editEmp= function(id, name, email, contact, join_date, salary, role, callback ){
    var query = "update `employee` set `name` = ?, `email` = ?, `contact` = ?, `join_date` = ?, `role` = ?, `salary` = ? where `id` = ? ";//dont put comma before were
     var values = [name, email,  contact, join_date, salary, role,id];
    con.query(query, values, callback )
    console.log(query)
 }

 module.exports.getEmpbyId= function(id,  callback ){
    var query = "select * from employee where id = ?," [id];
    con.query(query, callback);
    console.log(query)
 }

 module.exports.edit_leave= function(id, name, leave_type,   from, to, reason, callback){
    var query = "Update `leave` set `employee` = ?, leave_type = ?, `date_from` = ?, `date_to` = ?, `reason` = ? where id = ? ";
    var values = [ name, leave_type,  from, to, reason,id];
    con.query(query, values, callback)
    console.log(query)
 }

 module.exports.add_appointment =  function(p_name, department, d_name, date, time,email, phone, callback, ){
        var query = "insert into `appointment`(`patient_name`, `department`, `doctor_name`,`date`,`time`,`email`, `phone`) values(?,?,?,?,?,?,?)";
        var values = [p_name, department, d_name,   date, time,email, phone];
      con.query(query, values, callback);
      console.log(query)
    }

 module.exports.getallappoint =  function(callback){
    var query = "select * from appointment";
    con.query(query, callback)
    console.log(query)
 }

 module.exports.editappointment = function(p_name, department, d_name, date, time, email, phone,id,  callback){
        var query = "update `appointment` set patient_name = ?, department = ?, date= ?, doctor_name = ?, time= ?, email = ?, phone = ?  where  id = ?";
        var values =  [p_name, department, d_name, date, time, email, phone, id];
        con.query(query, values, callback);
        console.log(query)
    }

// module.exports.editappointment = function (
//     p_name,
//     department,
//     d_name,
//     date,
//     time,
//     email,
//     phone,
//     id,
//     callback
//   ) {
//     var query =
//       "update appointment set patient_name='" +
//       p_name +
//       "',department='" +
//       department +
//       "',doctor_name='" +
//       d_name +
//       "',date='" +
//       date +
//       "',time='" +
//       time +
//       "',email='" +
//       email +
//       "',phone='" +
//       phone +
//       "' where id=" +
//       id;
//     con.query(query, callback);
//   };
  


  
  module.exports.deleteappointment = function(id, callback){
    var query = "delete from appointment where  id = ?";
    var values = [id];
    con.query(query, values, callback);
  } 

  module.exports.getallmed = function(callback){
    var query = "select * from store order by id desc";
    con.query(query,callback)
    console.log(query)
  }

  module.exports.addMed = function(name, p_date, expire, e_date, price, quantity, callback){
     var query = "insert into `store` (name, p_date,expire,expire_end,price, quantity) values (?,?,?,?,?,?)";
     var values = [name, p_date, expire, e_date, price, quantity];
     con.query(query, values, callback);
     console.log(query)
  }
  
  module.exports.getMedbyId = function(id, callback){
    var query = "select * from store where id = ? ";
    var values = [id];
    con.query(query, values, callback);
  }


  module.exports.editmed = function(id, name, p_date, expire, e_date, price, quantity, callback){
    var query = " update `store` set `name` = ?, `p_date` = ?, `expire` = ?, `expire_end` = ?, `price`=?, `quantity`=? where id = ?";
    var values = [name, p_date, expire, e_date, price, quantity, id];
    con.query(query, values,callback);
    console.log(query)
 }

 module.exports.deletemed = function(id, callback){
    var query = "delete from store where id = ?";
    var values =  [id];
    con.query(query, values, callback);
 }

 module.exports.searchmed = function(key, callback){
    var query = 'select * from store where name like "%' +key+'%" ';
    con.query(query,callback);
    
 }

 module.exports.postcomplain = function(message,name, email, subject, callback){
    var query = "insert into complain(message,name, email,subject) values(?,?,?,?)";
    var values = [message,name, email, subject];
    con.query(query, values, callback)
 }

 module.exports.getcomplain = function(callback){
    var query = "select * from complain";
    con.query(query,callback);
 }


 










// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//         user: 'root',
//         password: '',
//      database: 'hmsystem',
// });

// const username = 'victor';
// const email = 'vibeojo@gmail.com';
// const password = '12345678';
// const status = 'not_verified';

// const query = `INSERT INTO users (username, email, password, email_status) VALUES ('${username}', '${email}', '${password}', '${status}')`;

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database: ' + err.stack);
//     return;
//   }

//   console.log('Connected to the database.');

//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error executing the query: ' + error.stack);
//       return;
//     }

//     console.log('Query executed successfully.');
//     // Additional code for handling the query results or performing other operations

//     connection.end((endError) => {
//       if (endError) {
//         console.error('Error closing the database connection: ' + endError.stack);
//         return;
//       }

//       console.log('Database connection closed.');
//     });
//   });
// });
