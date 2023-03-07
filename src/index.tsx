import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";

import { store } from "./Redux/app/store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // StrictMode Disabled due to unusual behavior of the useEffect
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>

  // </React.StrictMode>
);
