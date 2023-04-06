export default class DeleleteModal {
  constructor(handler) {
    this.handler = handler;

    this.wrapper = null;
    this.form = null;

    this.cancelBtn = null;
    this.submitBtn = null;

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

    this.create();
  }

  create() {
    this.createWrapper();
    this.createAndAppendForm();
    this.registerEvents();
  }

  registerEvents() {
    this.form.addEventListener('reset', this.close);
  }

  open() {
    document.body.appendChild(this.wrapper);
  }

  close(event) {
    event.preventDefault();
    this.wrapper.remove();
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

    this.createAndAppendHeader('Удалить тикет');
    const paragraph = DeleleteModal.createParagraph(
      'Вы уверены, что хотите удалить тикет? Это действие необратимо.',
    );
    this.createAndAppendRow('', [paragraph]);

    this.cancelBtn = DeleleteModal.createBtn('reset', 'Отмена', 'form-cancel');
    this.submitBtn = DeleleteModal.createBtn('submit', 'Ok', 'form-ok');
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

  static createBtn(type, title, className) {
    const button = document.createElement('button');
    button.classList.add('form-ctrl-btn', className);
    button.type = type;
    button.textContent = title;
    return button;
  }

  static createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.classList.add('form-description');
    paragraph.textContent = text;
    return paragraph;
  }
}
