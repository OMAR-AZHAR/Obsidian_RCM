import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./Routes";
import Spin from "./Spinners/Spin";

export default function App() {
  return (
    <Suspense fallback={<Spin />}>
      {/* All Routes  */}
      <RouterProvider router={router} />
      {/* <OurRoutes /> */}
    </Suspense>
  );
}
