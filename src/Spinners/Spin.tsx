import { Button, Modal as Mod } from "react-bootstrap";
import {
  SpinnerCircular,
  SpinnerCircularSplit,
  SpinnerDotted,
  SpinnerInfinity,
} from "spinners-react";
export default function Spin() {
  return (
    <Mod
      centered
      backdrop="static"
      keyboard={false}
      show={true}
      style={{ backgroundColor: "transparent" }}
    >
      <Mod.Body>
        <div className="px-0 me-0">
          <div className="row">
            <div className="text-center">
              <SpinnerInfinity
                size={100}
                thickness={134}
                speed={110}
                color="#1e73be"
                secondaryColor="rgba(57, 137, 172, 0.2)"
              />
            </div>
            <b className="col-md-12 mt-3 text-center">Loading...Please Wait</b>
          </div>
        </div>
      </Mod.Body>
    </Mod>
  );
}
