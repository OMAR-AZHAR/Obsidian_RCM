import { components } from 'react-select';

export const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          style={{ cursor: 'pointer' }}
          placeholder={props.placeholder}
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{' '}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);
