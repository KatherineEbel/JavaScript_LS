$(function() {

  const $form = $('form');
  const $canvas = $('.canvas');

  $('a:first-of-type').click(function(e) {
    e.preventDefault();
    animateShapes()
  });

  $('a:last-of-type').click(function(e) {
    e.preventDefault();
    $('.canvas div').stop();
  });

  $form.submit(function(e) {
    e.preventDefault();
    let props = getProperties($(this).serializeArray());
    addShape(props);
    $form.get(0).reset();
  });

  function getProperties(arr) {
    return arr.reduce((props, obj) => {
      props[obj.name] = obj.value;
      return props;
    },{});
  }

  function goToStartPosition(shape) {
    shape.css({
      top: +shape.data('startY'),
      left: +shape.data('startX')
    });
  }

  function addShape(data) {
    let shape = `<div class="${data.shape}"></div>`
    $canvas.append(shape);
    let props = {
      top: +data["start-y"],
      left: +data["start-x"]
    };
    $($('.canvas div').get(-1)).css(props).data(data);
  }

  function animateShapes() {
    let $shapes = $('.canvas div');
    $shapes.stop();
    $shapes.each(function() {
      goToStartPosition($(this));
      $(this).animate({
        top: +$(this).data('endY'),
        left: +$(this).data('endX')
      }, 1000);
    });
  }
});
