var fs = require('fs');
var path = require('path');

var yaml = require('js-yaml');

// Location where the comment data gets stored on disk
var filePath = path.join('/tmp', 'comments.yml');

/**
 * Store for comments data, has shape like this:
 *
 *   {
 *     "good_guy_greg": [
 *       {
 *        "first": "finishes the pot of coffee",
 *        "second": "starts a new one"
 *       },
 *       {
 *        ...
 *       }
 *     ],
 *     ...
 *   }
 */
var _data;

// Function that loads the default comments from a yml file in this directory
function loadDefaults() {
  _data = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'comments.yml')));
}

// Try to load the _data from filePath.
try {
  _data = yaml.load(fs.readFileSync(filePath, 'utf8'));
} catch(e) {
  // If it fails, load defaults.
  if (e.code !== 'ENOENT') {
    console.log(e);
  }
  loadDefaults();
}

/**
 * The exported object: Methods for reading and writing comment data
 */
var comments = {

  // Write a new comment for an id
  write: function(id, comment) {

    if (_data.hasOwnProperty(id)) {
      // This id already exists in _data
      _data[id].unshift(comment);
    } else {
      // First comment for this id
      _data[id] = [comment];
    }

    fs.writeFileSync(filePath, yaml.dump(_data, null, 2));

  },

  // Read all comments for a given id
  read: function(id) {
    return _data[id];
  },

  // Reset data to initial state
  reset: function() {
    loadDefaults();
  }

};

module.exports = comments;
