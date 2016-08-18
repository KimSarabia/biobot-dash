'use strict';

var express = require('express');
var router = express.Router();
var Bioprint = require('../models/bioprint');
var User = require('../models/user');


router.get('/:user', (req, res, next) => {
    var user = req.params.user;

    User.findUser(user, (err, bioprint) => {
        if (err || !bioprint) {
            return res.status(400).send(err || 'User not found in database.');
        }
        res.send(user);
    });
})


module.exports = router;
