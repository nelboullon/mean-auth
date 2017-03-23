const express = require('express');
const jwt = require('jsonwebtoken');

const secrets = require('./secrets');

//Route middleware to verify a token
module.exports = function(req, res, next)  {

    //Check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //Decode token
    if (token) {

        //Verifies secret and checks exp 
        jwt.verify(token, secrets.secret, (err, decoded) => {
            if (err) {
                return res.json({ success:false, message: 'Failed to authenticate token.' });                
            } else {
                //If everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();                
            }
        });


    } else {

        //If there is no token
        //Return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }


};
