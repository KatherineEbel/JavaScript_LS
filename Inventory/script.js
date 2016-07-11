var inventory;

(function() {
  inventory = {
   last_id: 0,
   collection: [],
   writeDate: function() {
     var date = new Date();
     date = "<p>" + date.toUTCString() + "</p>";
     $("#date").after(date);
   },
   cacheTemplate: function() {
     var $inv_template = $("#inventory_item").remove();
     this.template = $inv_template.html();
   },
   bindEvents: function() {
    $("#add_item").on("click", $.proxy(this.newItem, this));
    $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
    $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
   },
   findParent: function(event) {
     return $(event.target).closest("tr");
   },
   findID: function($item) {
     return +$item.find("input[type=hidden]").val();
   },
   add: function() {
     var next_id = ++this.last_id,
     item = {
      id: next_id,
      name: "",
      stock_number: "",
      quantity: 1  
     };
     this.collection.push(item);
     return item;
   }, 
   remove: function(idx) {
     this.collection = this.collection.filter(function(item) {
       return item.id !== idx;
     });    
   },
   get: function(id) {
     var found_item;
     this.collection.forEach(function(item) {
       if (item.id === id) {
         found_item = item;
         return false;
       }
     });
     return found_item;
   },
   update: function($item) {
     var id = this.findID($item),
         item = this.get(id);
     item.name = $item.find("[name^=input_name]").val();
     item.stock_number = $item.find("[name^=item_stock_number]").val();
     item.quantity = $item.find("[name^=item_quantity]").val();
   },
   newItem: function(event) {
     event.preventDefault();
     var item = this.add(),
         $item = $(this.template.replace(/ID/g, item.id));
     $("#inventory").append($item);
   },
   deleteItem: function(event) {
     event.preventDefault();
     var $item = this.findParent(event).remove();
     this.remove(this.findID($item));
   },
   updateItem: function(event) {
     var $item = this.findParent(event);
     this.update($item);
   },
   init: function() {
     this.writeDate();
     this.cacheTemplate();
     this.bindEvents();
   }
  };
})();

$($.proxy(inventory.init, inventory));
