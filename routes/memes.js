var express = require('express');
var router = express.Router();

var images = require('../lib/images');

// Router for individual meme pages, e.g. /good_guy_greg
images.forEach(function(image) {
  router.get('/' + image.id, function(req, res) {
    res.render('meme', { image: image });
  });
});


module.exports = router;
