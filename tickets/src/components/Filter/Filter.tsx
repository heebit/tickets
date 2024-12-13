import React, { useEffect } from 'react';
import styles from './filter.module.scss';


interface FilterProps {
  onFilterChange: (filterName: string, value: number[]) => void; 
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedStops, setSelectedStops] = React.useState<number[]>([]);
  

  const handleStopsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    
    if (value === -1 && selectedStops.length === 4) {
      setSelectedStops([]);
    } else {
      setSelectedStops((prevSelectedStops) => {
        const newSelectedStops = prevSelectedStops.includes(value)
          ? prevSelectedStops.filter(stop => stop !== value)
          : [...prevSelectedStops, value]; 
        return newSelectedStops;
      });
    }
  };

  useEffect(() => {
    onFilterChange('stops', selectedStops);
  }, [selectedStops]);

  console.log(selectedStops);

  return (
    <div className={styles.container_filter}>
      <h3>Количество пересадок</h3>
      <div className={styles.filter_checkbox}>
        <label>
          <input
            type='checkbox'
            value='-1'
            checked={selectedStops.length === 0}
            onChange={handleStopsChange}
          />
          Все
        </label>
        <label>
          <input
            type='checkbox'
            value='0'
            checked={selectedStops.includes(0)}
            onChange={handleStopsChange}
          />
          Без пересадок
        </label>
        <label>
          <input
            type='checkbox'
            value='1'
            checked={selectedStops.includes(1)}
            onChange={handleStopsChange}
          />
          1 пересадка
        </label>
        <label>
          <input
            type='checkbox'
            value='2'
            checked={selectedStops.includes(2)}
            onChange={handleStopsChange}
          />
          2 пересадки
        </label>
        <label>
          <input
            type='checkbox'
            value='3'
            checked={selectedStops.includes(3)}
            onChange={handleStopsChange}
          />
          3 пересадки
        </label>
      </div>
    </div>
  );
};

export default Filter;
