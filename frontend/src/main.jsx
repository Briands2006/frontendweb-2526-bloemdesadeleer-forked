import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/auth.context.jsx";

import Layout from "./Layout.jsx";
import { Home } from "./pages/Home.jsx";
import Privacy from "./pages/legal/Privacy.jsx";
import NotFoundPage from "./pages/Notfound.jsx";
import Tracks from "./pages/Tracks.jsx";
import Drivers from "./pages/Drivers.jsx";
import { Calendar } from "./pages/Calendar.jsx";
import { News } from "./pages/News.jsx";
import { NewsDetail } from "./pages/detail/NewsDetail.jsx";
import { About } from "./pages/About.jsx";
import { Teams } from "./pages/Teams.jsx";
import { TeamDetail } from "./pages/detail/TeamDetail.jsx";
import { DriverDetails } from "./pages/detail/DriverDetails.jsx";
import { Login } from "./pages/auth/Login.jsx";
import { Register } from "./pages/auth/Register.jsx";
import { Profile } from "./pages/Profile.jsx";
import { PrivateRoute } from "./pages/routes/PrivateRoute.jsx";
import { AdminRoute } from "./pages/routes/AdminRoute.jsx";
import { AdminDashboard } from "./pages/misc/Admin.jsx";
import { TrackDetail } from "./pages/detail/TrackDetail.jsx";
import { RaceDetail } from './pages/detail/RaceDetail.jsx';

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
        path:"races/:raceName",
        Component: RaceDetail,
      },
      {
        path: "tracks",
        Component: Tracks,
      },
      {
        path: "tracks/:trackName",
        Component: TrackDetail,
      },
      {
        path: "drivers/:driverName",
        Component: DriverDetails,
      },
      {
        path: "drivers",
        Component: Drivers,
      },
      {
        path: "teams",
        Component: Teams,
      },
      {
        path: "teams/:teamSlug",
        Component: TeamDetail,
      },
      {
        path: "news",
        Component: News,
      },
      {
        path: "news/:id",
        Component: NewsDetail,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "privacy",
        Component: Privacy,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
