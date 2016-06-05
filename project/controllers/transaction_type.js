var express = require('express');
var router = express.Router();
var Transaction_type = require('../models/transaction_type.js');

router.get('/types', function (req, res) {
    Transaction_type.getAll(function (err, rows) {
        if (err) {
            res.send({'Error': err});
        }
        res.json({'transaction_types': rows});
    });
});

module.exports = router;