import DifficultyOptions from "@/app/game/components/DifficultyOptions";
import botProfileSvg from "@/assets/images/bot-profile.svg";
import { BotDifficulty, useGameStore } from "@/store/game/game.store";
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
    profileImg: botProfileSvg,
    text: "Medium Bot",
    bgCircleColor: "bg-blue-400",
    borderTextColor: "border-blue-400",
  },
  {
    difficulty: "hard",
    profileImg: botProfileSvg,
    text: "Hard Bot",
    bgCircleColor: "bg-red-400",
    borderTextColor: "border-red-400",
  },
];
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
        {difficultyOptions.map((option) => (
          <DifficultyOptions
            onClick={() => onClick(option.difficulty as BotDifficulty)}
            {...option}
          />
        ))}
      </div>
    </div>
  );
};

export default BotDifficultySelectionPage;
