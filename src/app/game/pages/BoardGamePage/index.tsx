import BoardGame from "@/app/game/components/BoardGame";
import WaitingRoom from "@/app/game/components/WaitingRoom/WaitingRoom";
import { useGameConfigStore } from "@/store/game/game-config.store";
import { useGameStore } from "@/store/game/game.store";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const BoardGamePage = () => {
  const { setInitialGameState } = useGameStore(useShallow((state) => state));
  const { gameMode } = useGameConfigStore((state) => state);

  useEffect(() => {
    if (gameMode === "local") {
      setInitialGameState(["Player One", "Player Two"]);
    } else if (gameMode === "multiplayer") {
    } else {
    }
  }, []);

  return (
    <div className="flex flex-col gap-14 mt-8">
      {gameMode === "multiplayer" ? <WaitingRoom /> : <BoardGame />}
    </div>
  );
};

export default BoardGamePage;
