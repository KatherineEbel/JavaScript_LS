function ContactManager(state) {
  this.currentId = state === null ? 0 : state.currentId;
  this.contacts = state === null ? [] : state.contacts;
  this.tags = state === null ? ['Family', 'Co-Workers', 'Friends'] : state.tags;
  this.compileTemplates();
  this.renderContacts();
  this.init();
}

// contains all handlebars templates
ContactManager.prototype.templates = {};

// compile templates and register partials
ContactManager.prototype.compileTemplates = function() {
  let that = this;
  $('[type="text/x-handlebars-template"]').each(function() {
    that.templates[$(this).attr('id')] = Handlebars.compile($(this).html());
  });
  Handlebars.registerPartial('contact', this.templates.contactTemplate);
  Handlebars.registerHelper('selected', function(option, value) {
    return option === value ? ' selected' : '';
  });
};

ContactManager.prototype.renderContacts = function() {
  $('#contacts').html(this.templates.contactsTemplate({contacts: this.contacts}));
};

ContactManager.prototype.init = function() {
  this.bind();
};

// bind events to manager
ContactManager.prototype.bind = function() {
  $(document).on('submit', e => {
    e.preventDefault();
    let formId = $(event.target).attr('id');
    if (formId === 'tagForm') {
      this.addTag(e);
    }
    this.saveCurrentState();
    this.renderContacts();
    this.hideForm($(event.target));
  });
  $(document).on('click', '.add-contact', this.createContact.bind(this));

  $(document).on('click.add-tag', '.add-tag', this.displayTagForm.bind(this));
  $('.tags').on('click', 'a', this.filterByTag.bind(this));
  $('#search').on('input, keyup', this.filterContacts.bind(this));
  $(document).on('click', 'input.cancel', this.cancel.bind(this));
  $(document).on('blur', '#name, #email, #phone, #tag', this.update.bind(this));
  $(document).on('click', 'input.delete, input.edit', event => {
    event.preventDefault();
    let contactId = +$(event.target).siblings(':hidden').val();
    this[$(event.target).val().toLowerCase()](contactId);
  });
};

ContactManager.prototype.displayFormFor = function(contact) {
  let context = { contact: contact, tags: this.tags };
  let $form = $(this.templates.contactFormTemplate(context));
  $('.slide').slideToggle();
  $form.insertAfter('.slide').slideToggle();
};

ContactManager.prototype.displayTagForm = function(e) {
  e.preventDefault();
  let $form = $(this.templates.tagFormTemplate(contact));
  $('.slide').slideToggle();
  $form.insertAfter('.slide').slideToggle();
}

ContactManager.prototype.addTag = function(e) {
  event.preventDefault();
  let tag = $(event.target).find('#tagName').val();
  this.tags.push(tag);
  $('.tags ul').append(`<li><a class="button" href="#">${tag}</a></li>`)
};

ContactManager.prototype.getNextId = function() {
  return ++this.currentId;
};

ContactManager.prototype.createContact = function(e) {
  let newContact = Object.create(contact);
  newContact.id = this.getNextId();
  this.contacts.push(newContact);
  this.displayFormFor(newContact);
};

// filters all contacts given a search string.
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

ContactManager.prototype.filterByTag = function(event) {
  event.preventDefault();
  $(event.currentTarget).toggleClass('selected');
  let selectedTags = $('.selected').map((_, el) => $(el).text()).get();
  $('section').find('article').filter((_, el) => {
    let contactId = +$(el).find(':hidden').val();
    return selectedTags.indexOf(this.getContact(contactId).tag) !== -1;
  });
};

ContactManager.prototype.getContact = function(contactId) {
  return this.contacts.find(contact => contact.id === contactId) || -1;
};

ContactManager.prototype.delete = function (contactId) {
  this.contacts.splice(this.getContact(contactId), 1);
  this.renderContacts();
  this.saveCurrentState();
};

ContactManager.prototype.edit = function (contactId) {
  let contact = this.getContact(contactId);
  this.displayFormFor(contact);
};

ContactManager.prototype.cancel = function(e) {
  let $form = $(event.target).closest('form');
  if ($form.attr('id') === 'tagForm') {
    this.tags.pop();
    this.hideForm($form);
    return;
  }
  let contact = this.getContact(+$form.find('input:hidden').val());
  let isContactComplete = $form.find(':empty').not('.button, :hidden').length === 0;
  if (!isContactComplete) {
    this.contacts.splice(this.contacts.indexOf(contact), 1);
    if (this.currentId > 0) { currentId--; }
  }
  this.saveCurrentState();
  this.hideForm($form);
};

ContactManager.prototype.hideForm = function($form) {
  $('.slide').slideToggle();
  $form.slideToggle().remove();
};

ContactManager.prototype.update = function(e) {
  let contactId = +$(e.target).closest('form').find('input:hidden').val();
  this.getContact(contactId)[$(e.target).attr('id')] = $(e.target).val();
};

ContactManager.prototype.saveCurrentState = function() {
  localStorage.setItem('manager', JSON.stringify(this));
};
let contact = {
id: 0,
name: '',
email: '',
phone: '',
tag: ''
};

let manager= new ContactManager(JSON.parse(localStorage.getItem('manager')));
