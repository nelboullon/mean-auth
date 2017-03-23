const express = require('express');
const router = express.Router();
const User = require('../../models/user');

const authentication = require('../../config/authentication');

router.use(authentication);

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
router.get('/', (req, res, authentication) => {

    if (authentication = true) {

        User.find({}, (err, users) => {
            if (err) throw err;
            res.json(users);
        });

    } else {
        res.json(authentication);
    }
});


module.exports = router;