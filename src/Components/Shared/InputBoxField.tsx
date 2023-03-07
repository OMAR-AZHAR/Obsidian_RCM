import React from "react";
function InputBoxField(props) {
  const AlterTextField = (e) => {
    props.ReceivedTextData.call(undefined, {
      fieldName: e.target.name,
      fieldValue: e.target.value,
    });
  };
  return (
    <>
      <label htmlFor={props.id} className={props.labelClass}>
        {props.label}{" "}
      </label>
      <input
        pattern={props.pattern}
        title={props.title}
        type={props.type}
        aria-label={props.ariaLabel}
        className={`form-control ${props.className}`}
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        spellCheck={props.spellCheck}
        value={props.value}
        required={props.required}
        onChange={(e) => AlterTextField(e)}
        maxLength={props.maxLength}
        minLength={props.minLength}
        readOnly={props.readOnly}
        data-bs-target={props.target}
        data-bs-toggle={props.toggle}
      />
    </>
  );
}
export default InputBoxField;
