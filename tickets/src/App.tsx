import React, { useState, useCallback, useMemo } from 'react';
import TicketList from './components/TicketList/TicketList';
import Filter from './components/Filter/Filter';
import ticketsData from './tickets.json';
import { Ticket } from './types/ticket';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [filters, setFilters] = useState<{ stops: number[] }>({ stops: [] });

  const handleFilterChange = useCallback(
    (filterName: string, value: number[]) => {
      if (filterName === 'stops') {
        setFilters((prevFilters) => ({
          ...prevFilters,
          stops: value,
        }));
      }
    },
    []
  );

  const filteredTickets = useMemo(() => {
    return ticketsData.filter((ticket: Ticket) => {
      if (filters.stops.length === 0) return true;
      return filters.stops.includes(ticket.stops);
    });
  }, [filters.stops]);

  const sortedTickets = useMemo(() => {
    return filteredTickets.sort((a, b) => a.price - b.price);
  }, [filteredTickets]);

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className={styles.ticket_list}>
        {sortedTickets.length > 0 ? (
          <TicketList tickets={sortedTickets} />
        ) : (
          <p>Нет доступных билетов</p>
        )}
      </div>
    </div>
  );
};

export default App;
