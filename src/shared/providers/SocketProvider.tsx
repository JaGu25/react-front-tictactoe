import { checkIsGameOver } from "@/app/game/components/BoardGame/general";
import { SocketErrors } from "@/app/game/domain/errors";
import { GameCurrentStatus, useGameStore } from "@/store/game/game.store";
import React, { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export interface GameStateRequest {
  players: string[];
  gameState: string[][];
  playerTurn: string;
  currentStatus: GameCurrentStatus;
}
interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
  joinRoom: (data: { roomId: string; userId: string }) => void;
  playerPlay: (data: { roomId: string; gameState: GameStateRequest }) => void;
  resetGame: (roomId: string) => void;
}

interface SocketProviderProps {
  children: React.ReactNode;
  url: string;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  url,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setInitialGameState, updateGameState, updateFullGame } =
    useGameStore();

  useEffect(() => {
    const socketInstance = io(url);

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setConnected(false);
    });

    socketInstance.on("exception", (error) => handleError(error));

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  useEffect(() => {
    if (socket && connected) {
      socket.on("gameStart", handleGameStart);
      socket.on("roomUpdate", handleRoomUpdate);
      socket.on("gameUpdated", handleGameUpdated);
      socket.on("updateFullGame", handleUpdateFullGame);

      return () => {
        socket.off("gameStart", handleGameStart);
        socket.off("roomUpdate", handleRoomUpdate);
        socket.off("gameUpdated", handleGameUpdated);
        socket.on("updateFullGame", handleUpdateFullGame);
      };
    }
  }, [socket, connected]);

  const joinRoom = (data: { roomId: string; userId: string }) => {
    if (socket && connected) {
      socket.emit("joinRoom", data);
    }
  };

  const playerPlay = (data: {
    roomId: string;
    gameState: GameStateRequest;
  }) => {
    if (socket && connected) {
      socket.emit("playerPlay", data);
    }
  };

  const resetGame = (roomId: string) => {
    if (socket && connected) {
      socket.emit("resetGameState", { roomId });
    }
  };

  const handleGameStart = (data: any) => {
    setInitialGameState(data.gameState.players, data.gameState.gameState);
  };

  const handleRoomUpdate = (data: any) => {
    setInitialGameState(data.gameState.players);
  };

  const handleUpdateFullGame = (data: GameStateRequest) => {
    updateFullGame(data);
  };

  const handleError = ({ code }: { code: SocketErrors }) => {
    setError(code);
  };

  const handleGameUpdated = (data: GameStateRequest) => {
    const { gameState, playerTurn } = data;
    updateGameState(gameState);
    checkIsGameOver(playerTurn, gameState);
  };

  return (
    <SocketContext.Provider
      value={{ socket, connected, error, playerPlay, joinRoom, resetGame }}
    >
      {children}
    </SocketContext.Provider>
  );
};
