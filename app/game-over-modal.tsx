import { Modal } from "./modal";

type InputStatus = "valid" | "missplaced" | "useless" | "unknown";

export type GameOverModalProps = {
  show: boolean;
  won: boolean;
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
  historyInputStatus,
  show,
}: GameOverModalProps) => {
  const title = won ? "Success" : "Defeat";
  return (
    <Modal title={title} show={show}>
      This the end of the game! Come back tomorrow.
      <h3>Your history</h3>
      <ul>
        {historyInputStatus.map((attempt, index) => (
          <li key={index}>
            <AttemptRaw attempt={attempt} />
          </li>
        ))}
      </ul>
    </Modal>
  );
};
