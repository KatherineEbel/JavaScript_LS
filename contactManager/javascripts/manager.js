$UIElements = {
  templates: $('[type="text/x-handlebars-template"]'),
  search: $('#search'),
  searchEmptyMessage: $('#search-empty'),
  formContainer: $('#form-container'),
  tagsContainer: $('.tags ul'),
  formName: $('.form-name'),
  contacts: $('#contacts'),
  contactElementHeight: 0,
  getFormName() {
    this.formName = $('.form-name');
    return this.formName.text();
  },
  isFormActive() {
    return !this.formContainer.hasClass('collapsed');
  },
  setEmptyMessage(searchValue) {
    this.searchEmptyMessage = $('#search-empty');
    this.searchEmptyMessage.text(`There are no contacts with search value ${searchVal}`);
  },
  getContactElementHeight() {
    return this.contacts.outerHeight();
  },
  setContactElementHeight() {
    this.contactElementHeight = this.getContactElementHeight();
  }
};

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
  $UIElements.templates.each(function() {
    that.templates[$(this).attr('id')] = Handlebars.compile($(this).html());
  });
  Handlebars.registerPartial('contact', this.templates.contactTemplate);
  Handlebars.registerHelper('selected', function(option, value) {
    return option === value ? ' selected' : '';
  });
};

ContactManager.prototype.renderContacts = function() {
  $UIElements.contacts.html(this.templates.contactsTemplate({contacts: this.contacts}));
  $UIElements.setContactElementHeight();
};

ContactManager.prototype.init = function() {
  this.bind();
};

// bind events to manager
ContactManager.prototype.bind = function() {
  $(document).on('submit', e => {
    e.preventDefault();
    let formName = $('.form-name').text();
    if (formName === 'Add Tag') {
      this.addTag(e);
    }
    this.saveCurrentState();
    this.renderContacts();
    this.hideForm();
  });
  $(document).on('click', '.add-contact', event => {
    event.preventDefault();
    if ($UIElements.isFormActive()) { return; }
    this.createContact();
  });

  $(document).on('click.add-tag', '.add-tag', this.displayTagForm.bind(this));
  $('.tags').on('click', 'a', e => {
    e.preventDefault();
    $(e.target).toggleClass('selected');
    this.filterByTag();
  });
  $UIElements.search.on('input, keyup', this.filterContacts.bind(this));
  $(document).on('click', 'input.cancel', this.cancel.bind(this));
  $(document).on('blur', '#name, #email, #phone, #tag', this.update.bind(this));
  $(document).on('click', 'input.delete, input.edit', event => {
    event.preventDefault();
    let contactId = +$(event.target).parent().siblings(':hidden').val();
    this[$(event.target).val().toLowerCase()](contactId);
  });
};

ContactManager.prototype.displayFormFor = function(contact) {
  let context = { contact: contact, tags: this.tags };
  let $formContent = $(this.templates.contactFormTemplate(context));
  $UIElements.formContainer.html($formContent);
  $('#contacts').toggleClass('collapsed');
  $UIElements.formContainer.toggleClass('collapsed');
};

ContactManager.prototype.displayTagForm = function(e) {
  e.preventDefault();
  let $form = $(this.templates.tagFormTemplate());
  $UIElements.formContainer.html($form).toggleClass('collapsed');
  $UIElements.contacts.toggleClass('collapsed');
}

ContactManager.prototype.hideForm = function() {
  $UIElements.formContainer.toggleClass('collapsed');
  $UIElements.contacts.toggleClass('collapsed');
  // $UIElements.contacts.removeClass('order-last');
};

ContactManager.prototype.addTag = function(e) {
  event.preventDefault();
  let tag = $(event.target).find('#tagName').val();
  this.tags.push(tag);
  $UIElements.tagsContainer.append(`<li><a class="button" href="#">${tag}</a></li>`)
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
  if (this.contacts.length === 0) { return }
  let searchVal = $(event.currentTarget).val();
  if (searchVal.length === 0) {
    this.filterByTag();
    $UIElements.searchEmptyMessage.hide();
    return;
  }
  let regExp = new RegExp(searchVal.replace(/[^a-z]/ig, ''), 'i');
  this.contacts.forEach(contact => {
    let $article = $(`article:contains(${contact.name})`);
    regExp.test($article.find('#contactName').text()) ? $article.show() : $article.hide();
  });
  if ($('article:visible').length === 0) {
    $UIElements.setEmptyMessage();
  } else {
    $UIElements.searchEmptyMessage.text('');
  }
};

ContactManager.prototype.filterByTag = function(event) {
  let selectedTags = $('.selected').map((_, el) => $(el).text()).get();
  this.contacts.forEach(contact => {
    let $article = $('article').filter((_, el) => $(el).find('input:hidden').val() === contact.id + '');
    selectedTags.indexOf(contact.tag) === -1 ? $article.hide() : $article.show();
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
  if ($UIElements.getFormName().includes('Contact')) {
    let contact = this.getContact(+$form.find('input:hidden').val());
    let isContactComplete = $form.find(':empty').not('.button, :hidden').length === 0;
    if (!isContactComplete) {
      this.contacts.splice(this.contacts.indexOf(contact), 1);
      if (this.currentId > 0) { this.currentId--; }
    }
  }
  this.saveCurrentState();
  this.hideForm();
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
