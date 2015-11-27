var express = require('express');
var router = express.Router();

var comments = require('../lib/comments');

// This router gets mounted under /api

router.get('/comments/:id', function(req, res) {
  res.send(comments.read(req.params.id));
});

router.post('/comments/:id', function(req, res) {

  var comment = req.body;

  // Check if data is valid before writing to database
  if(comment.first && comment.second) {
    res.send(200);
    comments.write(req.params.id, comment);
    return;
  }

  // Bad data
  res.status(400).send('Fields cant be empty');

});


// Admin endpoint for resetting data to factory default
router.get('/reset', function(req, res) {

  comments.reset();

  res.sendStatus(200);

});

module.exports = router;
