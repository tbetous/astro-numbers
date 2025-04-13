import { Modal } from "./modal";

export type GameOverModalProps = {
  show: boolean;
  onClose?: () => void;
};

export const StatsModal = ({ show, onClose }: GameOverModalProps) => {
  return (
    <Modal title="Statistics" show={show} onClose={onClose}>
      <h3>Here is your statistics</h3>
    </Modal>
  );
};
