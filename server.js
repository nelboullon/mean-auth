const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const secrets = require('./server/config/secrets');

const app = express();

//Database connection
mongoose.connect(secrets.db);

//Enabling cors
app.use(cors());

//Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Point static path to dist
//app.use(express.static('dist'));

//TODO: Get routes
//const api = require('./server/api');
const users = require('./server/routes/api/users');
const auth = require('./server/routes/api/authenticate');
const dashboard = require('./server/routes/dashboard');

//TODO: Set api routes
//app.use('/api', api);
app.use('/api/users', users);
app.use('/api/authenticate', auth);
app.use('/dashboard', dashboard);

//Get port from enviroment and store in express
const port = process.env.PORT || 5000;
app.set('port', port);

//Set basic route
app.get('/',(req,res) => {
    res.send('MEAN OAuth API at http://localhost:' + port + '/api' );
});

//Start the server
app.listen(port);
console.log('App running at http://localhost:' + port)