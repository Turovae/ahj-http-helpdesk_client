import Helpdesk from './components/Helpdesk/Helpdesk';

const url = 'http://localhost:7070';

const helpdesk = new Helpdesk('.helpdesk', url);

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
