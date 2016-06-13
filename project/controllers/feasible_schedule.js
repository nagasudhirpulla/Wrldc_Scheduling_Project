var express = require('express');
var router = express.Router();
var Feasible_schedule = require('../models/feasible_schedule.js');

router.get('/getforrevision', function (req, res) {
    var seller_id, buyer_id, trader_id, transaction_type_id, revision;
    if (!(req.query.date)) {
        res.json({'Error': 'insufficient parameters for querying in the url for feasible schedules'});
    }
    if (!(req.query.seller_id)) {
        seller_id = 'NULL';
    } else {
        seller_id = req.query.seller_id;
    }
    if (!(req.query.buyer_id)) {
        buyer_id = 'NULL';
    } else {
        buyer_id = req.query.buyer_id;
    }
    if (!(req.query.trader_id)) {
        trader_id = 'NULL';
    } else {
        trader_id = req.query.trader_id;
    }
    if (!(req.query.transaction_type_id)) {
        transaction_type_id = 'NULL';
    } else {
        transaction_type_id = req.query.transaction_type_id;
    }
    if (!(req.query.revision)) {
        revision = 'NULL';
    } else {
        revision = req.query.revision;
    }
    Feasible_schedule.getForRevision(seller_id, buyer_id, trader_id, transaction_type_id, new Date(req.query.date), revision, function (err, rows) {
        if (err) {
            res.send({'Error': err});
        }
        res.json({'feasible_schedules': rows});
    });
});

module.exports = router;