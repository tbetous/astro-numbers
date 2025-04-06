import { useState } from "react";

import { Header } from "./header";
import { Keypad } from "./keypad";
import { Output } from "./output";
import { OnboardingModal } from "./onboarding-modal";

type InputStatus = "valid" | "missplaced" | "useless" | "unknown";

const ANSWER = [1, 2, 1, 2, 1];
const NUMBER_LENGTH = ANSWER.length;
const TRY_LIMIT = 3;

export default function App() {
  const currentGame = { history: [] };
  const [displayOnboarding, setDisplayOnboarding] = useState(true);
  const [tryLeft, setTryLeft] = useState(
    TRY_LIMIT - currentGame.history.length
  );
  const [input, setInput] = useState<number[]>([]);
  const [inputStatus, setInputStatus] = useState<InputStatus[]>(
    currentGame.history[0] || Array(NUMBER_LENGTH).fill("unknown")
  );
  const [historyStatus, setHistoryStatus] = useState<InputStatus[][]>(
    currentGame.history
  );

  const hasWon = inputStatus.every((status) => status === "valid");
  const hasNoTryLeft = tryLeft <= 0;
  const isGameOver = hasNoTryLeft || hasWon;

  const handleHelp = () => {
    setDisplayOnboarding(true);
  };

  const handleCloseOnboarding = () => {
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

    const answerNumberCountMap = ANSWER.reduce(
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

      if (ANSWER[index] === number) return "valid";
      return "missplaced";
    });

    setInput([]);
    setInputStatus(newOutputStatus);
    setHistoryStatus((history) => [...history, newOutputStatus]);
    // setCurrentGame({
    //   history: [...historyStatus, newOutputStatus],
    // });
  };

  return (
    <main className="flex flex-col items-center justify-center px-4 gap-8">
      <Header onHelp={handleHelp} />
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
    </main>
  );
}
