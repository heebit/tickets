import React, { useState } from 'react';

interface CurrencyProps {
  onCurrencyChange: (currency: string) => void;
}

const Currency: React.FC<CurrencyProps> = ({ onCurrencyChange }) => {
  const [currency, setCurrency] = useState<string>('RUB');

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    onCurrencyChange(newCurrency);
  };

  return (
    <>
      <h3>Валюта</h3>
      <div className='currency-switcher'>
        <button
          className={`currency-button ${currency === 'RUB' ? 'active' : ''}`}
          onClick={() => handleCurrencyChange('RUB')}
        >
          RUB
        </button>
        <button
          className={`currency-button ${currency === 'USD' ? 'active' : ''}`}
          onClick={() => handleCurrencyChange('USD')}
        >
          USD
        </button>
        <button
          className={`currency-button ${currency === 'EUR' ? 'active' : ''}`}
          onClick={() => handleCurrencyChange('EUR')}
        >
          EUR
        </button>
      </div>
    </>
  );
};

export default Currency;
