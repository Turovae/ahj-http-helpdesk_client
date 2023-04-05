/* eslint-disable import/no-extraneous-dependencies */
const moment = require('moment');
// require('moment/locale/ru');
// moment().format('YYYY-MM-DD');

export default class Ticket {
  constructor(params) {
    this.params = params;

    this.element = null;

    this.statusEl = null;
    this.bodyEl = null;

    this.editBtn = null;
    this.deleteBtn = null;

    this.createEl();
  }

  createEl() {
    this.element = document.createElement('li');
    this.element.classList.add('helpdesk-ticket');
    this.element.dataset.id = this.params.id;

    this.createAndAppendStatusContainer();
    this.createAndAppendBodyElement();
    this.createAndAppendCreatedData();
    this.createAndAppendTicketControls();
  }

  appendTo(element) {
    element.appendChild(this.element);
  }

  createAndAppendStatusContainer() {
    const statusContainer = document.createElement('div');
    statusContainer.classList.add('ticket-status');
    this.element.appendChild(statusContainer);

    this.statusEl = document.createElement('input');
    this.statusEl.type = 'checkbox';
    this.statusEl.checked = this.params.status;
    this.statusEl.classList.add('ticket-complete');
    statusContainer.appendChild(this.statusEl);
  }

  createAndAppendBodyElement() {
    this.bodyEl = document.createElement('div');
    this.bodyEl.classList.add('ticket-body');
    this.element.appendChild(this.bodyEl);

    const nameEl = document.createElement('div');
    nameEl.classList.add('ticket-name');
    nameEl.textContent = this.params.name;
    this.bodyEl.appendChild(nameEl);
  }

  createAndAppendCreatedData() {
    const createdTicketEl = document.createElement('div');
    createdTicketEl.classList.add('ticket-created');
    createdTicketEl.textContent = moment(this.params.created).format('DD.MM.YYYY HH:MM');
    this.bodyEl.appendChild(createdTicketEl);
  }

  createAndAppendTicketControls() {
    const ticketControls = document.createElement('div');
    ticketControls.classList.add('ticket-controls');
    this.element.appendChild(ticketControls);

    this.editBtn = Ticket.createAndAppendBtn(ticketControls, '✎', 'ticket-edit');
    this.deleteBtn = Ticket.createAndAppendBtn(ticketControls, 'x', 'ticket-delete');
  }

  static createAndAppendBtn(container, content, className) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = content;
    container.appendChild(button);
    return button;
  }
}
