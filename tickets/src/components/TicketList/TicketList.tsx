import React, { useContext, useEffect, useState } from 'react';
import { Ticket } from '../../types/ticket';
import styles from './ticketList.module.scss';
import { CurrencyContext } from '../Currency/Currency';
import { Convert } from "easy-currencies";

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  const { currency } = useContext(CurrencyContext); // Получаем текущую валюту из контекста

  const [convertedPrices, setConvertedPrices] = useState<Record<number, number>>({});

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      default:
        return '₽';
    }
  };

  const getPrice = async (currency: string, price: number): Promise<number> => {
    switch (currency) {
      case 'USD':
        try {
          const conversionRate = await Convert(1).from("RUB").to("USD");
          return price * conversionRate;
        } catch (error) {
          console.error('Ошибка конвертации:', error);
          return price;
        }
      case 'EUR':
        try {
          const conversionRate = await Convert(1).from("RUB").to("EUR");
          return price * conversionRate;
        } catch (error) {
          console.error('Ошибка конвертации:', error);
          return price;
        }
      default:
        return price;
    }
  };

  useEffect(() => {
    const updatePrices = async () => {
      const prices: Record<number, number> = {};
      for (const ticket of tickets) {
        prices[ticket.id] = await getPrice(currency, ticket.price);
      }
      setConvertedPrices(prices);
    };

    updatePrices();
  }, [tickets, currency]);

  return (
    <div className={styles.container}>
      {tickets.map((ticket) => (
        <div key={ticket.id} className={styles.ticket_container}>
          <div className={styles.ticket_buy}>
            <div className={styles.ticket_buy_logo}>
              <img src="/logo.png" alt="logo" />
            </div>
            <button className={styles.button}>
              Купить <br />
              за {convertedPrices[ticket.id] !== undefined 
                ? Number(convertedPrices[ticket.id].toFixed(2)).toLocaleString('ru-RU') 
                : '...'}{' '}
              {getCurrencySymbol(currency)}
            </button>
          </div>
          <div className={styles.ticket_info}>
            <div className={styles.ticket_departure}>
              <p>{ticket.departureTime}</p>
              <p>{ticket.from}</p>
              <p>{ticket.dateDeparture}</p>
            </div>
            <div className={styles.ticket_stops}>
              <p>{ticket.stops} пересадок</p>
              <div className={styles.ticket_stops__line}></div>
            </div>
            <div className={styles.ticket_arrive}>
              <p>{ticket.arrivalTime}</p>
              <p>{ticket.to}</p>
              <p>{ticket.dateArrival}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
