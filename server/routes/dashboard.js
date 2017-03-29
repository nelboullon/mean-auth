const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());

router.get('/', (req, res) => {
    res.json({User: 'Authenticated with SalesForce!'});
});

router.post('/', (req, res) => {
    res.json({User: 'Authenticated with SalesForce!'});
});

module.exports = router;