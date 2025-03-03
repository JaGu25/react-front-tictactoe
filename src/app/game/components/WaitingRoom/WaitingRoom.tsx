import Button from "@/app/game/components/Button";
import { SocketErrors } from "@/app/game/domain/errors";
import { toast } from "@/shared/hooks/use-toast";
import { useSocketContext } from "@/shared/providers/SocketProvider";
import { copyToClipBoard } from "@/shared/utils/clipBoard";
import { Copy, Loader } from "lucide-react";
import { useLocation } from "react-router";

const WaitingRoom = () => {
  const { error } = useSocketContext();
  const location = useLocation();
  const roomId = new URLSearchParams(location.search).get("id") || "";

  const handleCopiedUrl = async () => {
    await copyToClipBoard(`${window.location.origin}/board-game?id=${roomId}`);

    toast({
      title: "Enlace copiado",
      variant: "success",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      {error === SocketErrors.ROOM_FULL_ERROR ? (
        <p className="text-white animate-pulse">
          La sala esta llena, por favor crea otra.
        </p>
      ) : (
        <>
          <Button variant="1" onClick={handleCopiedUrl}>
            <div className="flex items-center gap-4">
              <p className="text-base">Comparte el Link y Juega</p>
              <Copy />
            </div>
          </Button>
          <Loader className="text-white animate-spin mt-4" />
          <p className="mt-2 text-white">Esperando al otro jugador...</p>
        </>
      )}
    </div>
  );
};

export default WaitingRoom;
