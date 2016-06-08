$(function() {

  $("form").submit(function(event) {
    event.preventDefault();
    var op1 = +$("#op1").val();
        op2 = +$("#op2").val(),  
        operator = $("option:selected").val(),
        result = calculate(op1, op2, operator);
    $("h1").text(result);
  });

  function calculate(op1, op2, operator) {
    if (operator === "+") {
      return op1 + op2;
    }
    else if (operator === "-") {
      return op1 - op2;
    }
    else if (operator === "*") {
      return op1 * op2;
    }
    else if (operator === "/") {
      return op1 / op2;
    }
  }
});
