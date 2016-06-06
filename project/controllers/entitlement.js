var express = require('express');
var router = express.Router();
var Entitlement = require('../models/entitlement.js');

router.get('/', function (req, res) {
    console.log('Request for entitlement for date %s having the entity with id %s as a buyer', req.query.date, req.query.buyer_id);
    res.send();
});

module.exports = router;