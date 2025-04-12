import { Modal } from "./modal";

type InputStatus = "valid" | "missplaced" | "useless" | "unknown";

export type GameOverModalProps = {
  show: boolean;
  won: boolean;
  historyInputStatus: InputStatus[][];
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
    {attempt.map((inputStatus) => (
      <InputStatusEmoji inputStatus={inputStatus} />
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
        {historyInputStatus.map((attempt) => (
          <li>
            <AttemptRaw attempt={attempt} />
          </li>
        ))}
      </ul>
    </Modal>
  );
};
