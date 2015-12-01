var fs = require('fs');
var path = require('path');

var imagesDir = path.join(__dirname, '..', 'public', 'images', 'memes');

// Get images directory listing and massage into array of objects
var images = fs.readdirSync(imagesDir).map(function(elem) {
  var id = elem.split('.')[0];
  return {
    url: 'images/memes/' + elem,
    id: id,
    title: id.replace(/_/g, ' ')
  }
});

module.exports = images;
