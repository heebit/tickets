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
            
          <div className={styles.ticket_buy_logo}>
            <img src='/logo.png' alt="logo" />
          </div>
            <button className={styles.button}>
              Купить за {ticket.price} ₽
            </button>
          </div>
          <div className={styles.ticket_info}>
            {/*отбытие*/}
            <div className={styles.ticket_departure}>
              <p>{ticket.departureTime}</p>
              <p>{ticket.from} </p>
              <p>{ticket.dateDeparture}</p>
            </div>

            <div className={styles.ticket_stops}>
              <p>{ticket.stops} пересадок </p>
              <div className={styles.ticket_stops__line}></div>
            </div>

            {/*прибытие*/}
            <div className={styles.ticket_arrive}>
              <p>{ticket.arrivalTime}</p>
              <p>{ticket.to}</p>
              <p> {ticket.dateArrival} </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
