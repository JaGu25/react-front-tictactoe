import BoardGame from "@/app/game/components/BoardGame";
import WaitingRoom from "@/app/game/components/WaitingRoom/WaitingRoom";
import { useSocketContext } from "@/shared/providers/SocketProvider";
import { useGameConfigStore } from "@/store/game/game-config.store";
import { useGameStore } from "@/store/game/game.store";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useShallow } from "zustand/react/shallow";

const MAX_PLAYERS = 2;

const BoardGamePage = () => {
  const { setInitialGameState, players } = useGameStore(
    useShallow((state) => state),
  );
  const { gameMode, botDifficulty, userId, selectGameMode, updateRoomId } =
    useGameConfigStore((state) => state);
  const { joinRoom, connected } = useSocketContext();
  const location = useLocation();
  const roomId = new URLSearchParams(location.search).get("id") || "";
  const isReadyToPlay = players.length === MAX_PLAYERS;

  useEffect(() => {
    if (gameMode === "multiplayer" || roomId) {
      selectGameMode("multiplayer");
      updateRoomId(roomId);
      setInitialGameState([""]);
      connected && joinRoom({ roomId, userId });
    } else if (gameMode === "local") {
      setInitialGameState(["Player One", "Player Two"]);
    } else {
      setInitialGameState(["Player One", `Bot ${botDifficulty}`]);
    }
  }, [connected]);

  return (
    <div className="flex flex-col gap-14 mt-8">
      {gameMode === "multiplayer" && !isReadyToPlay && <WaitingRoom />}
      {isReadyToPlay && <BoardGame />}
    </div>
  );
};

export default BoardGamePage;
