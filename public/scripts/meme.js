/**
 * Global state variables
 */
var commentIndex;
var comments = [];

var COMMENTS_URL = '/api/comments' + window.location.pathname;

/**
 *
 * @param direction
 */
function render(direction) {

  var $first = $('.first');
  var $second = $('.second');
  var $both = $first.add($second);
  var $formStatus = $('.form-status');

  $formStatus.html('');
  // Use modulo (%) to make sure index stays between 0 and comments.length - 1.
  commentIndex = (commentIndex + direction + comments.length) % comments.length;

  //current comment
  var comment = comments[commentIndex];

  function slideInNew() {
    // send the element off the screen to the right
    $both.css({
      left: direction * 1000 + 'px'
    });
    // set its content to the new comment
    $first.html(comment.first);
    $second.html(comment.second);
    // animate it back in to center
    $both.animate({
      duration: 'fast',
      left: '0px'
    });
  }

  //send existing comment element off the screen to the left
  $both.animate({
    left: direction * -1000 + 'px'
  }, {
    duration: 'fast',
    complete: slideInNew
  });

}

function onSubmit(event) {

  event.preventDefault();

  var data = {};
  $(this).serializeArray().map(function (x) {
    data[x.name] = x.value;
  });

  var $formStatus = $('.form-status');

  if(!(data.first && data.second)) {
    $formStatus.html('Both fields are required');
    return;
  }

  var $form = $(this);

  $.ajax({
    type: 'POST',
    url: COMMENTS_URL,
    data: data,
    success: function() {
      $form[0].reset();
      comments.splice(commentIndex, 0, data);
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

  $('form').on('submit', onSubmit);
}

/**
 * Fetch the data using AJAX. When the data is received, store it in the
 * "comments" global variable and render the comment viewer to the DOM.
 */
$.ajax({
  url: COMMENTS_URL,
  success: function(data) {
    comments = data;
    commentIndex = 0;
    $(document).ready(onReady);
  }
});

