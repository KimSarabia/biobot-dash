'use strict';

var express = require('express');
var router = express.Router();
var Bioprint = require('../models/bioprint');
var User = require('../models/user');


router.get('/:id', (req, res, next) => {
    var id = req.params.id;

    User.findUser(id, (err, bioprint) => {
        if (err || !bioprint) {
            return res.status(400).send(err || 'Bioprint not found.');
        }
        res.send(bioprint);
    });
})


module.exports = router;
