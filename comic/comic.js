$(function() {
  var $blinds = $("[id^=blind]"),
      speed = 250,
      delay = 1500; 
  
  function startAnimation(delay, speed) {
    $blinds.each(function(i) {
      var $blind = $blinds.eq(i);
      $blind.delay(delay * i + speed).animate({
        top: "+=" + $blind.height(),
        height: 0
      }, speed);
    });
  }

  $("a").on("click", function(e) {
    e.preventDefault();
    $blinds.finish();
    $blinds.removeAttr("style");
    startAnimation(delay, speed);
  });

  startAnimation(delay, speed);
});
