var fs = require('fs');
var path = require('path');

var yaml = require('js-yaml');

var FLUSH_INTERVAL = 10000;

var FILE_PATH = path.join('/tmp', 'comments.json');

var data;

try {
  data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
} catch(e) {
  console.log(e);
  data = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'comments.yml')));
}

var comments = {

  write: function(id, payload) {
    if (data.hasOwnProperty(id)) {
      data[id].push(payload);
    } else {
      data[id] = [payload];
    }
  },

  read: function(id) {
    return data[id];
  },

  list: function() {
    return Object.keys(data);
  }

};

function flush() {

  setTimeout(function() {

    fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), function(err) {
      if(err) {
        console.log(err)
      }
      console.log('Flushed data to disk');
      flush();
    });

  }, FLUSH_INTERVAL);

}

flush();

module.exports = comments;
