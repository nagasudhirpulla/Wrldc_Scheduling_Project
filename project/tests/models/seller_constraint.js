var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Revision_detail = require('../../models/revision_detail');
var Seller_constraint = require('../../models/seller_constraint');

describe('Seller_constraint Model', function () {
    var newRevision;
    var testDate;
    var entity_id = 1;
    var constraint_type_id = 1;
    it('should create a seller constraint for today and get the created data back from server', function () {
        testDate = new Date();
        Revision_detail.create(testDate, "Seller_constraint TEST COMMENT", function (err, revision) {
            expect(err).to.equal(null);
            newRevision = revision;
            console.log('Seller_constraint model claimed a new revision ' + revision);
            Seller_constraint.create(1991, new Date(), revision, 13, entity_id, constraint_type_id, function (err, resultId) {
                expect(err).to.equal(null);
                console.log("Seller_constraint test created a new seller constraint with id " + resultId + " claiming a revision number " + revision);
                Seller_constraint.get(testDate, newRevision, entity_id, constraint_type_id, function (err, rows) {
                    expect(err).to.equal(null);
                    console.log("Seller_constraint Model returned data " + JSON.stringify(rows));
                });
            });
        });
    });
});
