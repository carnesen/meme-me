var fs = require('fs');
var path = require('path');

var yaml = require('js-yaml');

// Location where the comment data gets stored on disk
var filePath = path.join('/tmp', 'comments.json');

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
  _data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch(e) {
  // If it fails, load defaults.
  console.log(e);
  loadDefaults();
}

/**
 * The exported object: Methods for reading and writing comment data
 */
var comments = {

  // Write a new comment for an id
  write: function(id, comment) {

    // if this id already exists in the _data
    if (_data.hasOwnProperty(id)) {
      _data[id].unshift(comment);
      return;
    }

    // First comment for this id
    _data[id] = [comment];

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


/**
 * New comments submitted from the front end are held in memory in the _data object.
 * This function runs every 10 seconds and writes ("flushes") the current data to disk.
 */
function flush() {

  setTimeout(function() {

    fs.writeFile(filePath, JSON.stringify(_data, null, 2), function(err) {

      if(err) {
        console.log(err)
      }

      console.log('Flushed data to disk');

      // Recursive call to flush
      flush();

    });

  }, 10000);

}

flush();

module.exports = comments;
