var express = require('express');
var router = express.Router();

var comments = require('../lib/comments');

router.get('/comments/:id', function(req, res) {
  res.send(comments.read(req.params.id));
});

router.post('/comments/:id', function(req, res) {
  var comment = req.body;
  if(comment.first && comment.second) {
    res.send(200);
    comments.write(req.params.id, comment);
    return;
  }
  // HARD MODE
  res.status(400).send('Fields cant be empty');
});

router.get('/reset', function(req, res) {
  comments.reset();
  res.sendStatus(200);
});

module.exports = router;
