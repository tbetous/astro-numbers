import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { generateDailyAnswer } from "./utils/generate-daily-answer";
import { Header } from "./header";
import { Keypad } from "./keypad";
import { Output } from "./output";
import { OnboardingModal } from "./onboarding-modal";
import { GameOverModal } from "./game-over-modal";
import { StatsModal } from "./stats-modal";
import { TryCount } from "./tryCount";

type InputStatus = "valid" | "missplaced" | "useless" | "unknown";

type Configuration = {
  onboarding: boolean;
};

type CurrentGame = {
  history: InputStatus[][];
};

const NUMBER_LENGTH = 5; // Adjusted to match the length of the answer
const TRY_LIMIT = 10;

export default function App() {
  const answer = generateDailyAnswer(NUMBER_LENGTH);
  const [configuration, setConfiguration] = useLocalStorage<Configuration>(
    "configuration",
    {
      onboarding: true,
    }
  );

  const [currentGame, setCurrentGame] = useLocalStorage<CurrentGame>(
    "currentGame",
    {
      history: [],
    }
  );
  // const [currentGame, setCurrentGame] = useState<CurrentGame>({ history: [] });
  const [displayOnboarding, setDisplayOnboarding] = useState(
    configuration && configuration.onboarding
  );
  const [displayStats, setDisplayStats] = useState(false);
  const [tryLeft, setTryLeft] = useState(
    TRY_LIMIT - currentGame.history.length
  );
  const [input, setInput] = useState<number[]>([]);
  const [inputStatus, setInputStatus] = useState<InputStatus[]>(
    (currentGame.history.length &&
      currentGame.history[currentGame.history.length - 1]) ||
      Array(NUMBER_LENGTH).fill("unknown")
  );
  const [historyStatus, setHistoryStatus] = useState<InputStatus[][]>(
    currentGame.history
  );

  const hasWon = inputStatus.every((status) => status === "valid");
  const hasNoTryLeft = tryLeft <= 0;
  const isGameOver = hasNoTryLeft || hasWon;

  const handleShowHelp = () => {
    setDisplayOnboarding(true);
  };

  const handleShowStats = () => {
    setDisplayStats(true);
  };

  const handleCloseOnboarding = () => {
    setConfiguration((configuration) => ({
      ...configuration,
      onboarding: false,
    }));
    setDisplayOnboarding(false);
  };

  const handleNumberInput = (number: number) => {
    if (input.length >= NUMBER_LENGTH) return;

    setInput((input) => [...input, number]);
  };

  const handleEraseInput = () => {
    if (input.length === 0) return;

    setInput((input) => input.slice(0, input.length - 1));
  };

  const handleSubmit = () => {
    if (input.length !== NUMBER_LENGTH) return;
    if (tryLeft <= 0) return;

    setTryLeft((count) => count - 1);

    const answerNumberCountMap = answer.reduce(
      (acc: { [key: number]: number }, value: number) => {
        if (!acc[value]) acc[value] = 0;
        acc[value] += 1;
        return acc;
      },
      {}
    );

    const newOutputStatus: InputStatus[] = input.map((number, index) => {
      if (!answerNumberCountMap[number]) return "useless";

      answerNumberCountMap[number] -= 1;

      if (answer[index] === number) return "valid";
      return "missplaced";
    });

    setInput([]);
    setInputStatus(newOutputStatus);
    setHistoryStatus((history) => [...history, newOutputStatus]);
    setCurrentGame({
      history: [...historyStatus, newOutputStatus],
    });
  };

  return (
    <main className="flex flex-col items-center justify-center px-4 gap-6">
      <Header onShowHelp={handleShowHelp} onShowStats={handleShowStats} />
      <TryCount tryLeft={tryLeft} tryTotal={TRY_LIMIT} />
      <Output input={input} lastInputStatus={inputStatus} />
      <Keypad
        onNumberInput={handleNumberInput}
        onErase={handleEraseInput}
        onSubmit={handleSubmit}
        submitDisabled={input.length === 0}
        eraseDisabled={input.length < NUMBER_LENGTH}
        disabled={isGameOver}
      />
      <OnboardingModal
        show={displayOnboarding}
        onClose={handleCloseOnboarding}
      />
      <GameOverModal
        won={hasWon}
        historyInputStatus={historyStatus}
        show={isGameOver}
      />
      <StatsModal show={displayStats} onClose={() => setDisplayStats(false)} />
    </main>
  );
}
