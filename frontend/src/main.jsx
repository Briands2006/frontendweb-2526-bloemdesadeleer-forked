import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout.jsx";
import { Home } from "./pages/Home.jsx";
import Privacy from "./pages/legal/Privacy.jsx";
import NotFoundPage from "./pages/Notfound.jsx";
import Tracks from "./components/tracks/TrackCard.jsx";
import Drivers from "./pages/Drivers.jsx";
import { Calendar } from "./pages/Calendar.jsx";
import { News } from "./pages/News.jsx";

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
        Component: Calendar,
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
        Component: Drivers,
      },
      {
        path: "teams",
        element: <h1 className="text-white text-3xl font-bold">Teams</h1>,
      },
      {
        path: "news",
        Component: News,
      },
      {
        path: "news/:id",
        Component: News, // Voor individuele nieuwsartikelen word nog veranderd :)
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
        path: "login",
        element: <h1 className="text-white text-3xl font-bold">Login Page</h1>,
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
  </StrictMode>,
);
