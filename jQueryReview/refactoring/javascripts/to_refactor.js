$(function() {
  $("nav a").on("mouseenter mouseleave", function() {
    $(this).next("ul").toggleClass('show');
  });

  $(".button, button").on("click", function(e) {
    e.preventDefault();
    $(this).addClass("clicked");
  });

  $(".toggle").on("click", function(e) {
    e.preventDefault();

    $(this).next(".accordion").toggleClass('opened');
  });

  $("form").on("submit", function(e) {
    e.preventDefault();
    var cc_number = $(this).find("[type=text]").val();
    let isValid = isValidNumber(cc_number);
    $(this).find('.success').toggle(isValid);
    $(this).find('.error').toggle(!isValid);
  });


  $("ul a").on("click", function(e) {
    e.preventDefault();
    const stones = {
      "January": "garnet",
      "February": "amethyst",
      "March": "aquamarine or bloodstone",
      "April": "diamond",
      "May": "emerald",
      "June": "pearl, moonstone, or alexandrite",
      "July": "ruby",
      "August": "peridot",
      "September": "sapphire",
      "October": "opal or tourmaline",
      "November": "topaz or citrine",
      "December": "turquoise, zircon, or tanzanite"
    };
    let month = $(this).text();
    let $stone = $("#birthstone");
    $stone.text(`Your birthstone is ${stones[month]}`);
  });

  function isValidNumber(cc_number) {
    var odd_total = 0;
    var even_total = 0;

    cc_number = cc_number.split("").reverse();
    for (var i = 0, len = cc_number.length; i < len; i++) {
      if (i % 2 == 1) {
        cc_number[i] = (+cc_number[i] * 2) + "";
        if (cc_number[i].length > 1) {
          cc_number[i] = +cc_number[i][0] + +cc_number[i][1];
        }
        else {
          cc_number[i] = +cc_number[i];
        }
        odd_total += cc_number[i];
      }
      else {
        even_total += +cc_number[i];
      }
    }
    return (odd_total + even_total) % 10 == 0
  }
});
