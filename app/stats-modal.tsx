import { Modal } from "./modal";
import { Summary } from "./summary";

type InputStatus = "valid" | "missplaced" | "useless" | "unknown";

export type GameOverModalProps = {
  show: boolean;
  onClose?: () => void;
  tryLimit: number;
  historyInputStatus: InputStatus[][];
};

export const StatsModal = ({
  show,
  onClose,
  historyInputStatus,
  tryLimit,
}: GameOverModalProps) => {
  return (
    <Modal title="Statistics" show={show} onClose={onClose}>
      <Summary tryLimit={tryLimit} historyInputStatus={historyInputStatus} />
    </Modal>
  );
};
