'use strict';

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
var _ = require('underscore');


const JWT_SECRET = "test";

const DATAFILE = path.join(__dirname, '../bioprint-data.json');

exports.findAll = function(cb) {
    fs.readFile(DATAFILE, (err, data) => {
        if (err) {
            cb(err);
            return;
        }
        try {
            var bioprints = JSON.parse(data);
        } catch (err) {
            return cb(err);
        }
        cb(null, bioprints);
    })
};


//show all submissions by user
exports.findAllByUser = function(user, cb) {
    if (!user) return cb('Bioprint id required.');
    this.findAll((err, bioprints) => {
        if (err) return cb(err);
        var bioprintByUser = bioprints.filter(bioprint => bioprint.user_info.email === user);
        cb(null, bioprintByUser);
    });
};

//show only users
exports.getAllUsers = function(cb) {
    this.findAll((err, bioprints) => {
        if (err) return cb(err);
        var bioprints = _(bioprints).map((item) => {
          return item.user_info;
        });
        console.log(4321);
        cb(null, bioprints);
    });
};

//remove user
