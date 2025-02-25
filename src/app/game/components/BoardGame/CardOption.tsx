import { Circle, X } from "lucide-react";

interface Props {
  onClick: () => void;
  selected: string;
}

const CardOption: React.FC<Props> = ({ onClick, selected }) => {
  return (
    <div
      onClick={onClick}
      className="h-24 bg-secondaryGame rounded-xl flex items-center justify-center"
    >
      {selected == "ONE" && <X size={80} className="text-red-500" />}
      {selected == "TWO" && <Circle size={65} className="text-yellow-400" />}
    </div>
  );
};

export default CardOption;
