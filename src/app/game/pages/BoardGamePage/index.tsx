import BoardGame from "@/app/game/components/BoardGame";
import CurrentPlayer from "@/app/game/components/CurrentPlayer";
import { X, Circle } from "lucide-react";

const BoardGamePage = () => {
  return (
    <div className="flex flex-col gap-14 mt-8">
      <div className="flex justify-between px-4">
        <CurrentPlayer
          active
          playerName="PlayerMe"
          fillOption={<X size={60} className="text-red-500" />}
        />
        <CurrentPlayer
          active={false}
          playerName="PlayerTwo"
          fillOption={<Circle size={50} className="text-yellow-400" />}
        />
      </div>
      <BoardGame />
    </div>
  );
};

export default BoardGamePage;
