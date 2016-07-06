(function($) {
  var slideshow = {
    switchSlides: function(event) {
    event.preventDefault();
    var $li = $(event.currentTarget).closest("li"),
        img_src = $li.find("img").attr("src"),
        $main_img = this.$element.find(this.slide);
      $main_img.stop().fadeTo(this.speed, 0, function() {
        $li.addClass(this.activeClass);
        $main_img.attr("src", img_src).fadeTo(this.speed, 1.0); 
      });
      this.$thumbnails.find("." + this.activeClass).removeClass(this.activeClass);
    },
    destroy: function() {
      this.$thumbnails.off(this.namespace);
    },
    bind: function() { 
      this.$thumbnails.on("click" + this.namespace, "a", $.proxy(this.switchSlides, this)); 
    },
    init: function() {
      this.bind(); 
    }
  };

  $.fn.slideshow = function(options) {
    var instance = this.data("plugin" + slideshow.namespace);
    if ($.isPlainObject(options)) {
      instance && instance.destroy();
      instance = $.extend({
        $element: this 
      }, slideshow, $.fn.slideshow.defaults, options);
      instance.init();
      this.data("plugin" + slideshow.namespace, instance);
    }
    else if (typeof options === "string") {
      instance[options] && instance[options]();
    }
  }

  $.fn.slideshow.defaults = {
    slide: "figure img",
    speed: 500,
    namespace: ".slideshow",
    activeClass: "active",
  };

  $.fn.slideshow.version = "1.0.0";
})(jQuery);
