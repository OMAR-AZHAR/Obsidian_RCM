import { PatternFormat } from "react-number-format";
const PatternFormatField = (props) => {
  const PatternField = (e) => {
    props.ReceivedPatternData.call(undefined, {
      fieldName: e.target.name,
      fieldValue: e.target.value,
    });
  };
  return (
    <label className={props.labelClass} htmlFor={props.id}>
      {props.label}
      <PatternFormat
        format={props.format}
        mask={props.mask}
        pattern={props.pattern}
        title={props.title}
        type={props.type}
        className={props.className}
        id={props.id}
        placeholder={props.placeholder}
        name={props.id}
        autoComplete={props.autoComplete}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoComplete}
        spellCheck={props.spellCheck}
        onChange={(e) => PatternField(e)}
        value={props.value}
        maxLength={props.maxLength}
        minLength={props.minLength}
      />
    </label>
  );
};
export default PatternFormatField;
