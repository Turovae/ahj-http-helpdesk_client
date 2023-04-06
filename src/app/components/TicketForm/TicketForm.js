import './ticketForm.css';

export default class TicketForm {
  constructor(url, handler, data = null) {
    this.url = url;
    this.handler = handler;
    this.data = data;

    this.wrapper = null;
    this.form = null;

    this.nameInput = null;
    this.descriptionInput = null;

    this.cancelBtn = null;
    this.submitBtn = null;

    this.close = this.close.bind(this);
    this.addTicket = this.addTicket.bind(this);
    this.editTicket = this.editTicket.bind(this);

    this.create();
  }

  create() {
    this.createWrapper();
    this.createAndAppendForm();
    this.registerEvents();
  }

  registerEvents() {
    this.form.addEventListener('reset', this.close);
    if (this.data) {
      this.form.addEventListener('submit', this.editTicket);
    } else {
      this.form.addEventListener('submit', this.addTicket);
    }
  }

  open() {
    document.body.appendChild(this.wrapper);
  }

  createWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('modal-wrapper');
  }

  createAndAppendForm() {
    this.form = document.createElement('form');
    this.form.classList.add('ticket-form');
    this.form.enctype = 'multipart/form-data';
    this.wrapper.appendChild(this.form);

    this.createAndAppendHeader(`${this.data ? 'Редактировать' : 'Добавить'} тикет`);
    this.createNameInput();
    this.createAndAppendRow('Краткое описание', [this.nameInput]);
    this.createDescriptionInput();
    this.createAndAppendRow('Подробное описание', [this.descriptionInput]);

    this.cancelBtn = TicketForm.createBtn('reset', 'Отмена', 'form-cancel');
    this.submitBtn = TicketForm.createBtn('submit', 'Ok', 'form-ok');
    this.createAndAppendRow('', [this.cancelBtn, this.submitBtn], ['form-controls']);

    if (this.data) {
      this.fillFields();
    }
  }

  createAndAppendHeader(title) {
    const header = document.createElement('h2');
    header.classList.add('form-header');
    header.textContent = title;
    this.form.appendChild(header);
  }

  createAndAppendRow(title, innerElements, classes) {
    const row = document.createElement('div');
    row.classList.add('form-row');
    if (classes) {
      row.classList.add(...classes);
    }

    let elements = innerElements;

    if (title.length > 0) {
      const header = document.createElement('h3');
      header.classList.add('form-hint');
      header.textContent = title;
      elements = [header, ...elements];
    }

    elements.forEach((elem) => {
      row.appendChild(elem);
    });

    this.form.appendChild(row);
  }

  createNameInput() {
    this.nameInput = document.createElement('input');
    this.nameInput.classList.add('form-input');
    this.nameInput.type = 'text';
    this.nameInput.name = 'name';
    this.nameInput.required = true;
  }

  createDescriptionInput() {
    this.descriptionInput = document.createElement('textarea');
    this.descriptionInput.classList.add('form-input');
    this.descriptionInput.name = 'description';
    this.descriptionInput.required = true;
    this.descriptionInput.rows = 3;
  }

  fillFields() {
    this.nameInput.value = this.data.name;
    this.descriptionInput.value = this.data.description;
  }

  static createBtn(type, title, className) {
    const button = document.createElement('button');
    button.classList.add('form-ctrl-btn', className);
    button.type = type;
    button.textContent = title;
    return button;
  }

  close(event) {
    event.preventDefault();
    this.wrapper.remove();
  }

  async addTicket(event) {
    event.preventDefault();

    const formData = new FormData(this.form);

    const response = await fetch(`${this.url}/tickets/ticket`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const ticket = await response.json();
      this.handler(ticket);
      this.close(event);
    } else {
      const errMessage = await response.text();
      this.showMessage(`Error: ${errMessage}`);
    }
  }

  async editTicket(event) {
    event.preventDefault();

    const formData = new FormData(this.form);

    const response = await fetch(`${this.url}/tickets/${this.data.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      const ticket = await response.json();
      this.handler(ticket.name, ticket.description);
      this.close(event);
    }
  }

  showMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.classList.add('err-message');
    messageEl.textContent = message;
    this.wrapper.appendChild(messageEl);

    setTimeout(() => {
      messageEl.remove();
    }, 2000);
  }
}
