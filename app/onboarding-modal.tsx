import { Modal } from "./modal"

type OnboardingModalProps = {
  show: boolean
  onClose?: () => void
}

export const OnboardingModal = ({ onClose, show }: OnboardingModalProps) => {
  return (
    <Modal title="How to Play" show={show} onClose={onClose}>
      <div className="flex flex-col gap-4 text-sm">
        <div>
          <h3 className="font-bold text-primary mb-2">Goal</h3>
          <p>Find the secret 5-digit number within 10 attempts.</p>
        </div>

        <div>
          <h3 className="font-bold text-primary mb-2">How to Play</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Daily 5-digit number puzzle</li>
            <li>You have 10 attempts to find it</li>
            <li>Enter a 5-digit number guess</li>
            <li>Get color feedback per digit</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-primary mb-2">Feedback Colors</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span>🟩</span>
              <span>
                <span className="font-bold">Green/Valid:</span> Correct digit in
                correct position
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>🟨</span>
              <span>
                <span className="font-bold">Yellow/Misplaced:</span> Correct
                digit but wrong position
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>🟥</span>
              <span>
                <span className="font-bold">Red/Useless:</span> Digit not in the
                answer at all
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
