var lambdaFunc = require('./handler.js');
var lambda = require('lambda-wrapper').wrap(lambdaFunc);
var test = require('blue-tape');
var supertest = require('supertest');


test('meetup-service', function (te) {
    var request = supertest('http://localhost:3000');

    test('When receives DELETE', function (t) {
        request
            .delete('/api/meetups')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                t.error(err, 'No error');
                t.end();
            });
    });

    test('When receives GET', function (t) {
        request
            .get('/api/meetups')
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function (err, res) {
                t.error(err, 'No error');
                t.same(res.body, {"errorCode": 500, "reason": "We don't support listing all meetups yet."});
                t.end();
            });

    });
    test('When recieves POST', function (t) {
        request
	    .post('/api/meetups')
	    .send({userId:'barpet'})
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function (err, res) {
                t.error(err, 'No error');
                t.same(res.body, {});
                t.end();
	});
    });
    te.end();
});




