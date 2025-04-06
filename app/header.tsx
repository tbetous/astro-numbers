import { CircleQuestionSolid } from "./icons";

export const Header = () => (
  <header className="grid  grid-cols-3 grid-cols-[1fr_auto_1fr] items-center w-full text-primary py-4 border-b-1 border-primary">
    <button>
      <CircleQuestionSolid className="h-4 w-4" />
    </button>
    <h1 className="text-xl font-bold text-center">Astro chiffres</h1>
    <div></div>
  </header>
);
