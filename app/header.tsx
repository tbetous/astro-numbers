import { CircleQuestionSolid } from "./icons";
import { ChartSimpleSolid } from "./icons";
import { Button } from "./button";

type HeaderProps = {
  onShowHelp?: () => void;
  onShowStats?: () => void;
};

export const Header = ({ onShowHelp, onShowStats }: HeaderProps) => (
  <header className="grid grid-cols-3 grid-cols-[1fr_auto_1fr] items-center w-full text-primary py-4 border-b-1 border-primary">
    <Button onClick={onShowHelp} className="h-6 w-6" title="Help">
      <CircleQuestionSolid className="h-4 w-4" />
    </Button>
    <h1 className="text-xl font-bold text-center">Astro numbers</h1>
    <Button onClick={onShowStats} className="h-6 w-6 justify-self-end" title="Statistics">
      <ChartSimpleSolid className="h-4 w-4" />
    </Button>
  </header>
);
