const express = require('express');
const router = express.Router();
const User = require('../models/user');


//HTTP requests

//POST request
router.post('/', (req, res) => {
    var newUser = new User( {
        email : req.body.email,
        password : req.body.password
    });

    newUser.save((err) => {
        if(err) throw err;
        res.json({ user: 'Created!' });
    });

});

//GET request
router.get('/', (req,res) => {
    User.find({}, (err, users) => {
        if (err) throw err;
        res.json(users);
    });
});


module.exports = router;