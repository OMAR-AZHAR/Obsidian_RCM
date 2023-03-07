import { useCallback } from "react";
import { Button, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const newfacility = useCallback(
  () => navigate("/user/newfacility", { replace: true }),
  [navigate]
);
export const popover = (
  <Popover id="referringpopover">
    <Popover.Body>
      <Button
        className="bg-secondary text-white"
        onClick={newfacility}
        variant="light btn-sm"
      >
        Add Manually
      </Button>{" "}
      <br />
      <Button
        className="bg-secondary text-white"
        onClick={() => alert("add via npi reg")}
        variant="light btn-sm"
      >
        Add via NPI Registry
      </Button>
    </Popover.Body>
  </Popover>
);
