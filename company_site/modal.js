$(function() {

  $("#team a").click(function(event) {
    event.preventDefault();
    var $link = $(this);
    var $modal = $(".team-detail");
    $link.css({top: $(window).scrollTop() + 30 });
    $modal.fadeIn(400);
  });

  $(".close-btn").click(function() {
    $(".team-detail").fadeOut(400);
  });
});
