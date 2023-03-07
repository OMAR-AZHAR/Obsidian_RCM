import { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'selectall', label: 'Select All' },
  { value: 'someuser', label: 'Test Customer-1232321' },
];
const SelectCustomer = () => {
  const [value, setValue] = useState();
  const onSelection = (e) => {
    setValue('selected value');
  };
  return (
    <div>
      <Select isMulti options={options} />
    </div>
  );
};

export default SelectCustomer;
