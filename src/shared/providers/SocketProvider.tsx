import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  players: string[];
  error: string | null;
  sendMessage: (event: string, data: any) => void;
  listenEvent: (event: string, callback: (data: any) => void) => void;
}

interface SocketProviderProps {
  children: React.ReactNode;
  url: string;
  roomId: string;
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
  roomId,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [players, setPlayers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socketInstance = io(url);

    setSocket(socketInstance);

    socketInstance.emit("joinRoom", roomId);

    socketInstance.on("connect", () => {
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setConnected(false);
    });

    socketInstance.on("roomFull", (message: string) => {
      setError(message);
    });

    socketInstance.on(
      "playerJoined",
      (data: { playerId: string; players: string[] }) => {
        setPlayers(data.players);
      },
    );

    socketInstance.on("playerLeft", (playerId: string) => {
      setPlayers((prevPlayers) => prevPlayers.filter((id) => id !== playerId));
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [url, roomId]);

  const sendMessage = useCallback(
    (event: string, data: any) => {
      if (socket && connected) {
        socket.emit(event, data);
      }
    },
    [socket, connected],
  );

  const listenEvent = useCallback(
    (event: string, callback: (data: any) => void) => {
      if (socket) {
        socket.on(event, callback);
      }

      return () => {
        if (socket) {
          socket.off(event, callback);
        }
      };
    },
    [socket],
  );

  return (
    <SocketContext.Provider
      value={{ socket, connected, players, error, sendMessage, listenEvent }}
    >
      {children}
    </SocketContext.Provider>
  );
};
