import { Modal } from "./modal";
import { GameSummary } from "./game-summary";

type InputStatus = "valid" | "missplaced" | "useless" | "unknown";

export type GameOverModalProps = {
  show: boolean;
  won: boolean;
  answer: number[];
  tryLimit: number;
  historyInputStatus: InputStatus[][];
  onClose?: () => void;
};

const InputStatusEmoji = ({ inputStatus }: { inputStatus: InputStatus }) => {
  switch (inputStatus) {
    case "valid":
      return <span>🟩</span>;
    case "missplaced":
      return <span>🟨</span>;
    default:
      return <span>🟥</span>;
  }
};

const AttemptRaw = ({ attempt }: { attempt: InputStatus[] }) => (
  <span>
    {attempt.map((inputStatus, index) => (
      <InputStatusEmoji key={index} inputStatus={inputStatus} />
    ))}
  </span>
);

export const GameOverModal = ({
  won,
  answer,
  tryLimit,
  historyInputStatus,
  show,
}: GameOverModalProps) => {
  const title = won ? "Success" : "Defeat";
  const closing = won
    ? "Congratulations! Come back tomorrow for a new puzzle."
    : "Better luck next time! Maybe you will find it tomorrow?";
  return (
    <Modal title={title} show={show}>
      <div className="flex flex-col items-left gap-4">
        <p>
          The answer was :{" "}
          <span className="text-primary">{answer.join("")}</span>
        </p>
        <p>{closing}</p>
        <GameSummary
          historyInputStatus={historyInputStatus}
          tryLimit={tryLimit}
        />
      </div>
    </Modal>
  );
};
