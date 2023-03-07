import React from "react";
function CheckBoxField() {
  return (
    <div>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="inactive_providers"
        name="inactive_providers"
      />
      <label className="form-check-label" htmlFor="inactive_providers">
        Include inactive codes
      </label>
    </div>
  );
}
export default CheckBoxField;
