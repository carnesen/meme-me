var express = require('express');
var router = express.Router();

var comments = require('../lib/comments');

router.get('/comments/:id', function(req, res) {
  res.send(comments.read(req.params.id));
});

router.post('/comments/:id', function(req, res) {
  res.send(200);
  comments.write(req.params.id, req.body);
});

module.exports = router;
