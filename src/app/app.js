import Helpdesk from './components/Helpdesk/Helpdesk';
import TicketForm from './components/TicketForm/TicketForm';
// const ticketForm = document.querySelector('.add_ticket-form');
// const titleEl = controllTicketform['ticket-title'];
// const descriptionEl = controllTicketform['ticket-description'];

const url = 'http://localhost:7070';

// controllTicketform.addEventListener('submit', (event) => {
//   event.preventDefault();

//   console.log(event);
//   const formData = new FormData(controllTicketform);
//   console.dir(controllTicketform);
//   console.log(formData);

//   const xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState !== 4) {
//       return;
//     }
//     console.log(xhr.responseText);
//   };

//   xhr.open('POST', `${url}/ticket`);

//   xhr.send(formData);
// });

// ticketForm.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const formData = new FormData(ticketForm);

//   const response = await fetch(`${url}/tickets/ticket`, {
//     method: 'POST',
//     body: formData,
//   });

//   const result = await response;

//   console.log(result);
// });

const helpdesk = new Helpdesk('.helpdesk', url);
// const ticketForm = new TicketForm(url);
// ticketForm.open();

window.onload = (event) => {
  event.preventDefault();

  fetch(`${url}/tickets`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((tickets) => {
      helpdesk.renderTickets(tickets);
    });
};
