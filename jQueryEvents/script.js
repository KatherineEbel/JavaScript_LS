$(function() {
  
  $("#accordion").slideToggle();

  $("a").click(function(e) {
    e.preventDefault();
    $("#accordion").slideToggle();
  });

  $("form").submit(function(e) {
    e.preventDefault();
    var character = $("#key").val();
    var charCode = character.charCodeAt(0);
    $(document).off("keypress").on("keypress", function(e) {
      if (e.which !== charCode) {
        return;
      }
      $("a").trigger("click");
    });
  });
});
