'use strict';

var express = require('express');
var router = express.Router();
var Bioprint = require('../models/bioprint');
var dotize = require('dotize');



router.get('/', (req, res, next) => {
    Bioprint.findAll((err, bioprints) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send(bioprints);
    })
});

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Bioprint.findById(id, (err, bioprint) => {
        if (err || !bioprint) {
            return res.status(400).send(err || 'Bioprint not found.');
        }
        res.send(bioprint);
    })
});

router.post('/', (req, res, next) => {
  Bioprint.findAll((err, bioprints) => {
      if (err) {
          return res.status(400).send(err);
      }

      Bioprint.create(dotize.convert({bioprint: req.body}), err => {
          if (err) return res.status(400).send(err);
          res.send();
      });
  });
});

router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    Bioprint.findById(id, (err, bioprint) => {
        if (err || !bioprint) {
            return res.status(400).send(err || 'Bioprint not found.');
        }
        Bioprint.updateById(id, req.body, err => {
            res.send(bioprint);
        });
    });
});

router.delete('/:id', (req, res, next) => {
    var id = req.params.id;
    Bioprint.findById(id, (err, bioprint) => {
        if (err || !bioprint) {
            return res.status(400).send(err || 'Bioprint not found.');
        }
        Bioprint.removeById(id, err => {
            if (err) return res.status(400).send(err);
            res.send(bioprint);
        });
    });
});

module.exports = router;
