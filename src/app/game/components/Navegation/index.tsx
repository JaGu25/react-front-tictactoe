import { useGameConfigStore } from "@/store/game/game-config.store";
import { ArrowLeft, Volume2, VolumeOff } from "lucide-react";
import { useNavigate } from "react-router";

const Navegation = () => {
  const navigate = useNavigate();
  const isSoundActivate = useGameConfigStore((state) => state.isSoundActivate);
  const toggleMusic = useGameConfigStore((state) => state.toggleMusic);

  return (
    <div className="flex justify-between items-center w-full">
      <ArrowLeft
        onClick={() => navigate(-1)}
        size={50}
        className="bg-secondaryGame text-white rounded-full p-2 cursor-pointer"
      />
      <div className="flex justify-center gap-2">
        {isSoundActivate ? (
          <Volume2
            size={50}
            className="bg-secondaryGame text-white rounded-full p-2 cursor-pointer"
            onClick={toggleMusic}
          />
        ) : (
          <VolumeOff
            size={50}
            className="bg-secondaryGame text-white rounded-full p-2 cursor-pointer"
            onClick={toggleMusic}
          />
        )}
      </div>
    </div>
  );
};

export default Navegation;
