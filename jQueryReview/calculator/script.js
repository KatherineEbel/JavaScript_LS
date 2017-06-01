// calculator
$(function() {

  function reset() {
    $('#op1').val('');
    $('#op2').val('');
  }

  const calculator = {
    op1: 0,
    op2: 0,
    operator: undefined,
    calculate() {
      console.log(this);
      if (this.operator === '+') {
        return this.add(this.op1, this.op2);
      } else if (this.operator === '-') {
        return this.subtract(this.op1, this.op2);
      } else if (this.operator === '*') {
        return this.multiply(this.op1, this.op2);
      } else if (this.operator === '/') {
        return this.divide(this.op1, this.op2);
      } else {
        return undefined;
      }
    },
    add(op1, op2) {
      return this.op1 + this.op2;
    },
    subtract() {
      return this.op1 - this.op2;
    },
    multiply() {
      return this.op1 * this.op2;
    },
    divide() {
      return this.op1 / this.op2;
    }
  };

  $('form').submit(function(e) {
    e.preventDefault();
    $('.result').text('0');
    calculator.op1 = parseInt($('#op1').val());
    calculator.op2 = parseInt($('#op2').val());
    calculator.operator = $('#operator option:checked').val();
    let result = calculator.calculate();
    $('.result').text(result);
    console.log(result);
  });
});
