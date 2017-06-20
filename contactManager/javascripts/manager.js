let contact = {
id: 0,
name: '',
email: '',
phone: '',
tag: ''
};

let $UIElements = {
  templates: $('[type="text/x-handlebars-template"]'),
  search: $('#search'),
  formContainer: $('#form-container'),
  tagsContainer: $('.tags'),
  contacts: $('#contacts'),
  searchEmptyMessage(searchVal){
     $('#search-empty')
       .text(searchVal.length === 0 ? '' :`There are no contacts containing ${searchVal}`);
  },
  getFormTitle() {
    return $('.form-name').text();
  },
  setFormTitle(title) {
    $('.form-name').text(title);
  },
  isFormActive() {
    return !this.formContainer.hasClass('collapsed');
  },
  addTag(name) {
    this.tagsContainer.find('ul').append(`<li><a class="button" href="#">${name}</a></li>`)
  },
  getSelectedTagNames() {
    return $('.selected').map((_, el) => $(el).text()).get();
  }
};

function ContactManager(state) {
  this.currentId = state === null ? 0 : state.currentId;
  this.contacts = state === null ? [] : state.contacts;
  this.tags = state === null ? ['None'] : state.tags;
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
};

ContactManager.prototype.init = function() {
  this.bind();
  $UIElements.tagsContainer.html(this.templates.tagsTemplate({tags: this.tags}));

};

ContactManager.prototype.saveContact = function(data) {
  let updated = data.reduce((c, obj) => {
    c[obj.name] = obj.name === 'id' ? +obj.value : obj.value;
    return c;
  }, Object.create(contact));
  let thisContact = this.getContact(updated.id);
  if (thisContact === -1) {
    updated.id = this.getNextId();
    this.contacts.push(updated);
  } else {
    this.contacts.splice(this.contacts.indexOf(thisContact), 1, updated);
  }
}
// bind events to manager
ContactManager.prototype.bind = function() {
  $(document).on('submit', e => {
    e.preventDefault();
    let formName = $UIElements.getFormTitle();
    if (formName === 'Add Tag') {
      this.addTag(e);
    } else {
      this.saveContact($(e.target).serializeArray());
    }
    this.saveCurrentState();
    this.renderContacts();
    this.filterByTag();
    this.hideForm();
  });
  $(document).on('click', '.add-contact', event => {
    event.preventDefault();
    if ($UIElements.isFormActive()) { return; }
    this.createContact();
  });

  $(document).on('click.add-tag', '.add-tag', event => {
    event.preventDefault();
    if ($UIElements.isFormActive()) { return; }
    this.displayTagForm();
  });
  $UIElements.tagsContainer.on('click', 'a', e => {
    e.preventDefault();
    $(e.target).toggleClass('selected');
    this.filterByTag();
  });
  $(document).on('click', 'input.delete, input.edit', event => {
    event.preventDefault();
    let contactId = +$(event.target).parent().siblings(':hidden').val();
    this[$(event.target).val().toLowerCase()](contactId);
  });
  $UIElements.search.on('input, keyup', this.filterContacts.bind(this));
  $(document).on('click', 'input.cancel', this.cancel.bind(this));
};

ContactManager.prototype.displayFormFor = function(contact) {
  let context = { contact: contact, tags: this.tags };
  let $formContent = $(this.templates.contactFormTemplate(context));
  $UIElements.contacts.removeClass('order-last');
  $UIElements.formContainer.html($formContent);
  $UIElements.contacts.toggleClass('collapsed');
  $UIElements.formContainer.toggleClass('collapsed');
};

ContactManager.prototype.displayTagForm = function() {
  let $form = $(this.templates.tagFormTemplate());
  $UIElements.formContainer.html($form).toggleClass('collapsed');
  $UIElements.contacts.toggleClass('collapsed');

}

ContactManager.prototype.hideForm = function() {
  $UIElements.contacts.addClass('order-last').toggleClass('collapsed');
  $UIElements.formContainer.toggleClass('collapsed');
};

ContactManager.prototype.addTag = function(e) {
  e.preventDefault();
  let tag = $(event.target).find('#tagName').val();
  this.tags.push(tag);
  $UIElements.addTag(tag)
};

ContactManager.prototype.getNextId = function() {
  return ++this.currentId;
};

ContactManager.prototype.createContact = function() {
  let newContact = Object.create(contact);
  this.displayFormFor(newContact);
  $UIElements.setFormTitle('Create Contact');
};

// filters all contacts given a search string.
ContactManager.prototype.filterContacts = function(event) {
  event.preventDefault();
  if (this.contacts.length === 0) { return }
  let searchVal = $(event.currentTarget).val();
  if (searchVal.length === 0) {
    this.filterByTag();
    $UIElements.searchEmptyMessage('');
    return;
  }
  let regExp = new RegExp(searchVal.replace(/[^a-z]/ig, ''), 'i');
  this.contacts.forEach(contact => {
    let $article = $(`article:contains(${contact.name})`);
    regExp.test($article.find('#contactName').text()) ? $article.show() : $article.hide();
  });
  if ($('article:visible').length === 0) {
    $UIElements.searchEmptyMessage(searchVal);
  } else {
    $UIElements.searchEmptyMessage('');
  }
};

ContactManager.prototype.filterByTag = function() {
  if (this.contacts.length === 0) { return;}
  let selectedTags = $UIElements.getSelectedTagNames();
  this.contacts.forEach(contact => {
    let $article = $('article').filter((_, el) => $(el).find('input:hidden').val() === contact.id + '');
    selectedTags.indexOf(contact.tag) === -1 ? $article.hide() : $article.show();
  });
  if ($('article:visible').length === 0) {
    $UIElements.searchEmptyMessage(`${selectedTags.join(', ')}`);
  } else {
    $UIElements.searchEmptyMessage('');
  }
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
  $UIElements.setFormTitle('Edit Contact');
};

ContactManager.prototype.cancel = function(e) {
  e.preventDefault();
  this.hideForm();
};

ContactManager.prototype.update = function(e) {
  let contactId = +$(e.target).closest('form').find('input:hidden').val();
  this.getContact(contactId)[$(e.target).attr('id')] = $(e.target).val();
};

ContactManager.prototype.saveCurrentState = function() {
  localStorage.setItem('manager', JSON.stringify(this));
};

let manager= new ContactManager(JSON.parse(localStorage.getItem('manager')));
