import React from "react";

const TextAreaField = (props) => {
  const AlterTextArea = (e) => {
    props.ReceivedTextAreaData.call(undefined, {
      fieldName: e.target.name,
      fieldValue: e.target.value,
    });
  };
  return (
    <textarea
      onChange={(e) => AlterTextArea(e)}
      className={props.className}
      rows={props.rows}
      id={props.id}
      name={props.id}
      placeholder={props.placeholder}
      autoComplete={props.autoComplete}
      autoCapitalize={props.autoCapitalize}
      autoCorrect={props.autoCorrect}
      spellCheck={props.spellCheck}
      value={props.value}
      required={props.required}
      maxLength={props.maxLength}
      minLength={props.minLength}
      readOnly={props.readOnly}
    />
  );
};

export default TextAreaField;
