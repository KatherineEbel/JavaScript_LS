function ContactManager(state) {
  this.currentId = state === null ? 0 : state.currentId;
  this.contacts = state === null ? [] : state.contacts;
  this.compileTemplates();
  this.renderContacts();
}

ContactManager.prototype.templates = {};

ContactManager.prototype.compileTemplates = function() {
  let that = this;
  $('[type="text/x-handlebars-template"]').each(function() {
    that.templates[$(this).attr('id')] = Handlebars.compile($(this).html());
  });
  Handlebars.registerPartial('contact', this.templates.contactTemplate);
};

ContactManager.prototype.bind = function() {
  $('#search').on('input, keyup', this.filterContacts.bind(this));
  $(document).on('click', '.add-contact', this.add.bind(this));
  $(document).on('click', '#cancel', this.cancel.bind(this));
  $(document).on('click', '#save', this.saveCurrentState.bind(this));
  $(document).on('blur', '#name, #email, #phone', this.update.bind(this));
  $(document).on('click', '[type=button]', this.modifyContacts.bind(this));
};

ContactManager.prototype.getNextId = function() {
  return ++this.currentId;
};

ContactManager.prototype.getContact = function(contactId) {
  return this.contacts.find(contact => contact.id === contactId);
};

ContactManager.prototype.add = function() {
  let newContact = Object.create(contact);
  newContact.id = this.getNextId();
  this.contacts.push(newContact);
  this.displayFormFor(newContact);
};

ContactManager.prototype.hideForm = function() {
  $('#contactForm').slideToggle().remove();
  $('.slide').slideToggle();
};

ContactManager.prototype.cancel = function(event) {
  let contactSaved = $('form:visible').find('#name, #email, #phone').filter((idx, el) => {
    return $(el).val() !== '';
  }).length === 3;
  if (!contactSaved) {
    this.contacts.splice(this.getContact(+$('form:visible').find(':hidden').val()), 1)
    this.currentId--;
    this.saveCurrentState();
    return;
  }
  this.renderContacts();
  this.hideForm();
};

ContactManager.prototype.update = function(event){
  let contactId = +$(event.currentTarget).siblings(':hidden').val();
  this.getContact(contactId)[$(event.currentTarget).attr('id')] = $(event.currentTarget).val();
};

ContactManager.prototype.displayFormFor = function(contact) {
  let $form = $(this.templates.formTemplate(contact));
  $('.slide').slideToggle();
  $form.insertAfter('.slide').slideToggle();
};

ContactManager.prototype.renderContacts = function() {
  $('#contacts').html(this.templates.contactsTemplate({contacts: this.contacts}));
};

ContactManager.prototype.saveCurrentState = function(event) {
  localStorage.setItem('manager', JSON.stringify(this));
  if (event) {
    event.preventDefault();
    $(event.currentTarget).closest('form').get(0).reset();
    this.hideForm();
  }
  this.renderContacts();
};

ContactManager.prototype.init = function() {
  this.bind();
};

ContactManager.prototype.edit = function(contact) {
  this.displayFormFor(contact);
};

ContactManager.prototype.delete = function(contact) {
  this.contacts.splice(this.contacts.indexOf(contact), 1);
  this.saveCurrentState();
};

ContactManager.prototype.modifyContacts = function(event) {
  let contactId = +$(event.currentTarget).siblings(':hidden').val();
  let fn = $(event.currentTarget).val().toLowerCase();
  this[fn](this.getContact(contactId));
};

ContactManager.prototype.filterContacts = function(event) {
  let searchVal = $(event.currentTarget).val();
  if (searchVal.length === 0) {
    this.renderContacts();
    return;
  }
  let regExp = new RegExp(searchVal, 'i');
  let matches = $('#contacts').find('article').filter((index, el) => {
    return regExp.test($(el).find('h2').text())
  }).show();
  $('#contacts').find('article').filter((index, el) => {
    return !regExp.test($(el).find('h2').text())
  }).hide();
  if (matches.length === 0) {
    $('#contacts').html(`<h3>There are no contacts with search value ${searchVal}</h3`);
  }
};


let contact = {
id: 0,
name: "",
email: "",
phone: ""
};

let manager= new ContactManager(JSON.parse(localStorage.getItem('manager'))).init();
