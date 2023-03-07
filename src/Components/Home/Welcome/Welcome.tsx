import { lazy } from "react";
const Charts = lazy(() => import("../Dashboard_Content/Charts"));
const Header = lazy(() => import("../Dashboard_Content/Header"));
const Announcement = lazy(() => import("./Announcement"));

const Welcome = () => {
  return (
    <div className="row">
      <div className="col-md-8">
        <Header />
        <Charts />
      </div>
      <div className="col-md-4 mt-3">
        <Announcement />
      </div>
    </div>
  );
};

export default Welcome;
