/* eslint-disable import/no-extraneous-dependencies */
import './ticket.css';
import TicketForm from '../TicketForm/TicketForm';
import DeleleteModal from '../DeleteModal/DeleteModal';

const moment = require('moment');

export default class Ticket {
  constructor(params, url) {
    this.params = params;
    this.url = url;

    this.element = null;

    this.statusEl = null;
    this.bodyEl = null;
    this.descriptionEl = null;
    this.modal = null;

    this.editBtn = null;
    this.deleteBtn = null;

    this.changeStatus = this.changeStatus.bind(this);
    this.openDescription = this.openDescription.bind(this);
    this.closeDescription = this.closeDescription.bind(this);
    this.opentEditForm = this.opentEditForm.bind(this);
    this.editTicket = this.editTicket.bind(this);
    this.openDelModal = this.openDelModal.bind(this);

    this.delete = this.delete.bind(this);

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

    this.registerEvents();
  }

  registerEvents() {
    this.statusEl.addEventListener('change', this.changeStatus);
    this.bodyEl.addEventListener('click', this.openDescription);
    this.editBtn.addEventListener('click', this.opentEditForm);
    this.deleteBtn.addEventListener('click', this.openDelModal);
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
    createdTicketEl.textContent = moment(this.params.created).format('DD.MM.YYYY HH:mm');
    this.element.appendChild(createdTicketEl);
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
    button.classList.add(className, 'ticket-btn');
    button.textContent = content;
    container.appendChild(button);
    return button;
  }

  async changeStatus(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('status', this.statusEl.checked);

    const response = await fetch(`${this.url}/tickets/${this.params.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (response.ok) {
      const ticket = await response.json();
      this.params.status = JSON.parse(ticket.status);
    }

    this.statusEl.checked = this.params.status;
  }

  async openDescription(event) {
    event.preventDefault();

    if (!this.descriptionEl) {
      const response = await fetch(`${this.url}/tickets/${this.params.id}`, {
        method: 'GET',
      });

      if (response.ok) {
        const ticket = await response.json();
        this.createDescription(ticket);
      }
    } else {
      this.bodyEl.appendChild(this.descriptionEl);
    }
    this.bodyEl.removeEventListener('click', this.openDescription);
    document.body.addEventListener('click', this.closeDescription);
    event.stopPropagation();
  }

  createDescription(params) {
    this.descriptionEl = document.createElement('div');
    this.descriptionEl.classList.add('ticket-description');
    this.descriptionEl.textContent = params.description;
    this.bodyEl.appendChild(this.descriptionEl);
  }

  closeDescription(event) {
    event.preventDefault();

    this.descriptionEl.remove();
    document.body.removeEventListener('click', this.closeDescription);
    this.bodyEl.addEventListener('click', this.openDescription);
  }

  editTicket(name, description) {
    this.params.name = name;
    this.bodyEl.textContent = name;

    if (this.descriptionEl) {
      this.params.description = description;
      this.descriptionEl.textContent = description;
    }
  }

  openDelModal(event) {
    event.preventDefault();

    this.modal = new DeleleteModal(this.delete);
    this.modal.open();
  }

  async delete() {
    const response = await fetch(`${this.url}/tickets/${this.params.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      this.element.remove();
      this.modal.close();
    }
  }

  async opentEditForm(event) {
    event.preventDefault();

    const response = await fetch(`${this.url}/tickets/${this.params.id}`, {
      method: 'GET',
    });

    if (response.ok) {
      const ticket = await response.json();
      const form = new TicketForm(this.url, this.editTicket, ticket);
      form.open();
    }
  }
}
