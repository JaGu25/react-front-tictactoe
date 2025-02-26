import BoardGame from "@/app/game/components/BoardGame";
import WaitingRoom from "@/app/game/components/WaitingRoom/WaitingRoom";
import { initialGameState, useGameStore } from "@/store/game/game.store";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const BoardGamePage = () => {
  const { setInitialGameState } = useGameStore(useShallow((state) => state));
  const { gameMode } = useGameStore((state) => state.gameStateBoard);
  const { botDifficulty } = useGameStore((state) => state);

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
      setInitialGameState({
        gameMode,
        players: {
          playerOne: {
            name: "Player One",
          },
          playerTwo: {
            name: `Bot ${botDifficulty}`,
          },
        },
        gameState: structuredClone(initialGameState),
        playerTurn: "ONE",
        currentStatus: "in-progress",
      });
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
