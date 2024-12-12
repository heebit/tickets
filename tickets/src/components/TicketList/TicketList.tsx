import React from 'react';
import { Ticket } from '../../types/ticket';
import styles from './ticketList.module.scss';

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div className={styles.container}>
      {tickets.map((ticket) => (
        <div key={ticket.id} className={styles.ticket_container}>

          <div className={styles.ticket_buy}>
            <h3>{ticket.airline}</h3>
            <button className={styles.button}>
              Купить за {ticket.price} ₽
            </button>
          </div>

          {/*отбытие*/}
          <div className={styles.ticket__departure}>
            <p>{ticket.departureTime}</p>
            <p>{ticket.from} </p>
            <p>{ticket.dateDeparture}</p>
          </div>

          <p>{ticket.stops} пересадок </p>

          {/*прибытие*/}
          <div className={styles.ticket_arrive}>
            <p>{ticket.arrivalTime}</p>
            <p>{ticket.to}</p>
            <p> {ticket.dateArrival} </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default TicketList;
