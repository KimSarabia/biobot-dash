'use strict';

var express = require('express');
var router = express.Router();
var Bioprint = require('../models/bioprint');
var User = require('../models/user');



router.get('/:user', (req, res, next) => {
    var user = req.params.user;

    User.findAllByUser(user, (err, bioprints) => {
        if (err || !bioprints) {
            return res.status(400).send(err || `No bioprints by user.`);
        }
        res.send(bioprints);
    });
})


router.get('/', (req, res, next) => {
  console.log(1234);
    User.getAllUsers((err, bioprints) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send(bioprints);
    })
  })




module.exports = router;
