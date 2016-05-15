var lambdaFunc = require('./handler.js');
var lambda = require('lambda-wrapper').wrap(lambdaFunc);
var test = require('blue-tape');
var supertest = require('supertest');


test('meetup-service v1', function (te) {
    var request = supertest('http://localhost:3000');

    test('When receives DELETE', function (t) {
        request
            .delete('/api/meetups')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                t.error(err, 'should be error');
                t.end();
            });
    });

    test('When receives GET', function (t) {
        request
            .get('/api/meetups')
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function (err, res) {
                t.error(err, 'should be error');
                t.same(res.body, {"errorCode": 500, "reason": "We don't support listing all meetups yet."});
                t.end();
            });

    });
    test('When recieves POST', function (t) {
        request
	    .post('/api/meetups')
	    .send({apiVersion: 1,data:{ userId:'barpet', state:'NEW', correlationId: '123'}})
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                //todo validate the
                t.same(res.body.apiVersion,1);
                t.same(res.body.data.userId, 'barpet');
                t.same(res.body.data.state, 'NEW');
                t.end();
	});
    });
    te.end();
});




