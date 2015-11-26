var express = require('express');
var router = express.Router();

var comments = require('../lib/comments');

router.get('/:id', function(req, res) {
  res.send(comments.read(req.params.id));
});

module.exports = router;
