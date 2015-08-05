angular.module('giltApp', ['MainCtrl', 'TestService']);

$('.mostexp').on('click', function(){

  $('mix').removeAttr('ng-repeat').attr('ng-repeat',"item in data | orderBy:-'sale_price'");

});



$(function(){
  $('#Container').mixItUp({
    animation: {
      animateResizeContainer: false,
      effects: 'fade rotateX(-45deg) translateY(-10%)'
    }
  });
});

$(function() {

  $(".container").mixItUp();
  var inputText;
  var $matching = $();

  // Delay function
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $("#input").keyup(function(){
    // Delay function invoked to make sure user stopped typing
    delay(function(){
      inputText = $("#input").val().toLowerCase();

      // Check to see if input field is empty
      if ((inputText.length) > 0) {
        $('.mix').each(function() {
          $this = $("this");

           // add item to be filtered out if input text matches items inside the title
           if($(this).children('.category').text().toLowerCase().match(inputText)) {
            $matching = $matching.add(this);
          }
          else {
            // removes any previously matched item
            $matching = $matching.not(this);
          }
        });
        $(".container").mixItUp('filter', $matching);
      }

      else {
        // resets the filter to show all item if input is empty
        $(".container").mixItUp('filter', 'all');
      }
    }, 200 );
  });
});

// animation.animateResizeContainer must be disabled to prevent accidental reflowing as the container height changes.
