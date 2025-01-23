
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "../app/admin/routes/routes";
import { authRoutes } from "../app/auth/routes/routes";
import { gameRoutes } from "@/app/game/routes/routes";

export const router = createBrowserRouter([
  ...adminRoutes,
  ...authRoutes,
  ...gameRoutes
]);