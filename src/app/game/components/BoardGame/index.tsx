import CardOption from "@/app/game/components/BoardGame/CardOption";
import CurrentPlayer from "@/app/game/components/CurrentPlayer";
import {
  initialGameState,
  PlayerTurn,
  useGameStore,
  valuesToCheck,
} from "@/store/game/game.store";
import { Circle, RefreshCcw, X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

const BoardGame = () => {
  const {
    gameMode,
    playerTurn,
    gameState,
    currentStatus,
    playerOne,
    playerTwo,
  } = useGameStore((state) => state.gameStateBoard);
  const {
    setInitialGameState,
    updateGameState,
    updatePlayerTurn,
    resetGameState,
    updateGameCurrentStatus,
  } = useGameStore(useShallow((state) => state));

  useEffect(() => {
    if (gameMode === "local") {
      setInitialGameState({
        gameMode,
        playerOne: {
          name: "Player One",
        },
        playerTwo: {
          name: "Player Two",
        },
        gameState: structuredClone(initialGameState),
        playerTurn: "ONE",
        currentStatus: "in-progress",
      });
    } else if (gameMode === "single") {
    } else {
    }
  }, []);

  const handleClickCardOption = ({ X, Y }: { X: number; Y: number }) => {
    gameState[Y][X] = playerTurn;
    updateGameState(gameState);
    checkIsGameOver(playerTurn);
  };

  const checkIsGameOver = (playerTurn: PlayerTurn) => {
    const someAlreadyWin = valuesToCheck.some((valueToCheck) =>
      valueToCheck.every(([X, Y]) => gameState[X][Y] === playerTurn),
    );

    if (!someAlreadyWin) {
      const boardFilled = gameState.flat().every((value) => value !== "");
      if (boardFilled) {
        return updateGameCurrentStatus("draw");
      }
    }

    if (someAlreadyWin) {
      return updateGameCurrentStatus("done");
    }

    updatePlayerTurn(playerTurn === "ONE" ? "TWO" : "ONE");
  };

  const renderFinalText = () => {
    if (currentStatus === "done") {
      return `Ganador ${playerTurn === "ONE" ? playerOne?.name : playerTwo?.name}`;
    }

    if (currentStatus === "draw") {
      return "Empate !";
    }
  };

  return (
    <>
      <div className="flex justify-between px-4">
        <CurrentPlayer
          active={playerTurn === "ONE" && currentStatus === "in-progress"}
          playerName={playerOne?.name!}
          fillOption={<X size={60} className="text-red-500" />}
        />
        <CurrentPlayer
          active={playerTurn === "TWO" && currentStatus === "in-progress"}
          playerName={playerTwo?.name!}
          fillOption={<Circle size={50} className="text-yellow-400" />}
        />
      </div>
      <div className="bg-primaryGame p-2 grid grid-cols-3 gap-3 rounded-xl">
        {gameState.map((rows, indexX) => (
          <div key={indexX} className="flex flex-col gap-3">
            {rows.map((value, indexY) => (
              <CardOption
                key={value + indexY}
                onClick={() => {
                  if (currentStatus === "in-progress") {
                    handleClickCardOption({ X: indexX, Y: indexY });
                  }
                }}
                selected={gameState[indexY][indexX]}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-2 w-full">
        {currentStatus !== "in-progress" && (
          <>
            <div
              className="bg-secondaryGame flex justify-center items-center py-2 rounded-md border
                border-white w-full"
            >
              <p className="text-white">{renderFinalText()}</p>
            </div>
            <div
              className="bg-secondaryGame flex justify-center items-center p-2 rounded-md border
                border-white"
              onClick={resetGameState}
            >
              <RefreshCcw className="text-white" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BoardGame;
