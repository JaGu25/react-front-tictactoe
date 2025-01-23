import CardOption from "@/app/game/components/BoardGame/CardOption";

const array = new Array(9).fill(9);

const BoardGame = () => {
  return (
    <div className="bg-primaryGame p-2 grid grid-cols-3 gap-3 rounded-xl">
      {array.map((value, idx) => (
        <CardOption key={value + idx} />
      ))}
    </div>
  );
};

export default BoardGame;
