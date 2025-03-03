import clsx from "clsx";
import { Circle, X } from "lucide-react";

interface Props {
  onClick: () => void;
  selected: string;
  disabled: boolean;
  players: string[];
}

const CardOption: React.FC<Props> = ({
  onClick,
  selected,
  disabled,
  players,
}) => {
  const [playerOne, playerTwo] = players;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "h-24 bg-secondaryGame rounded-xl flex items-center justify-center",
        disabled && "pointer-events-none",
      )}
    >
      {selected == playerOne && <X size={80} className="text-red-500" />}
      {selected == playerTwo && (
        <Circle size={65} className="text-yellow-400" />
      )}
    </div>
  );
};

export default CardOption;
