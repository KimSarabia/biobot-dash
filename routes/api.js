var express = require('express');
var router = express.Router();

router.use('/bioprints', require('./bioprints'));

module.exports = router;
