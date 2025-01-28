import { usePlaySound } from "@/app/game/hooks/usePlaySound";
import buttonSoundSrc from "@/assets/sounds/button-sound.mp3";
import { Circle, X } from "lucide-react";

interface Props {
  onClick: () => void;
  selected: string;
}

const CardOption: React.FC<Props> = ({ onClick, selected }) => {
  const { playAudio } = usePlaySound({ src: buttonSoundSrc });

  return (
    <div
      onClick={() => {
        if (selected.length === 0) {
          onClick();
          playAudio();
        }
      }}
      className="h-24 bg-secondaryGame rounded-xl flex items-center justify-center"
    >
      {selected == "ONE" && <X size={80} className="text-red-500" />}
      {selected == "TWO" && <Circle size={65} className="text-yellow-400" />}
    </div>
  );
};

export default CardOption;
