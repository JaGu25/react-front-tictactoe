import clsx from "clsx";

interface Props {
  profileImg: string;
  text: string;
  bgCircleColor: string;
  borderTextColor: string;
  onClick?: () => void;
}

const DifficultyOptions: React.FC<Props> = ({
  profileImg,
  text,
  bgCircleColor,
  borderTextColor,
  onClick,
}) => {
  return (
    <div className="animate-shake">
      <div
        onClick={onClick}
        className="relative flex items-center duration-300 hover:scale-110"
      >
        <img
          src={profileImg}
          className={clsx(
            "w-[140px] h-[140px] rounded-full -bottom-[30px] -mr-[50px] z-10",
            bgCircleColor,
          )}
        />
        <div
          className={clsx(
            "text-left",
            "text-white font-bold text-2xl tracking-wide",
            "w-[260px]",
            "py-6 rounded-full border-[3px] bg-blue-800",
            borderTextColor,
          )}
        >
          <span className="ml-[60px]">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default DifficultyOptions;
