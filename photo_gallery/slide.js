$(function() {
  var $slides = $("#slides"); 

  $slides.slideshow({
    $thumbnails: $slides.find(".thumbnails"),
  });
});
