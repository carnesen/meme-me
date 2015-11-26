var fs = require('fs');
var path = require('path');

var imagesDir = path.join(__dirname, '..', 'public', 'images');
var images = fs.readdirSync(imagesDir).map(function(elem) {
  var id = elem.slice(0, -4);
  return {
    url: 'images/' + elem,
    id: id,
    title: id.replace(/_/g, ' ')
  }
});

module.exports = images;
