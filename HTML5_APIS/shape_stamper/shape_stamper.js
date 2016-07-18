$(function() {
  var canvas = $("canvas")[0],
      context = canvas.getContext("2d"),
      method,
      $color = $("input");

  var drawing_methods = {
    square: function(event) {
      var side = 30,
          x = event.offsetX - side / 2,
          y = event.offsetY - side / 2;

      context.fillRect(x, y, side, side);
    },
    circle: function(event) {
      var radius = 15,
          x = event.offsetX,
          y = event.offsetY;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.closePath();
    },
    triangle: function(event) {
      var side = 30,
          x = event.offsetX,
          y = event.offsetY - side / 2;
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x + side / 2, y + side);
      context.lineTo(x - side / 2, y + side);
      context.fill();
      context.closePath();
    },
    clear: function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  
  $(".drawing_method").on("click", function(event) {
    event.preventDefault();
    var $anchor = $(this),
        class_name = "active";
    $anchor.closest("ul").find("." + class_name).toggleClass(class_name);
    $anchor.toggleClass(class_name);
    method = $anchor.attr("data-method");
  }).eq(0).click();

  $("canvas").on("click", function(event) {
    var color = $color.val();
    context.fillStyle = color;    
    drawing_methods[method](event);
  });

  $("#clear").on("click", function(event) {
    event.preventDefault();
    drawing_methods.clear(); 
  });
});
