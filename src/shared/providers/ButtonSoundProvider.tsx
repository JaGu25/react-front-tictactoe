import { usePlaySound } from "@/app/game/hooks/usePlaySound";
import buttonSoundSrc from "@/assets/sounds/button-sound.mp3";
import { useGameStore } from "@/store/game/game.store";
import React, { createContext, useEffect, ReactNode } from "react";

const ButtonSoundContext = createContext(undefined);

export const ButtonSoundProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { playAudio } = usePlaySound({ src: buttonSoundSrc });
  const isSoundActivate = useGameStore((state) => state.isSoundActivate);

  useEffect(() => {
    const handleClick = () => {
      isSoundActivate && playAudio();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isSoundActivate]);

  return (
    <ButtonSoundContext.Provider value={undefined}>
      {children}
    </ButtonSoundContext.Provider>
  );
};
