import singleProfileSvg from "@/assets/images/single-profile.svg";
import clsx from "clsx";
import React from "react";

interface Props {
  active: boolean;
  playerName: string;
  fillOption: React.ReactNode;
}

const CurrentPlayer: React.FC<Props> = ({ active, playerName, fillOption }) => {
  return (
    <div
      className={clsx(
        `bg-secondaryGame border-white border rounded-md px-4 py-4 flex flex-col
        items-center justify-center gap-3`,
        "w-[140px]",
        { "animate-pulse animate-duration-[1200ms]": active },
      )}
    >
      <img
        src={singleProfileSvg}
        width={60}
        height={60}
        className="bg-green-400 rounded-full"
      />
      <p className="text-white font-bold text-lg">{playerName}</p>
      {fillOption}
    </div>
  );
};

export default CurrentPlayer;
