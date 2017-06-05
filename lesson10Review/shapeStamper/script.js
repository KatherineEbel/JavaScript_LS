$(function() {
  const ctx = $('canvas').get(0).getContext('2d');
  $('a[data-method=circle]').addClass('active');
  const shapeStamper = {
    size: 50,
    currentMethod: 'circle',
    fillColor: '#000',
    coordinate: {
      x: 0,
      y: 0
    },
    setColor(color) {
      this.fillColor = color;
    },
    clear() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    circle() {
      let x = this.coordinate.x;
      let y = this.coordinate.y;
      let radius = size / 2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    },
    square() {
      let x = this.coordinate.x;
      let y = this.coordinate.y;
      ctx.fillRect(x - (this.size / 2), y - (this.size / 2), this.size, this.size);
    },
    triangle() {
      let x = this.coordinate.x;
      let y = this.coordinate.y - this.size / 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + this.size / 2, y + this.size);
      ctx.lineTo(x - this.size / 2, y + this.size);
      ctx.closePath();
      ctx.fill();
    }
  }

  $('#color').on('blur', function(e) {
    shapeStamper.setColor($('#color').val());
  });

  $('.drawing-method').on('click', function(e) {
    let className = 'active';
    e.preventDefault();
    $(this).closest('ul').find('.' + className).removeClass(className);
    $(this).addClass(className);
    shapeStamper.currentMethod = $(this).data('method');
  }).eq(0).click();

  $('canvas').on('click', function(e) {
    e.preventDefault();
    setFillStyle();
    shapeStamper.coordinate = {x: e.offsetX, y: e.offsetY};
    shapeStamper[shapeStamper.currentMethod]();
  });

  $('#clear').on('click', function(e) {
    e.preventDefault();
    clear();
  });

  function setFillStyle() {
    ctx.fillStyle = shapeStamper.fillColor;
  }

  function clear() {
  }
});
