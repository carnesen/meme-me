var express = require('express');
var router = express.Router();

var images = require('../lib/images');

router.get('/', function(req, res) {
  res.render('index', { images: images });
});

module.exports = router;
