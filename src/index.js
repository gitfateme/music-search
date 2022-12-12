import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorPage from "./ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import "./css/index.scss";
import Home from "./Home";
import Search from "./Search";
import {
  TopResults,
  ArtistsReults,
  SongsResults,
  AlbumsResults,
} from "./ResultsComponent";
import MusicPage from "./MusicPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/musics/:permLink/:musicId",
        element: <MusicPage />,
      },
      {
        path: "/search",
        element: <Search />,
        children: [
          {
            path: "/search",
            element: <TopResults />,
          },
          {
            path: "/search/artists",
            element: <ArtistsReults />,
          },
          {
            path: "/search/songs",
            element: <SongsResults />,
          },
          {
            path: "/search/albums",
            element: <AlbumsResults />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/musics/:permLink/:musicId",
  //   element: <MusicPage />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/search/",
  //   element: <SearchPage />,
  //   errorElement: <ErrorPage />,
  // },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
