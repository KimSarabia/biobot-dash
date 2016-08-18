'use strict';

var fs = require('fs');
var path = require('path');

const DATAFILE = path.join(__dirname, '../bioprint-data.json');

var Bioprint = {};

Bioprint.write = function(bioprints, cb) {
  fs.writeFile(DATAFILE, JSON.stringify(bioprints), function(err){
    cb(err)
  });
};

Bioprint.find = function(cb) {
  fs.readFile(DATAFILE, function(err, data){
    var bioprints = JSON.parse(data);
    cb(bioprints);
  });
};

module.exports = Bioprint;
