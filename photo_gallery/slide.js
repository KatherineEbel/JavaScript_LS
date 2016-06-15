$(function() {
  $(".thumbnails li").click(function(event) {
    var img_src,
        $thumbnail = $(this),
        $main_img = $("figure img");
    $(".thumbnails li.active").toggleClass("active");
    $thumbnail.toggleClass("active");
    img_src = $("li.active img").attr("src");
    $main_img.stop().fadeTo(300, 0).attr("src", img_src).delay(300).fadeTo(300, 1.0); 
  });
});
