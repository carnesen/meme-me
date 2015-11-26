var fs = require('fs');
var path = require('path');

var FILE_PATH = path.join(__dirname, 'data.json');
var FLUSH_INTERVAL = 10000;

var data = require(FILE_PATH);

var database = {

  write: function(key, value) {

    if (data.hasOwnProperty(key)) {
      data[key].push(value);
    } else {
      data[key] = [value];
    }

  },

  read: function(key) {
    return data[key];
  },

  list: function() {
    return Object.keys(data);
  }

};

(function flush() {
  fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Flushed data to disk');
    }
    setTimeout(flush, FLUSH_INTERVAL);
  });
})();


module.exports = database;
