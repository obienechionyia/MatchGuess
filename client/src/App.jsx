import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddMatch,
  Stats,
  AllMatches,
  Profile,
  Admin,
  EditMatch,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addMatchAction } from "./pages/AddMatch";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allMatchesLoader } from "./pages/AllMatches";
import { loader as editMatchLoader } from "./pages/EditMatch";
import { action as editMatchAction } from "./pages/EditMatch";
import { action as deleteMatchAction } from "./pages/DeleteMatch";
import { action as profileAction } from "./pages/Profile";

// check the localStorage for dark theme setting
const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

// create variable with checked theme to be used in router
const isDarkThemeEnabled = checkDefaultTheme();

// router for navigating the site
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddMatch />,
            action: addMatchAction,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "edit-match/:id",
            element: <EditMatch />,
            action: editMatchAction,
            loader: editMatchLoader,
          },
          {
            path: "delete-match/:id",
            action: deleteMatchAction,
          },
          {
            path: "all-matches",
            element: <AllMatches />,
            loader: allMatchesLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
