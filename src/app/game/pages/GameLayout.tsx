import { Outlet, useLocation } from "react-router";
import bgGame from "@/assets/images/bg-game.png";
import Navegation from "@/app/game/components/Navegation";

const GameLayout = () => {
  const location = useLocation();
  const showNavegation = "/" !== location.pathname;

  return (
    <div
      style={{ backgroundImage: `url('${bgGame}')` }}
      className="bg-red-900 h-screen w-full flex justify-center items-center"
    >
      <div className="game-container w-full md:w-[480px] h-full p-8 relative">
        <div className="z-10 h-full w-full tracking-wide">
          {showNavegation && <Navegation />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
