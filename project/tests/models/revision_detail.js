var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Revision_detail = require('../../models/revision_detail');
var db = require('../../db');

describe('Revision_detail Model', function () {
    it('should give the maximum revision number for today', function () {
        Revision_detail.getMaxRevision(new Date(), function (err, maxRev) {
            console.log('Revision_detail model fetched the maximum revision as ' + maxRev);
            expect(err).to.equal(null);
        });
    });

    it('should create a new revision number for today', function () {
        Revision_detail.create(new Date(), "STORED PROC TEST COMMENT", function (err, result) {
            expect(err).to.equal(null);
            console.log('Revision_detail model created a new revision ' + result);
        });
    });

    it('should create a new revision number for today as a test for concurrency', function () {
        Revision_detail.create(new Date(), "STORED PROC TEST COMMENT CONCURRENCY", function (err, result) {
            expect(err).to.equal(null);
            console.log('Revision_detail model created a new revision ' + result);
        });
    });

    it('should fetch all revision details for today', function () {
        Revision_detail.getAllOnDate(new Date(), function (err, rows) {
            //console.log("Revision details attributes are " + Object.keys(rows[0]));
            expect(err).to.equal(null);
        });
    });
});
