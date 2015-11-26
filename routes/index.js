var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var images = require('../lib/images');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Meme-Me', images: images });
});

module.exports = router;
