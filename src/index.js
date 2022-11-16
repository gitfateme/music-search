import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import MusicPage from "./MusicPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import "./css/index.css";
import MusicPlayerBar from "./MusicPlayerBar";
import SearchPage from "./SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/musics/:permLink/:musicId",
    element: <MusicPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <MusicPlayerBar />
    </Provider>
  </React.StrictMode>
);
