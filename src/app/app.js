import Helpdesk from './components/Helpdesk/Helpdesk';
import DeleleteModal from './components/DeleteModal/DeleteModal';

const url = 'http://localhost:7070';

const helpdesk = new Helpdesk('.helpdesk', url);

const deleteModal = new DeleleteModal();
deleteModal.open();

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
