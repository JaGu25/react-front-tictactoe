import { RouteObject } from "react-router-dom";
import GameLayout from "@/app/game/pages/GameLayout";
import HomePage from "@/app/game/pages/HomePage";
import BotDifficultySelectionPage from "@/app/game/pages/BotDifficultySelectionPage";
import BoardGamePage from "@/app/game/pages/BoardGamePage";

export const gameRoutes: RouteObject[] = [
  {
    path: "/",
    element: <GameLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/difficulty",
        element: <BotDifficultySelectionPage />,
      },
      {
        path: "/board-game",
        element: <BoardGamePage />,
      },
    ],
  },
];
