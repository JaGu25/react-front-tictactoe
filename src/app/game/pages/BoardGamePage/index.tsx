import BoardGame from "@/app/game/components/BoardGame";
import WaitingRoom from "@/app/game/components/WaitingRoom/WaitingRoom";
import { initialGameState, useGameStore } from "@/store/game/game.store";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const BoardGamePage = () => {
  const { setInitialGameState } = useGameStore(useShallow((state) => state));
  const { gameMode } = useGameStore((state) => state.gameStateBoard);

  useEffect(() => {
    if (gameMode === "local") {
      setInitialGameState({
        gameMode,
        players: {
          playerOne: {
            name: "Player One",
          },
          playerTwo: {
            name: "Player Two",
          },
        },
        gameState: structuredClone(initialGameState),
        playerTurn: "ONE",
        currentStatus: "in-progress",
      });
    } else if (gameMode === "single") {
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
