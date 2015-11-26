var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var images = require('../lib/images');

router.get('/', function(req, res, next) {
  res.render('index', { images: images });
});

module.exports = router;
