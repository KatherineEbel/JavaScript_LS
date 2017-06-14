function ContactManager(state) {
  this.currentId = state === null ? 0 : state.currentId;
  this.contacts = state === null ? [] : state.contacts;
}

ContactManager.prototype.formTemplate = Handlebars.compile($('#form-template').html());
ContactManager.prototype.getNextId = function() {
  return ++this.currentId;
};

ContactManager.prototype.cancel = function() {
  $(document).find('form').slideToggle().remove();
  $('.slide').slideToggle();
};

ContactManager.prototype.add = function() {
  let newContact = Object.create(contact);
  newContact.id = this.getNextId();
  this.contacts.push(newContact);
  this.displayFormFor(newContact);
};

ContactManager.prototype.update = function(event){
  let contactId = +$(event.currentTarget).siblings(':hidden').val();
  let contact = this.contacts.find(contact => {
     return contact.id === contactId;
  });
  contact[$(event.currentTarget).attr('id')] = $(event.currentTarget).val();
};

ContactManager.prototype.displayFormFor = function(contact) {
  let $form = $(this.formTemplate(contact));
  $('.slide').slideToggle();
  $form.insertAfter('.slide').slideToggle();
};

ContactManager.prototype.saveCurrentState = function(event) {
  event.preventDefault();
  if (event.target.nodeName === 'FORM') { event.target.reset(); }
  localStorage.setItem('manager', JSON.stringify(this));
};

ContactManager.prototype.init = function() {
  this.bind();
};

ContactManager.prototype.bind = function() {
  $('.add-contact').on('click', this.add.bind(this));
  $(document).on('blur', 'form input', this.update.bind(this));
  $(document).on('submit', 'form', this.saveCurrentState.bind(this));
};

let contact = {
  id: 0,
  name: "",
  email: "",
  phone: ""
};

let manager= new ContactManager(JSON.parse(localStorage.getItem('manager'))).init();


