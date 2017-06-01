// groceryList

const groceryList = {
  list: [],
  addItem(quantity, name) {
    quantity = quantity || 1;
    return this.list.push(`<li>${quantity} ${name}</li>`);
  }
};

$(function() {
  const $list = $('.list');
  const $form = $('form');
  const $itemName = $('#itemName');
  const $quantity = $('#quantity');

  $form.submit(function(event) {
    event.preventDefault();
    groceryList.addItem($quantity.val(), $itemName.val());
    $list.append(groceryList.list[groceryList.list.length - 1]);
    $form.get(0).reset();
  });
});
