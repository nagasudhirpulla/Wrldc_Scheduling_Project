var express = require('express');
var router = express.Router();
var Entitlement = require('../models/entitlement.js');

router.get('/get', function (req, res) {
    if (!(req.query.date && req.query.buyer_id)) {
        console.log('insufficient parameters for querying in the url for entitlements controller...')
    }
    console.log('Request for entitlement for date %s having the entity with id %s as a buyer', req.query.date, req.query.buyer_id);
    Entitlement.get('NULL', req.query.buyer_id, 'NULL', 'NULL', 'NULL', new Date(req.query.date), function (err, rows) {
        if (err) {
            res.send({'Error': err});
        }
        res.json({'entitlements': rows});
    });
});

module.exports = router;