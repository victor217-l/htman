 var express = require('express');
 var jwt = require('jsonwebtoken');
 require('dotenv').config()
 
 
 const authtoken = function authenicateToken(req, res, next)   {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split('')[1]
   if(token == null ) res.sendStatus(401)

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) res.sendStatus(401)
    req.user = user;
    next()
   })
}

module.exports = authtoken;