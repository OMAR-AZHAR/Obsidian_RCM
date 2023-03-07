import { lazy } from "react";

import useLocalStorage from "../../../Hooks/useLocalStorage";
const Sidbarsingle = lazy(() => import("./Sidbarsingle"));
const RightContent = lazy(() => import("./RightContent"));

export default function Sidenavi(props) {
  // States for Collapsible Sidebar
  const [displaywidth, setDisplay] =
    // useState(true);
    useLocalStorage("displaywidth", true); // Sidebar Width
  const [layout, setLayout] =
    // useState(true);
    useLocalStorage("layout", true); // Right Content Layout shift
  const [angletoright, setangletoright] =
    // useState(false);
    useLocalStorage("angletoright", false); // React Icon toggle
  const [searchdisplay, setsearchdisplay] =
    // useState("block");
    useLocalStorage("block", true); // Search field toggle

  const toggleSidebar = () => {
    if (angletoright === false) {
      setDisplay("CollapseSide");
      setangletoright(true);
      setLayout("6%");
      setsearchdisplay("none");
    } else {
      setDisplay("");
      setangletoright(false);
      setLayout("");
      setsearchdisplay("block");
    }
  };
  return (
    <>
      <div
        id="layoutSidenav_nav"
        className={`${displaywidth}`}
        style={{ transition: "0.8s" }}
      >
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <Sidbarsingle
                searchdisplay={searchdisplay}
                toggleSidebar={toggleSidebar}
                angletoright={angletoright}
              />
            </div>
          </div>
        </nav>
      </div>

      <RightContent layout={layout} />
    </>
  );
}
