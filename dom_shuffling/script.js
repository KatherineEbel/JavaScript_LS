$(function() {
  var $main_headline = $("main h1:first");
  $("main + header").insertBefore("main").prepend($main_headline);
  $("section figure").appendTo("article");
  $("section figure:nth-of-type(2)").insertBefore("section figure:nth-of-type(1)");
});
