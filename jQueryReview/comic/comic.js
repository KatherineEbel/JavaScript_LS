$(function() {
  const $blinds = $('[id^=blind]');
  const speed = 250;
  const delay = 1500;

  $('a').click(function(e) {
    e.preventDefault();
    $blinds.finish();
    $blinds.removeAttr('style');
    animate();
  });

  function animate() {
    $blinds.each(function(i) {
      let $blind = $blinds.eq(i);
      let properties = {
        top: '+=' + $blind.height(),
        height: 'toggle'
      };
      $blind.delay(delay * i + speed).animate(properties, speed);
    });
  }

  animate();
});
