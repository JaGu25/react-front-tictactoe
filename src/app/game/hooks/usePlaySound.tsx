import { useState, useEffect } from "react";

interface Props {
  src: string;
  loop?: boolean;
}

export const usePlaySound = ({ src, loop = false }: Props) => {
  const [audio, setAudio] = useState(new Audio(src));

  useEffect(() => {
    audio.loop = loop;
    setAudio(audio);
  }, []);

  const playAudio = () => {
    audio.play();
  };

  const pauseAudio = () => {
    audio.pause();
  };

  return { playAudio, pauseAudio };
};
