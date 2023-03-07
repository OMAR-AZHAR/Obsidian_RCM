import { lazy } from "react";
const Areart = lazy(() => import("../../Charts/Areart"));
const Pieh = lazy(() => import("../../Charts/Pieh"));
const Composed = lazy(() => import("../../Charts/Composed"));
const Lined = lazy(() => import("../../Charts/Lined"));

export default function Charts(props) {
  return (
    <div
      className="row"
      // style={{ overflowY: "scroll", height: "calc(100vh - 100px)" }}
    >
      {/* <h1 className="mt-0">Welcome, {`User`}</h1> */}
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className={`text-center card-header text-light`}>
            <i className="fas fa-chart-area me-1"></i>
            Area1 Chart Example
          </div>
          <div className="card-body">
            <Areart />
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className={`text-center card-header text-light`}>
            <i className="fas fa-chart-area me-1"></i>
            Area2 Chart Example
          </div>
          <div className="card-body">
            <Composed />
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className={`text-center card-header text-light`}>
            <i className="fas fa-chart-area me-1"></i>
            Revenue Generation
          </div>
          <div className="card-body">
            <Pieh />
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className={`text-center card-header text-light`}>
            <i className="fas fa-chart-bar me-1"></i>
            Bar Chart1 Example
          </div>
          <div className="card-body">
            <Lined />
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className={`text-center card-header text-light`}>
            <i className="fas fa-chart-bar me-1"></i>
            Bar Chart2 Example
          </div>
          <div className="card-body">
            <Lined />
          </div>
        </div>
      </div>
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className={`text-center card-header text-light`}>
            <i className="fas fa-chart-bar me-1"></i>
            Bar Chart3 Example
          </div>
          <div className="card-body">
            <Lined />
          </div>
        </div>
      </div>
    </div>
  );
}
