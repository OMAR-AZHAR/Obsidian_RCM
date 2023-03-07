import { lazy } from "react";
const ConfigureEligibilityTable = lazy(() => import("./ProviderTables/ConfigureEligibilityTable"));
const ConfigureEligibility = () => {
  return (
    <div className="row mt-4 d-flex flex-column">
      <div className="col-md-12 fw-bold" />
      <div className="col-md-12">
        <ConfigureEligibilityTable />
      </div>
    </div>
  );
};
export default ConfigureEligibility;
