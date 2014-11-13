/*jshint node:true*/
'use strict';

process.env.MONGO_URL = 'mongodb://localhost/notes_test';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('basic notes crud', function() {
    var id;
    var jwttoken;
    it('should create a user', function(done) {
        chai.request('http://localhost:3000')
        .post('/api/users')
        .send({email: '123@example.com', password: 'password123'})
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body).to.have.property('jwt');
            jwttoken = res.body.jwt;
            done();
        });

        it('should be able to create a note', function(done) {
            chai.request('http://localhost:3000')
            .post('/v1/api/notes')
            .send({noteTitle: 'firstTitle', noteBody: 'hello world'})
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body.noteBody).to.eql('hello world');
                expect(res.body).to.have.property('_id');
                id = res.body._id;
                done();
            });
        });

        it('should be able to get an index', function(done) {
            chai.request('http://localhost:3000')
            .get('v1/api/notes')
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(Array.isArray(res.body)).to.be.true;
                done();
            });
        });

        it('should be able to get a single note', function(done) {
            chai.request('http://localhost:3000')
            .get('v1/api/notes/' + id)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body.noteBody).to.eql('hello world');
                done();
            });
        });

        it('should be able to update a note', function(done) {
            chai.request('http://localhost:3000')
            .put('v1/api/notes/' + id)
            .send({noteBody: 'new note body'})
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body.noteBody).to.eql('new note body');
                done();
            });
        });

        it('should be able to destroy a note', function(done) {
            chai.request('http://localhost:3000')
            .delete('v1/api/notes/' + id)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql('success!');
                done();
            });
        });
    });
});
