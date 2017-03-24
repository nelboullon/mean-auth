const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const jwt =require('jsonwebtoken');

const secrets = require('../../config/secrets');

//HTTP requests

//POST requests
router.post('/', (req, res) => {

    console.log(req.body);

    //Find the user
    User.findOne({

        email: req.body.email,
        password: req.body.password

    },(err, user) => {

        if (err) throw err;

        if (!user) {

            res.json({ success: false, message: 'Authentication failed. User not found or wrong password.' });

        } else if (user) {

            //If user is found and password is right

            //Create a token
            var token = jwt.sign(user, secrets.secret, {
                expiresIn: '1440m'
            });

            //Return the information including token as JSON 
            res.status(200).send({
            token: token
        });

        }

    });
});


module.exports = router;