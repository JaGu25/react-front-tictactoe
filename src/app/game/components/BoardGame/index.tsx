import CardOption from "@/app/game/components/BoardGame/CardOption";
import React from "react";

const array = new Array(9).fill(9);

const BoardGame = () => {
  return (
    <div className="bg-primaryGame p-2 grid grid-cols-3 gap-3 rounded-xl">
      {array.map(() => (
        <CardOption />
      ))}
    </div>
  );
};

export default BoardGame;
