var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/bioprints', require('./bioprints'));

module.exports = router;
