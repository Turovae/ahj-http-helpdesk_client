import './ticketForm.css';

export default class TicketForm {
  constructor() {
    this.wrapper = null;
    this.form = null;

    this.nameInput = null;
    this.descriptionInput = null;

    this.cancelBtn = null;
    this.submitBtn = null;

    this.create();
  }

  create() {
    this.createWrapper();
    this.createAndAppendForm();
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

    this.createAndAppendHeader('Добавить тикет');
    this.createNameInput();
    this.createAndAppendRow('Краткое описание', [this.nameInput]);
    this.createDescriptionInput();
    this.createAndAppendRow('Подробное описание', [this.descriptionInput]);

    this.cancelBtn = TicketForm.createBtn('reset', 'Отмена', 'form-cancel');
    this.submitBtn = TicketForm.createBtn('submit', 'Ok', 'form-ok');
    this.createAndAppendRow('', [this.cancelBtn, this.submitBtn], ['form-controls']);
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

  static createBtn(type, title, className) {
    const button = document.createElement('button');
    button.classList.add('form-ctrl-btn', className);
    button.type = type;
    button.textContent = title;
    return button;
  }
}
