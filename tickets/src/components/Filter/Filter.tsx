import React, { useEffect } from 'react';

import styles from './filter.module.scss';
import { Checkbox, Stack } from '@chakra-ui/react';

interface FilterProps {
  onFilterChange: (filterName: string, value: number[]) => void; 
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedStops, setSelectedStops] = React.useState<number[]>([]);
  
  const handleStopsChange = (value: number) => {
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
      <Stack spacing={3}>
        <Checkbox
          isChecked={selectedStops.length === 0}
          onChange={() => handleStopsChange(-1)}
          variant="outline"
        >
          Все
        </Checkbox>
        <Checkbox
          isChecked={selectedStops.includes(0)}
          onChange={() => handleStopsChange(0)}
          variant="outline"
        >
          Без пересадок
        </Checkbox>
        <Checkbox
          isChecked={selectedStops.includes(1)}
          onChange={() => handleStopsChange(1)}
          variant="outline"
        >
          1 пересадка
        </Checkbox>
        <Checkbox
          isChecked={selectedStops.includes(2)}
          onChange={() => handleStopsChange(2)}
          variant="outline"
        >
          2 пересадки
        </Checkbox>
        <Checkbox
          isChecked={selectedStops.includes(3)}
          onChange={() => handleStopsChange(3)}
          variant="outline"
        >
          3 пересадки
        </Checkbox>
      </Stack>
    </div>
  );
};

export default Filter;
