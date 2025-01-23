import { RouteObject } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import DashboardPage from "@/app/admin/pages/dashboard/DashboardPage";
import NotePage from "@/app/admin/pages/notes/NotePage";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "notes",
        element: <NotePage />,
      },
    ],
  },
];
