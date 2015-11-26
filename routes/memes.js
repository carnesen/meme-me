var express = require('express');
var router = express.Router();

var images = require('../lib/images');

images.forEach(function(image, index, arr) {
  router.get('/' + image.id, function(req, res) {
    res.render('meme', { image: image });
  });

});


module.exports = router;
