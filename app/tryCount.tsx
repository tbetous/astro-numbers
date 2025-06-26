import { Star } from "./icons";

type TryCountProps = {
  tryLeft: number;
  tryTotal: number;
};

const TryLed = ({ isLeft }: { isLeft: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-primary">
      <div
        className={
          "h-1 w-1 rounded-full border-1 transition-all duration-150 " +
          (isLeft
            ? "bg-left border-left shadow-aura-brighter shadow-left/50"
            : "") +
          (!isLeft
            ? "bg-unleft border-unleft shadow-aura-brighter shadow-unleft/50"
            : "")
        }
      ></div>
    </div>
  );
};

export const TryCount = ({ tryLeft, tryTotal }: TryCountProps) => {
  return (
    <div className="flex border-1 border-primary items-center justify-center">
      <div className="text-primary text-sm border-r-1 border-primary p-1 px-2">
        Attempts left
      </div>
      <div className="text-primary text-sm border-primary p-1 px-2">
        {tryLeft}/{tryTotal}
      </div>
    </div>
  );
};
