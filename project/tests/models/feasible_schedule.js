var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Revision_detail = require('../../models/revision_detail');
var Feasible_schedule = require('../../models/feasible_schedule');

describe('Feasible_schedule Model', function () {
    var newRevision;
    var testDate;
    it('should create a feasible schedule for today and get the created data back from server', function () {
        testDate = new Date();
        Revision_detail.create(testDate, "Feasible_schedule TEST COMMENT", function (err, revision) {
            expect(err).to.equal(null);
            newRevision = revision;
            console.log('Feasible_schedule model claimed a new revision ' + revision);
            Feasible_schedule.create(1996, 13, 1, 1, 1, 1, testDate, newRevision, function (err, resultId) {
                expect(err).to.equal(null);
                console.log("Feasible_schedule test created a new Feasible schedule with id " + resultId + " claiming a revision number " + revision);
                Feasible_schedule.get(1, 1, 'NULL', 1, testDate, newRevision, function (err, rows) {
                    expect(err).to.equal(null);
                    console.log("Feasible_schedule Model returned data " + JSON.stringify(rows));
                });
            });
        });
    });
});