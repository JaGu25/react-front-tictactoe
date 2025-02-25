import Button from "@/app/game/components/Button";
import { toast } from "@/shared/hooks/use-toast";
import { Copy, Loader, ShareIcon } from "lucide-react";

const WaitingRoom = () => {
  const handleCopiedUrl = () => {
    toast({
      title: "Enlace copiado",
      variant: "success",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Button variant="1" onClick={handleCopiedUrl}>
        <div className="flex items-center gap-4">
          <p className="text-base">Comparte el Link y Juega</p>
          <Copy />
        </div>
      </Button>
      <Loader className="text-white animate-spin mt-4" />
      <p className="mt-2 text-white">Esperando al otro jugador...</p>
    </div>
  );
};

export default WaitingRoom;
