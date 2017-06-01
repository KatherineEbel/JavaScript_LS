const inventory = (function() {
  let date;
  return {
    collection: [],
    template: null,
    getDate() {
      return date;
    },
    setDate() {
      date = new Date();
    },
    init() {
      this.setDate();
    }
  };
})();

$(inventory.init.bind(inventory));
$(function() {
  let $inventoryTemplate = $('#inventory_item');
  inventory.setDate();
  inventory.template = $inventoryTemplate.text();
  $inventoryTemplate.remove();
  $('#order_date').text(inventory.getDate());
});
