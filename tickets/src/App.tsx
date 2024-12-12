import React, { useState, useCallback } from "react";
import TicketList from "./components/TicketList/TicketList";
import Filter from "./components/Filter/Filter";
import ticketsData from "./tickets.json";
import { Ticket } from "./types/ticket";
import styles from "./App.module.scss"

const App: React.FC = () => {
  const [filters, setFilters] = useState<{ stops: number[] }>({
    stops: [], // Инициализируем массив для пересадок
  });

  // Используем useCallback для оптимизации функции
  const handleFilterChange = useCallback((filterName: string, value: number[]) => {
    if (filterName === "stops") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        stops: value, // Сохраняем массив выбранных значений
      }));
    }
  }, []); // Пустой массив зависимостей, чтобы функция не пересоздавалась

  // Фильтрация билетов на основе выбранных пересадок
  const filteredTickets = ticketsData.filter((ticket: Ticket) => {
    if (filters.stops.length === 0) return true; // Если фильтры не выбраны, возвращаем все билеты
    return filters.stops.includes(ticket.stops); // Проверяем, входит ли количество пересадок в выбранные значения
  });

  const sortedTickets = filteredTickets.sort((a, b) => a.price - b.price); // Сортировка по цене
console.log(filters)
  return (
    <div className={styles.container}>
      <div className={styles.filter}>
      <Filter onFilterChange={handleFilterChange} />
      </div>
      <div className={styles.ticket_list}>
      <TicketList tickets={sortedTickets} />
      </div>
    </div>
  );
};

export default App;
