var express = require('express');
var router = express.Router();
var Revision_detail = require('../models/revision_detail');

router.get('/getmax', function (req, res) {
    if (!req.query.date) {
        res.json({'Error': 'insufficient parameters for querying in the url for getting Maximum revision'});

    }
    Revision_detail.getMaxRevision(new Date(req.query.date), function (err, maxRev) {
        if (err) {
            res.send({'Error': err});
        }
        res.json({'maxRevision': maxRev});
    });
});

module.exports = router;