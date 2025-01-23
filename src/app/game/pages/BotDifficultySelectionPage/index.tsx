import DifficultyOptions from "@/app/game/components/DifficultyOptions";
import botProfileSvg from "@/assets/images/bot-profile.svg";
import botProfile2Svg from "@/assets/images/bot-profile2.svg";
import botProfile3Svg from "@/assets/images/bot-profile3.svg";
import { BotDifficulty, useGameStore } from "@/store/game/game.store";
import { useNavigate } from "react-router";

const BotDifficultySelectionPage = () => {
  const navigate = useNavigate();
  const selectBotDifficulty = useGameStore(
    (state) => state.selectBotDifficulty,
  );

  const onClick = (botDifficulty: BotDifficulty) => {
    selectBotDifficulty(botDifficulty);
    navigate("/board-game");
  };

  return (
    <div className="flex h-full justify-center items-center relative">
      <div className="flex items-center flex-col space-y-[70px] mt-10">
        <DifficultyOptions
          onClick={() => onClick("easy")}
          profileImg={botProfileSvg}
          text="Easy Bot"
          circleColor="purple-400"
          bgColor="bg-blue-800"
        />
        <DifficultyOptions
          onClick={() => onClick("medium")}
          profileImg={botProfile2Svg}
          text="Medium Bot"
          circleColor="red-400"
          bgColor="bg-orange-400"
        />
        <DifficultyOptions
          onClick={() => onClick("hard")}
          profileImg={botProfile3Svg}
          text="Difficult Bot"
          circleColor="red-400"
          bgColor="bg-sky-500"
        />
      </div>
    </div>
  );
};

export default BotDifficultySelectionPage;
