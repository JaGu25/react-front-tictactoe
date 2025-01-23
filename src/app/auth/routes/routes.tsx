import { RouteObject } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Auth from "../pages/Auth";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];
