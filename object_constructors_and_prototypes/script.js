var invoices = new Object();
invoices.foo = 130;
invoices.bar = 250;

var payments = {
  foo: 80,
  bar: 55
};

var payments_received = 0;
invoices.foo -= payments.foo;
invoices.bar -= payments.bar;
payments_received = payments.foo + payments.bar;
console.log(payments_received);

var remaining_due = 0;
for (var invoice in invoices) {
  remaining_due += invoices[invoice];
}

console.log(remaining_due);

var second_invoices = Object.create(invoices);
console.log(second_invoices.foo);
invoices.foo = 0;
console.log(second_invoices.foo);

var Invoices = {
  foo: 130,
  bar: 250
};

/* var outstanding_invoices = [];
outstanding_invoices.push(Object.create(Invoices));
outstanding_invoices.push(Object.create(Invoices));

Object.freeze(Invoices);
console.log(Invoices.foo);
Invoices.foo = 80;
console.log(Invoices.foo);

outstanding_invoices[0].foo = 0;
console.log(outstanding_invoices[0].foo);

console.log(Object.isFrozen(Invoices));
console.log(Object.isFrozen(outstanding_invoices[0]));
*/

function newInvoices(clients) {
  clients = clients || {};
  var invoices = {
    foo: clients.foo || 130,
    bar: clients.bar || 250
  };
  invoices.getTotal = function() {
    return invoices.foo + invoices.bar;
  };
  return invoices;
}

var outstanding_invoices = [];
outstanding_invoices.push(newInvoices());
outstanding_invoices.push(newInvoices());
outstanding_invoices[0].foo = 0;
console.log(outstanding_invoices[0].foo);
console.log(outstanding_invoices[1].foo);

outstanding_invoices.push(newInvoices(undefined, 400));
outstanding_invoices.push(newInvoices());
console.log(outstanding_invoices[3].getTotal());
