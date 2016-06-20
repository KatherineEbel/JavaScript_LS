$(function() {
  var $canvas = $("#canvas");

  function getFormObject($f) {
    var object = {};

    $f.serializeArray().forEach(function(input) {
      object[input.name] = input.value;
    });
    
    return object; 
  }

  function createElement(data) {
    var $div = $("<div />", {
      "class": data.shape_type,
      data: data,
    });

    resetElement($div);
    return $div;
  }

  function animateElement() {
    var $element = $(this),
        data = $element.data();

    resetElement($element);
    $element.animate({
      left: +data.end_x,
      top: +data.end_y
    }, +data.duration);
  }

  function resetElement($e) {
    var data = $e.data();
    $e.css({
      left: +data.start_x,
      top: +data.start_y
    });
  }

  function stopAnimations() {
    $canvas.find("div").stop();
  }
  
  $("form").on("submit", function(e) {
    e.preventDefault();
    var $form = $(this),
        data = getFormObject($form);

    $canvas.append(createElement(data));
  });

  $("#animate").on("click", function(event) {
    event.preventDefault();
    $canvas.find("div").each(animateElement);
  });

  $("#stop").on("click", function(event) {
    event.preventDefault();
    stopAnimations();
  });
});
