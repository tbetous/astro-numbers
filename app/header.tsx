import { CircleQuestionSolid } from "./icons";
import { Button } from "./button";

type HeaderProps = {
  onHelp?: () => void;
};

export const Header = ({ onHelp }: HeaderProps) => (
  <header className="grid grid-cols-3 grid-cols-[1fr_auto_1fr] items-center w-full text-primary py-4 border-b-1 border-primary">
    <Button onClick={onHelp} className="h-6 w-6">
      <CircleQuestionSolid className="h-4 w-4" />
    </Button>
    <h1 className="text-xl font-bold text-center">Astro chiffres</h1>
    <div></div>
  </header>
);
