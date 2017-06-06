const canvas = document.createElement('canvas');
const manipulator = (function() {
  const ctx = canvas.getContext('2d');
  return {
    init() {
      this.drawImages();
    },
    drawImages() {
      let $images = $('#before img');
      $images.each(function(idx) {
        manipulator.setCanvasSize.call(manipulator, $(this));
        ctx.drawImage($(this)[0], 0, 0);
        let imageData = manipulator.getGrayValues.call(manipulator, ctx.getImageData(0, 0, canvas.width, canvas.height));
        manipulator.addImage.call(manipulator, imageData);
      });
    },
    getGrayValues(imageData) {
      let data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        let [red, green, blue] = [data[i], data[i + 1], data[i + 2]];
        let normalized = Math.round(red * .3086 + green * .6094 + blue * .0820);
        data[i] = data[i + 1] = data[i + 2] = normalized;
      }
      return imageData;
    },
    setCanvasSize($img) {
      canvas.height = $img.prop('naturalHeight');
      canvas.width = $img.prop('naturalWidth');
    },
    addImage(data) {
      let grayscaleImage = ctx.putImageData(data, 0, 0);
      let image = document.createElement('img');
      $(image).attr('src', canvas.toDataURL());
      $('#after').append($(image));
    }
  };
})(canvas);

$(window).on('load', function() {
  $(manipulator.init.bind(manipulator));
});
