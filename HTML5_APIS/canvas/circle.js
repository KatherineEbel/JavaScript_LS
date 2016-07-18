$(function() {

   var canvas = document.querySelector("canvas"),
       context = canvas.getContext("2d"),
       x = canvas.width / 2,
       y = canvas.height / 2,
       radius = x;

  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
  context.closePath();

  // triangle
  context.beginPath();
  context.strokeStyle = "rgba(0, 102, 204, .7)";
  context.moveTo(x, y - 50);
  context.lineTo(x + 50, y);
  context.lineTo(x - 50, y);
  context.lineTo(x, y - 50);
  context.stroke();
  context.closePath();

  /* var img_src = canvas.toDataURL("png"),
      img = document.createElement("img");
  img.src = img_src;
  document.body.appendChild(img); */
  var img = document.querySelector("img");
  
  // change the canvas width and height to match the image
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);

  /** obtain image data from the canvas and modify it by writing image data back to the canvas.

  /* example image data
  image_data = {
    width: 2,
    height: 2,
    data: [
      255, 0, 0, 255
      255, 0, 0, 255
      0, 0, 255, 255
      0, 0, 255, 255
    ]
  }

  // for loop increments by four since pixel data array has four values

  for (var i = 0; i < image_data.data.length; i += 4) {
    red: image_data.data[i]
    green: image_data.data[i + 1]
    blue: image_data.data[i + 2]
    alpha: image_data.data[i + 3]
  }

  // after changing image data write back to canvas
  // context.putImageData(image_data, 0, 0);
  // ** make sure you are dending the full image data object and not just the data property.
  */
});
