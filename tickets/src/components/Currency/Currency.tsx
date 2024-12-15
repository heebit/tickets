import React, { createContext, useState } from 'react';
import styles from './currrency.module.scss'

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'RUB',
  setCurrency: () => {}, 
});

const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('RUB');

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency } = React.useContext(CurrencyContext);

  return (
    <div>
      <button
        className={`${styles.currencyButton} ${
          currency === 'RUB' ? styles.active : ''
        }`}
        onClick={() => setCurrency('RUB')}
      >
        RUB
      </button>
      <button
        className={`${styles.currencyButton} ${
          currency === 'USD' ? styles.active : ''
        }`}
        onClick={() => setCurrency('USD')}
      >
        USD
      </button>
      <button
        className={`${styles.currencyButton} ${
          currency === 'EUR' ? styles.active : ''
        }`}
        onClick={() => setCurrency('EUR')}
      >
        EUR
      </button>
    </div>
  );
};

export default CurrencyProvider;
