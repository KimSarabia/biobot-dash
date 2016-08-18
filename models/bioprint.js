'use strict';

var fs = require('fs');
var path = require('path');

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

exports.findById = function(id, cb) {
    if (!id) return cb('Bioprint id required.');
    this.findAll((err, bioprints) => {
        if (err) return cb(err);
        var bioprint = bioprints.filter(bioprint => bioprint.print_info.files.input === id)[0];
        cb(null, bioprint);
    });
};
