const express = require('express');
const router = express.Router();
const User = require('../../models/user');

const authentication = require('../../config/authentication');

router.use(authentication);

//HTTP requests

//POST request
router.post('/', (req, res, authentication) => {

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
router.get('/', (req, res, authentication) => {

        User.find({}, (err, users) => {
            if (err) throw err;
            res.json(users);
        });
});


module.exports = router;