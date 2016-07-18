$(function() {
   var canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d");
  context.fillRect(0, 0, canvas.width, canvas.height); 

  var colors = ["#000", "#003", "#006", "#009", "#00c", "#00f"];

  function draw() {
    console.log("drawing");
    colors.forEach(function(color, i) {
      context.fillStyle = color;
      context.fillRect(i * 20, i * 20, canvas.width - i * 40, canvas.height - i * 40);
      //setInterval(draw, 500);
    });
    colors.unshift(colors.pop());
  }

  draw();
});
