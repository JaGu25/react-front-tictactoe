import clsx from "clsx";
import buttonSoundSrc from "@/assets/sounds/button-sound.mp3";
import { usePlaySound } from "@/app/game/hooks/usePlaySound";
import { useGameStore } from "@/store/game/game.store";

interface Props {
  profileImg: string;
  text: string;
  circleColor: string;
  bgColor: string;
  onClick?: () => void;
}

const DifficultyOptions: React.FC<Props> = ({
  profileImg,
  text,
  circleColor,
  bgColor,
  onClick,
}) => {
  const { playAudio } = usePlaySound({ src: buttonSoundSrc });
  const isSoundActivate = useGameStore((state) => state.isSoundActivate);

  return (
    <div className="animate-shake">
      <div
        onClick={() => {
          if (onClick) {
            isSoundActivate && playAudio();
            onClick();
          }
        }}
        className="relative flex items-center duration-300 hover:scale-110"
      >
        <img
          src={profileImg}
          className={clsx(
            "w-[140px] h-[140px] rounded-full -bottom-[30px] -mr-[50px] z-10",
            `bg-${circleColor}`,
          )}
        />
        <div
          className={clsx(
            "text-left",
            "text-white font-bold text-2xl tracking-wide",
            "w-[260px]",
            "py-6 rounded-full border-[3px]",
            `border-${circleColor}`,
            bgColor,
          )}
        >
          <span className="ml-[60px]">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default DifficultyOptions;
