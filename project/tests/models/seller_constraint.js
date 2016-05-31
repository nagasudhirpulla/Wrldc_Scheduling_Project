var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Revision_detail = require('../../models/revision_detail');
var Seller_constraint = require('../../models/seller_constraint');

describe('Seller_constraint', function () {
    it('should create a seller constraint for today', function () {
        Revision_detail.create(new Date(), "Seller_constraint TEST COMMENT", function (err, revision) {
            expect(err).to.equal(null);
            console.log('Seller_constraint model claimed a new revision ' + revision);
            Seller_constraint.create(1991, new Date(), revision, 13, 1, 1, function (err, result) {
                expect(err).to.equal(null);
                console.log("Seller_constraint test created a new seller constraint with id " + result + " claiming a revision number " + revision);
            });
        });
    });
});

/*
 Seller_constraint.create(100, new Date(), newRev, 1, 1, 1, function (err, result) {
 expect(err).to.equal(null);
 });
 */