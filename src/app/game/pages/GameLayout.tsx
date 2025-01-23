import { Outlet, useLocation } from "react-router";
import bgGame from "@/assets/images/bg-game.png";
import Navegation from "@/app/game/components/Navegation";
import { usePlaySound } from "@/app/game/hooks/usePlaySound";
import bgSound from "@/assets/sounds/bg-music.mp3";
import { useEffect } from "react";
import { useGameStore } from "@/store/game/game.store";

const GameLayout = () => {
  const isSoundActivate = useGameStore((state) => state.isSoundActivate);
  const { playAudio, pauseAudio } = usePlaySound({ src: bgSound, loop: true });
  const location = useLocation();
  const showNavegation = "/" !== location.pathname;

  useEffect(() => {
    if (isSoundActivate) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [isSoundActivate]);

  return (
    <div
      style={{ backgroundImage: `url('${bgGame}')` }}
      className="bg-red-900 h-screen w-full flex justify-center items-center"
    >
      <div className="game-container w-full md:w-[460px] h-full p-8 relative">
        <div className="z-10 h-full w-full tracking-wide">
          {showNavegation && <Navegation />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
