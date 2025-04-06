import { Modal } from "./modal";

type OnboardingModalProps = {
  show: boolean;
  onClose?: () => void;
};

export const OnboardingModal = ({ onClose, show }: OnboardingModalProps) => {
  return (
    <Modal title="Onboarding" show={show} onClose={onClose}>
      Rule of the game
    </Modal>
  );
};
