import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./lip/store.js";

createRoot(document.getElementById("root")).render(
  //  {/* //{" "}
  //   <StrictMode> */}
  <Provider store={store}>
    <App />
  </Provider>
  //  {/* //{" "}
  //   </StrictMode> */}
);
