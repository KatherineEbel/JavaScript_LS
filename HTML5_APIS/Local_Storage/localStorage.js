$(function() {
  $("nav a").on("click", function(event) {
    event.preventDefault();
    var $current = $(this),
        active_class = "active",
        index = $current.closest("li").index();
    $current.closest("nav").find("." + active_class).toggleClass(active_class);
    $current.toggleClass(active_class);
    $("#tabs article").hide().eq(index).show();
    localStorage.setItem("active_nav", index);
  });

  $(":radio").on("change", function() {
    var color = $(this).val();

    $(document.body).css({ background: color });
    localStorage.setItem("background", color);
  });

  $(window).unload(function() {
    localStorage.setItem("note", $("textarea").val());
  });

  setActiveNav(localStorage.getItem("active_nav"));
  setBackground(localStorage.getItem("background"));
  setNote(localStorage.getItem("note"));
});

function setActiveNav(idx) {
  if (idx === null) { return; }
  $("nav a").eq(idx).click();
}

function setBackground(color) {
  if (color === null) { return; }
  $("[value='" + color + "']").prop("checked", true).change();
}

function setNote(comment) {
  $("textarea").val(comment);
}
