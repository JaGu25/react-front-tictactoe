import CardOption from "@/app/game/components/BoardGame/CardOption";
import CurrentPlayer from "@/app/game/components/CurrentPlayer";
import { Circle, Loader2, RefreshCcw, X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { GameModeStrategy } from "@/app/game/domain/game";
import { LocalGameStrategy } from "@/app/game/components/BoardGame/local-game-strategy";
import { SingleGameStrategy } from "@/app/game/components/BoardGame/single-strategy";
import robotAnimated from "@/assets/animation/robot-saying-hello.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useGameConfigStore } from "@/store/game/game-config.store";
import { useGameStore } from "@/store/game/game.store";
import { MultiplayerStrategy } from "@/app/game/components/BoardGame/multiplayer-strategy";
import { useSocketContext } from "@/shared/providers/SocketProvider";

const BoardGame = () => {
  const { gameMode, botDifficulty } = useGameConfigStore(
    useShallow((state) => state),
  );
  const { gameState, playerTurn, currentStatus, players } = useGameStore(
    useShallow((state) => state),
  );
  const { playerPlay, resetGame } = useSocketContext();
  const [playerOne, playerTwo] = players;
  const [gameStrategy, setGameStrategy] = useState<GameModeStrategy>();
  const isSingleModeAndIsBotTurn =
    gameMode === "single" &&
    playerTurn === playerTwo &&
    currentStatus === "in-progress";

  useEffect(() => {
    switch (gameMode) {
      case "local":
        setGameStrategy(new LocalGameStrategy());
        break;
      case "single":
        setGameStrategy(new SingleGameStrategy(botDifficulty));
        break;
      case "multiplayer":
        setGameStrategy(new MultiplayerStrategy({ playerPlay, resetGame }));
        break;
    }
  }, [gameMode]);

  const onClick = ({ X, Y }: { X: number; Y: number }) => {
    const isNotSelected = Boolean(!gameState[Y][X]);
    if (currentStatus === "in-progress" && isNotSelected) {
      gameStrategy?.handleMove(X, Y);
    }
  };

  const onResetGameState = () => {
    gameStrategy?.resetGameState();
  };

  const renderFinalText = () => {
    if (currentStatus === "done") {
      return `Ganador ${playerTurn.slice(0, 10)}`;
    }
    if (currentStatus === "draw") {
      return "Empate !";
    }
  };

  return (
    <>
      <div className="flex justify-between px-4">
        <CurrentPlayer
          active={playerTurn === playerOne && currentStatus === "in-progress"}
          playerName={playerOne.slice(0, 10)}
          fillOption={<X size={60} className="text-red-500" />}
        />
        <CurrentPlayer
          active={playerTurn === playerTwo && currentStatus === "in-progress"}
          playerName={playerTwo.slice(0, 10)}
          fillOption={<Circle size={50} className="text-yellow-400" />}
        />
      </div>
      <div className="bg-primaryGame p-2 grid grid-cols-3 gap-3 rounded-xl">
        {gameState.map((rows, indexX) => (
          <div key={indexX} className="flex flex-col gap-3">
            {rows.map((value, indexY) => (
              <CardOption
                key={value + indexY}
                onClick={() => onClick({ X: indexX, Y: indexY })}
                players={players}
                selected={gameState[indexY][indexX]}
                disabled={isSingleModeAndIsBotTurn}
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
              onClick={onResetGameState}
            >
              <RefreshCcw className="text-white" />
            </div>
          </>
        )}
      </div>
      {isSingleModeAndIsBotTurn && (
        <div
          className="bg-secondaryGame flex flex-col justify-between items-center rounded-md border
            border-white w-full -my-20 p-4 pb-0"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-white">Pensando</p>
            <Loader2 strokeWidth={3} className="animate-spin text-white" />
          </div>
          <DotLottieReact src={robotAnimated} loop autoplay className="w-40" />
        </div>
      )}
    </>
  );
};

export default BoardGame;
