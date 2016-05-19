var lambdaFunc = require('./../meetup-service/meetup-http.js');
var lambda = require('lambda-wrapper').wrap(lambdaFunc);
var test = require('blue-tape');
var supertest = require('supertest');

var request = supertest('http://localhost:3000');


/*************************************
 * MEET-UP CREATOR CREATES A MEET-UP *
 *************************************/

test('POST ', function (t) {
    request
        .post('/api/meetups')
        .send({apiVersion: 1, data: {version: 1, userId: 'barpet', correlationId: '123'}})
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function (err, res) {
            //todo validate the
            t.same(res.body.apiVersion, 1);
            t.same(res.body.data.userId, 'barpet');
            t.same(res.body.data.state, 'NEW');
            t.end();
        });
});



/************************************************
 * MEET-UP CREATOR ADDS A INVITEE *
 ************************************************/

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



/************************************************
 * MEET-UP CREATOR UPDATES A MEET-UP (PRE-LIVE) *
 ************************************************/

test('When receives POST', function (t) {
    request
        .post('/api/meetups')
        .send({apiVersion: 1, data: {userId: 'barpet', correlationId: '123'}})
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function (err, res) {
            //todo validate the
            t.same(res.body.apiVersion, 1);
            t.same(res.body.data.userId, 'barpet');
            t.same(res.body.data.state, 'NEW');
            t.end();
        });
});

/**************************************************
 * MEET-UP CREATOR MAKES THE MEET-UP LIVE! *
 *************************************************/

test('When receives POST', function (t) {
    request
        .post('/api/meetups')
        .send({apiVersion: 1, data: {userId: 'barpet', correlationId: '123'}})
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function (err, res) {
            //todo validate the
            t.same(res.body.apiVersion, 1);
            t.same(res.body.data.userId, 'barpet');
            t.same(res.body.data.state, 'NEW');
            t.end();
        });
});


/********************************************************
 * MEET-UP CREATOR TRIES TO UPDATE A MEET-UP POST-LIVE  *
 ********************************************************/

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

/*********************************************
 * MEET-UP CREATOR ADDS A INVITEE POST-LIVE  * 
 *********************************************/

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


/************************************************************
 * MEET-UP CREATOR VIEWS ONE OF THEIR MEET-UPS   *
 ************************************************************/

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


/****************************************************
 * MEET-UP CREATOR VIEWS A LIST OF THEIR MEET-UPS   *
 ****************************************************/

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
