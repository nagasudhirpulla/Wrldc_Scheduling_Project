var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Entitlement = require('../../models/entitlement');
var ArrayHelper = require('../../helpers/arrayHelper');

describe('Entitlement Model', function () {
    it('should create an entitlement for today and get the created data back from server', function () {
        Entitlement.create(1992, 92, 1, 1, 1, 1, new Date(), new Date(), 0, 'ENTITLEMENT_MODEL_TEST_' + Date.now(), function (err, resultId) {
            expect(err).to.equal(null);
            console.log("Entitlement Model test created a new entitlement with id " + resultId);
            Entitlement.get(1, 1, 1, 1, 'NULL', new Date(), function (err, rows) {
                expect(err).to.equal(null);
                //console.log("Entitlement Model get method returned data " + JSON.stringify(rows));
            });
        });
    });
    it('should create multiple entitlements for today and get the created data back from server', function () {
        var CAFSE = ArrayHelper.createArrayFromSingleElement;
        Entitlement.createMultiple(CAFSE(1992, 3), [1, 15, 35], CAFSE(1, 3), CAFSE(1, 3), CAFSE(1, 3), CAFSE(1, 3), CAFSE(new Date(), 3), CAFSE(new Date(), 3), CAFSE(0, 3), CAFSE('ENTITLEMENT_MODEL_TEST_MULTIPLE' + Date.now(), 3), function (err, result) {
            expect(err).to.equal(null);
            console.log("Entitlement Model multiple creation test created " + result.affectedRows + " entitlements");
            Entitlement.get(1, 1, 1, 1, 'NULL',  new Date(), function (err, rows) {
                expect(err).to.equal(null);
                //console.log("Entitlement Model get method returned data " + JSON.stringify(rows));
            });
        });
    });
    it('should fail to create an entitlement for today with from_date > to_date', function () {
        Entitlement.create(1992, 92, 1, 1, 1, 1, new Date(Date.now() + 86400000), new Date(), 0, 'ENTITLEMENT_MODEL_TEST_' + Date.now(), function (err, resultId) {
            expect(err).to.not.equal(null);
            console.log("Entitlement Model error for from date less than to date is " + err);
        });
    });
    it('should get all entitlements for today with transaction_type 1', function () {
        Entitlement.getAllEntitlementsOnDate(1, new Date(), function (err, rows) {
            expect(err).to.equal(null);
            console.log("Entitlement Model getAllEntitlementsOnDate method returned " + rows.length + " rows");
            //console.log("Entitlement Model getAllEntitlementsOnDate method returned data " + JSON.stringify(rows));
        });
    });
});