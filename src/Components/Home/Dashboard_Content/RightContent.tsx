import { Outlet } from "react-router-dom";

export default function RightContent(props: { layout: any }) {
  return (
    <div
      id="layoutSidenav_content"
      style={{ paddingLeft: `${props.layout}`, transition: "1s" }}
    >
      <div className="px-0 mx-0 py-0 my-0">
        <main>
          <Outlet />
          {/* Routing Components within dashboard's right to="/ ..." */}
        </main>
      </div>
    </div>
  );
}
