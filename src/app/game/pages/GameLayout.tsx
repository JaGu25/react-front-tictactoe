import { Outlet, useLocation } from "react-router";
import bgGame from "@/assets/images/bg-game.png";
import Navegation from "@/app/game/components/Navegation";
import { usePlaySound } from "@/app/game/hooks/usePlaySound";
import bgSound from "@/assets/sounds/bg-music.mp3";
import { useEffect } from "react";
import { SocketProvider } from "@/shared/providers/SocketProvider";
import { ButtonSoundProvider } from "@/shared/providers/ButtonSoundProvider";
import { useGameConfigStore } from "@/store/game/game-config.store";

const GameLayout = () => {
  const isSoundActivate = useGameConfigStore((state) => state.isSoundActivate);
  const { playAudio, pauseAudio } = usePlaySound({ src: bgSound, loop: true });
  const location = useLocation();
  const showNavegation = "/" !== location.pathname;

  useEffect(() => {
    isSoundActivate ? playAudio() : pauseAudio();
  }, [isSoundActivate]);

  return (
    <div
      style={{ backgroundImage: `url('${bgGame}')` }}
      className="bg-red-900 h-screen w-full flex justify-center items-center"
    >
      <div className="game-container w-full md:w-[460px] h-full p-8 relative">
        <div className="z-10 h-full w-full tracking-wide">
          {showNavegation && <Navegation />}
          <ButtonSoundProvider>
            <SocketProvider url={import.meta.env.VITE_APP_SOCKET_URL!}>
              <Outlet />
            </SocketProvider>
          </ButtonSoundProvider>
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
