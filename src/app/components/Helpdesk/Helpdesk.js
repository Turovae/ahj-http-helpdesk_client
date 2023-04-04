export default class Helpdesk {
  constructor(element) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!(this.element instanceof HTMLElement)) {
      throw new Error('Element is not DOM element');
    }

    this.ticketsContainer = null;
    this.addTicketBtn = null;

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
  }

  renderTickets(tickets) {
    tickets.forEach((ticket) => {
      const ticketEl = document.createElement('li');
      ticketEl.innerText = ticket.name;

      this.ticketsContainer.appendChild(ticketEl);
    });
  }
}
