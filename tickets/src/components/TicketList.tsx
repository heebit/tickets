import React from "react";
import { Ticket } from "../types/ticket";

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.id} style={styles.ticket}>
          <h3>{ticket.airline}</h3>
          <p>
            {ticket.from} → {ticket.to}
          </p>
          <p>
            {ticket.departureTime} – {ticket.arrivalTime}
          </p>
          <p>Цена: {ticket.price} ₽</p>
          <p>Пересадок: {ticket.stops}</p>
          <button style={styles.button}>Купить за {ticket.price} ₽</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  ticket: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
  },
  button: {
    background: "#ff5722",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
};

export default TicketList;
