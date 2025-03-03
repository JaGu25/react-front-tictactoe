import DifficultyOptions from "@/app/game/components/DifficultyOptions";
import botProfileSvg from "@/assets/images/bot-profile.svg";
import botProfileSvg2 from "@/assets/images/bot-profile2.svg";
import botProfileSvg3 from "@/assets/images/bot-profile3.svg";
import {
  BotDifficulty,
  useGameConfigStore,
} from "@/store/game/game-config.store";
import { useGameStore } from "@/store/game/game.store";
import { useNavigate } from "react-router";

const difficultyOptions = [
  {
    difficulty: "easy",
    profileImg: botProfileSvg,
    text: "Easy Bot",
    bgCircleColor: "bg-purple-400",
    borderTextColor: "border-purple-400",
  },
  {
    difficulty: "medium",
    profileImg: botProfileSvg2,
    text: "Medium Bot",
    bgCircleColor: "bg-blue-400",
    borderTextColor: "border-blue-400",
  },
  {
    difficulty: "hard",
    profileImg: botProfileSvg3,
    text: "Hard Bot",
    bgCircleColor: "bg-red-400",
    borderTextColor: "border-red-400",
  },
];

const BotDifficultySelectionPage = () => {
  const navigate = useNavigate();
  const selectBotDifficulty = useGameConfigStore(
    (state) => state.selectBotDifficulty,
  );
  const resetGameState = useGameStore((state) => state.resetGameState);

  const onClick = (botDifficulty: BotDifficulty) => {
    selectBotDifficulty(botDifficulty);
    resetGameState();
    navigate("/board-game");
  };

  return (
    <div className="flex h-full justify-center items-center relative">
      <div className="flex items-center flex-col space-y-[70px] mt-10">
        {difficultyOptions.map((option) => (
          <DifficultyOptions
            key={option.difficulty}
            onClick={() => onClick(option.difficulty as BotDifficulty)}
            {...option}
          />
        ))}
      </div>
    </div>
  );
};

export default BotDifficultySelectionPage;
