/**
 * Global variables
 */

var commentIndex; // Index of the comment currently displayed
var comments; // Array of all comments for the current meme
var commentsUrl = '/api/comments' + window.location.pathname; // AJAX API URL
var $first; // text element at the top of the image
var $second; // text element at the bottom of the image
var $comment; // union element for animations
var $formStatus; // form submission status element
var $form; // form element for submitting new memes

/**
 * Renders a meme comment to the template image.
 * @param direction +1 animates to the right, -1 for to the left
 */
function render(direction) {

  // status descriptor empty by default
  $formStatus.html('');

  // Increment commentIndex, use modulo (%) so index stays between 0 and comments.length - 1.
  commentIndex = (commentIndex + direction + comments.length) % comments.length;

  // New comment _data
  var comment = comments[commentIndex];

  // Animate current element off the screen
  $comment.animate({
    left: direction * -1000 + 'px'
  }, {
    duration: 'fast',
    complete: slideInNew
  });

  // Animates in the new comment. Runs after
  function slideInNew() {

    // Move element to off the screen on the other side
    $comment.css({
      left: direction * 1000 + 'px'
    });

    // Set its content to the new comment
    $first.html(comment.first);
    $second.html(comment.second);

    // Animate it back in to center
    $comment.animate({
      duration: 'fast',
      left: '0px'
    });

  }
}

/**
 * Function that runs when the user clicks submit on the form
 * @param event
 */
function onSubmit(event) {

  // prevent automatic submission and page reload
  event.preventDefault();

  // Get form form _data and convert it from key-value array to object
  var data = {};
  $form.serializeArray().map(function (x) {
    data[x.name] = x.value;
  });

  // Client-side form _data validation
  if(!(data.first && data.second)) {
    $formStatus.html('Both fields are required');
    return;
  }

  // Data looks good, let's POST it to the server
  $.ajax({

    type: 'POST',
    url: commentsUrl,
    data: data,

    success: function() {

      $form[0].reset();

      // Insert new element into comments store
      comments.splice(commentIndex, 0, data);

      // Re-render the meme with the new comment
      render(0);

      $formStatus.html('Submitted!');

    },

    error: function(e) {

      $formStatus.html(e.responseText);

    }

  });

}

/**
 * Function invoked when the DOM is ready
 */
function onReady() {

  $first = $('.first');
  $second = $('.second');
  $comment = $first.add($second);
  $formStatus = $('.form-status');
  $form = $('form');

  // render the initial comment
  render(0);

  // set up click handlers
  $('.right').on('click', function(event) {
    event.preventDefault();
    render(+1);
  });

  $('.left').on('click', function(event) {
    event.preventDefault();
    render(-1);
  });

  $form.on('submit', onSubmit);
}

/**
 * Main program. Fetch the comments _data for this meme using AJAX.
 */
$.ajax({

  url: commentsUrl,

  success: function(data) {

    // When the _data is received, store it in the "comments" global variable
    comments = data;

    // Set index to the most recent comment
    commentIndex = 0;

    // check that the document is ready and when so run the onReady function
    $(document).ready(onReady);
  }

});
