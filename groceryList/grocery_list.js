$(function() {

  $("form").submit(function(event) {
    event.preventDefault();
    var $form = $(this),
        item = $form.find("#item").val(),
        quantity = $form.find("#quantity").val() || 1;
    add(item, quantity);
    $(this).get(0).reset();
  });

  function add(item, quantity) {
    $("#list").append("<li>" + quantity + " " + item + "</li>");
  }

});
