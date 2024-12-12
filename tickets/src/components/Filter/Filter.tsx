import React, { useEffect } from 'react';
import styles from './filter.module.scss'

interface FilterProps {
  onFilterChange: (filterName: string, value: number[]) => void; // Изменили тип на массив чисел
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedStops, setSelectedStops] = React.useState<number[]>([]); // Состояние для хранения выбранных пересадок

  const handleStopsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    console.log('!',selectedStops.length)
    // Если выбран чекбокс "Все"
    
    if (value === -1 && selectedStops.length === 4) {
      setSelectedStops([]);
    } else {
      setSelectedStops((prevSelectedStops) => {
        const newSelectedStops = prevSelectedStops.includes(value)
          ? prevSelectedStops.filter(stop => stop !== value) // Убираем выбранное значение
          : [...prevSelectedStops, value]; // Добавляем новое значение
        return newSelectedStops; // Возвращаем новый массив для состояния
      });
    }
  };

  // Используйте useEffect, чтобы обновить родительский компонент после изменения состояния
  useEffect(() => {
    onFilterChange('stops', selectedStops);
  }, [selectedStops]); // Зависимость только от selectedStops
  console.log(selectedStops)

  return (
    <div className={styles.container_filter}>
      <h3>Количество пересадок</h3>
      <div>
      <label>
          <input
            type='checkbox'
            value='-1' // Используем -1 для "Все"
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
