import { useState } from 'react';
import Select from 'react-select';
const options = [
  { value: 'selectall', label: 'Select All' },
  { value: 'someuser', label: 'Some User' },
];
const SelectUser = () => {
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

export default SelectUser;
