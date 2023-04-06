import './hepdesk.css';
import Ticket from '../Ticket/Ticket';
import TicketForm from '../TicketForm/TicketForm';

export default class Helpdesk {
  constructor(element, url) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!(this.element instanceof HTMLElement)) {
      throw new Error('Element is not DOM element');
    }

    this.url = url;

    this.ticketsContainer = null;
    this.addTicketBtn = null;

    this.addTicket = this.addTicket.bind(this);
    this.openForm = this.openForm.bind(this);

    this.create();
  }

  create() {
    const header = document.createElement('header');
    header.classList.add('helpdesk-header');
    this.element.appendChild(header);

    this.addTicketBtn = document.createElement('button');
    this.addTicketBtn.classList.add('helpdesk_add-ticket', 'helpdesk-btn');
    this.addTicketBtn.textContent = 'Добавить тикет';
    header.appendChild(this.addTicketBtn);

    this.ticketsContainer = document.createElement('ul');
    this.ticketsContainer.classList.add('tickets-container');
    this.element.appendChild(this.ticketsContainer);

    this.registerEvents();
  }

  registerEvents() {
    this.addTicketBtn.addEventListener('click', this.openForm);
  }

  renderTickets(tickets) {
    tickets.forEach((param) => {
      this.addTicket(param);
    });
  }

  addTicket(param) {
    const ticket = new Ticket(param, this.url);
    ticket.appendTo(this.ticketsContainer);
  }

  openForm() {
    const form = new TicketForm(this.url, this.addTicket);
    form.open();
  }
}
