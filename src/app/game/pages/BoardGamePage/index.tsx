import BoardGame from "@/app/game/components/BoardGame";
import CurrentPlayer from "@/app/game/components/CurrentPlayer";
import { X, Circle } from "lucide-react";

const BoardGamePage = () => {
  return (
    <div className="flex flex-col gap-14 mt-8">
      <BoardGame />
    </div>
  );
};

export default BoardGamePage;
