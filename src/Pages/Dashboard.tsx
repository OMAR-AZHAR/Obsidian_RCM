import { lazy, useState, useEffect } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
const Sidenavi = lazy(
  () => import("../Components/Home/Dashboard_Content/Sidenavi")
);
const NewNav = lazy(() => import("../Components/Home/Dashboard_Content/Menu"));
import logoforlight from "../assets/img/latest-logo-dark.webp";
import logofordark from "../assets/img/Logoblack.webp";
export default function Dashboard() {
  const [mode, setMode] = useLocalStorage("mode", "light");
  const [checked, setChecked] = useLocalStorage("darkmode", false);
  const [logo, setLogo] = useLocalStorage("logo", logoforlight);
  // var cardstate = Array.from(document.querySelectorAll(".card"));
  // var cardhead = Array.from(document.querySelectorAll(".card-header"));
  function CardDark() {
    // cardstate.forEach((element: any) => {
    //   element.style.backgroundColor = "#fff";
    //   element.style.color = "#242424";
    // });
    // cardhead.forEach((element: any) => {
    //   element.style.backgroundColor = "#1e73be !important";
    //   element.style.color = "#fff !important";
    // });
  }
  function CardLight() {
    // cardstate.forEach((element: any) => {
    //   element.style.backgroundColor = "#242424";
    //   element.style.color = "#fff";
    // });
    // cardhead.forEach((element: any) => {
    //   element.style.backgroundColor = "#264451 !important";
    //   element.style.color = "#fff !important";
    // });
  }
  function toggleMode() {
    if (mode === "dark") {
      setLogo(logoforlight);
      setMode("light");
      setChecked(false);
      CardDark();
    } else {
      setLogo(logofordark);
      setMode("dark");
      setChecked(true);
      CardLight();
    }
  }
  return (
    <div
      className={`user-select-none sb-nav-fixed pt-5 bg-${mode} text-${
        mode === "light" ? "dark" : "light"
      }`}
    >
      <div id="layoutSidenav">
        <NewNav
          checked={checked}
          mode={mode}
          toggleMode={toggleMode}
          logo={logo}
        />
        <div className="container-fluid">
          <Sidenavi />
        </div>
      </div>
    </div>
  );
}
