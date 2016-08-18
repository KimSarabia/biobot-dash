'use strict';

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');

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
        bioprints.reverse();
        cb(null, bioprints);
    })
};

exports.findUser = function(user, cb) {
    if (!user) return cb('Bioprint id required.');
    this.findAll((err, bioprints) => {
        if (err) return cb(err);
        var bioprint = bioprints.filter(bioprint => bioprint.user_info.email === user)[0];
        cb(null, bioprint);
    });
};
