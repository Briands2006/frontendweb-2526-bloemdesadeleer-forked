import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout.jsx";
import { Home } from "./pages/Home.jsx";
import Privacy from "./pages/legal/Privacy.jsx";
import NotFoundPage from "./pages/Notfound.jsx";
import Tracks from "./components/Tracks.jsx";
import Drivers from "./pages/Drivers.jsx";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "calendar",
        element: <h1 className="text-white text-5xl font-bold">calendar test</h1>,
      },
      {
        path: "tracks",
        element: (
          <>
            <h1 className="text-white text-5xl font-bold">tracks test</h1>
            <Tracks />
          </>
        ),
      },
      {
        path: "drivers",
        element: (
          <>
            <h1 className="text-white text-5xl font-bold p-2">Drivers</h1>
            <Drivers />
          </>
        ),
      },
      {
        path: "teams",
        element: <h1 className="text-white text-3xl font-bold">Teams</h1>,
      },
      {
        path: "news",
        element: <h1 className="text-white text-3xl font-bold">news test</h1>,
      },
      {
        path: "about",
        element: <h1 className="text-white text-3xl font-bold">About Us</h1>,
      },
      {
        path: "privacy",
        Component: Privacy,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);