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

exports.removeById = function(id, cb) {
    if (!id) return cb('Bioprint id required.');

    this.findAll((err, bioprints) => {
        if (err) return cb(err);

        bioprints = bioprints.filter(bioprint => bioprint.print_info.files.input !== id);

        fs.writeFile(DATAFILE, JSON.stringify(bioprints), err => {
            cb(err);
        });
    });
};

exports.create = function(bioprint, cb) {
  console.log(bioprint); // req.body

  // {'bioprint.print_data.deadPercent': ..., 'bioprint.print_data.elasticity': ..., ......}

    if (!bioprint['bioprint.print_data.deadPercent'] ||
        !bioprint['bioprint.print_data.elasticity'] ||
        !bioprint['bioprint.print_data.livePercent'] ||
        !bioprint['bioprint.print_info.crosslinking.cl_duration'] ||
        !bioprint['bioprint.print_info.crosslinking.cl_enabled'] ||
        !bioprint['bioprint.print_info.crosslinking.cl_intensity'] ||
        !bioprint['bioprint.print_info.files.input'] ||
        !bioprint['bioprint.print_info.files.output'] ||
        !bioprint['bioprint.print_info.pressure.extruder1'] ||
        !bioprint['bioprint.print_info.pressure.extruder2'] ||
        !bioprint['bioprint.print_info.resolution.layerHeight'] ||
        !bioprint['bioprint.print_info.resolution.layerNum'] ||
        !bioprint['bioprint.print_info.wellplate'] ||
        !bioprint['bioprint.user_info.email'] ||
        !bioprint['bioprint.user_info.serial']
      ) {
        return cb('Missing fields.');
    }

    this.findAll((err, bioprints) => {
        if (err) {
            return cb(err);
        }
        var newBioprint = {
          print_data: {
            deadPercent: bioprint['bioprint.print_data.deadPercent'],
            elasticity: bioprint['bioprint.print_data.elasticity'],
            livePercent: bioprint['bioprint.print_data.livePercent']
          },
          print_info: {
            crosslinking: {
              cl_duration: bioprint['bioprint.print_info.crosslinking.cl_duration'],
              cl_enabled: bioprint['bioprint.print_info.crosslinking.cl_enabled'],
              cl_intensity: bioprint['bioprint.print_info.crosslinking.cl_intensity']
            },
            files: {
              input: bioprint['bioprint.print_info.files.input'],
              output: bioprint['bioprint.print_info.files.output'],
            },
            pressure: {
              extruder1: bioprint['bioprint.print_info.pressure.extruder1'],
              extruder2: bioprint['bioprint.print_info.pressure.extruder2'],
            },
            resolution: {
              layerHeight: bioprint['bioprint.print_info.resolution.layerHeight'],
              layerNum: bioprint['bioprint.print_info.resolution.layerNum'],
            },
            wellplate: bioprint['bioprint.print_info.wellplate'],
        },
          user_info: {
            email: bioprint['bioprint.user_info.email'],
            serial: bioprint['bioprint.user_info.serial']
          }
        };

        bioprints.push(newBioprint);
        fs.writeFile(DATAFILE, JSON.stringify(bioprints), err => {
            cb(err);
        });
    });
};

exports.updateById = function(id, newBioprint, cb) {
    if (!id) return cb('Bioprint id required.');

    if (!newBioprint.print_data.deadPercent ||
        !newBioprint.print_data.elasticity ||
        !newBioprint.print_data.livePercent ||
        !newBioprint.print_info.crosslinking ||
        !newBioprint.print_info.crosslinking ||
        !newBioprint.print_info.crosslinking ||
        !newBioprint.print_info.files.input ||
        !newBioprint.print_info.files.output ||
        !newBioprint.print_info.pressure.extruder1 ||
        !newBioprint.print_info.pressure.extruder2 ||
        !newBioprint.print_info.resolution.layerHeight ||
        !newBioprint.print_info.resolution.layerNum ||
        !newBioprint.print_info.wellplate ||
        !newBioprint.user_info.email ||
        !newBioprint.user_info.serial
      ) {
        return cb('Missing fields');
    }

    this.findAll((err, bioprints) => {
        bioprints = bioprints.map(bioprint => {
            if (bioprint.print_info.files.input === id) {
                return newBioprint;
            }
            return bioprint;
        });

        fs.writeFile(DATAFILE, JSON.stringify(bioprints), err => {
            cb(err);
        });
    });
};
