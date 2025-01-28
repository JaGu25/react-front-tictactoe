import Button from "@/app/game/components/Button";
import { GameMode, useGameStore } from "@/store/game/game.store";
import clsx from "clsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import robotAnimated from "@/assets/animation/robot-saying-hello.lottie";
import { Volume2, VolumeOff } from "lucide-react";
import { useNavigate } from "react-router";

const tictactoeTitle = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];

const HomePage = () => {
  const navigate = useNavigate();
  const isSoundActivate = useGameStore((state) => state.isSoundActivate);
  const toggleMusic = useGameStore((state) => state.toggleMusic);
  const selectGameMode = useGameStore((state) => state.selectGameMode);

  const onClickGameMode = (gameMode: GameMode, to: string) => {
    selectGameMode(gameMode);
    navigate(to);
  };

  return (
    <div className="flex flex-col justify-between h-full pt-4">
      <div
        className="p-3 bg-primaryGame rounded-md grid grid-cols-3 gap-2 animate-jump-in
          animate-once animate-duration-500"
      >
        {tictactoeTitle.map((letter, idx) => {
          const color = idx % 2 == 0 ? "text-red-600" : "text-yellow-400";
          return (
            <div
              key={letter + idx}
              className={clsx(
                `text-red-600 font-black text-8xl px-4 font-arcade flex items-center
                justify-center rounded-md bg-secondaryGame`,
                color,
              )}
            >
              {letter}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col mt-4 gap-6 animate-jump-in animate-once animate-duration-500">
        <Button
          variant="1"
          onClick={() => onClickGameMode("single", "/difficulty")}
        >
          Single Player
        </Button>
        <Button
          variant="2"
          onClick={() => onClickGameMode("multiplayer", "/difficulty")}
        >
          Multiplayer
        </Button>
        <Button
          variant="3"
          onClick={() => onClickGameMode("local", "/board-game")}
        >
          Local Multiplayer
        </Button>
      </div>
      <div className="flex justify-center gap-2">
        {isSoundActivate ? (
          <Volume2
            size={40}
            className="bg-secondaryGame text-white rounded-full p-2 cursor-pointer"
            onClick={toggleMusic}
          />
        ) : (
          <VolumeOff
            size={40}
            className="bg-secondaryGame text-white rounded-full p-2 cursor-pointer"
            onClick={toggleMusic}
          />
        )}
      </div>
      <div className="absolute -bottom-[10px] left-[0px] w-[150px] h-[150px]">
        <DotLottieReact src={robotAnimated} loop autoplay />
      </div>
    </div>
  );
};

export default HomePage;
