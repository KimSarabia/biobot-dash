'use strict';

var express = require('express');
var router = express.Router();
var Bioprint = require('../models/bioprint');

router.get('/', function(req, res, next) {
  Bioprint.find(function(bioprints){
    res.send(bioprints);
  })
});

router.get('/:bioprintindex', function(req, res) {
  var index = parseInt(req.params.bioprintindex);
  Bioprint.find(function(bioprints){
    bioprints[index] = req.body;
    res.send(bioprints[index]);
  });
});

router.post('/', function(req, res, next) {
  Bioprint.find(function(bioprints){
    bioprints.push(req.body);
    Bioprint.write(bioprints, function(err){
      res.status(err ? 400 : 200).send(err || bioprints);
    })
  })
});

router.delete('/:bioprintindex', function(req, res) {
  var index = parseInt(req.params.bioprintindex);

  Bioprint.find(function(bioprints){
    bioprints.splice(index, 1);

    Bioprint.write(bioprints, function(err){
      res.send(bioprints);
    });
  });
});

router.put('/:bioprintindex', function(req, res) {
  var index = parseInt(req.params.bioprintindex);

  Bioprint.find(function(bioprints){
    bioprints[index] = req.body;

    Bioprint.write(bioprints, function(err){
      res.send(bioprints);
    });
  });
});


module.exports = router;
