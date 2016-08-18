'use strict';

var express = require('express');
var router = express.Router();
var Bioprint = require('../models/bioprint');

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
    });
})

module.exports = router;
