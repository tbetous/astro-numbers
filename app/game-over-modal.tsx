import { Modal } from "./modal"
import { GameSummary } from "./game-summary"
import type { InputStatus } from "./types"

export type GameOverModalProps = {
  show: boolean
  won: boolean
  answer: number[]
  tryLimit: number
  historyInputStatus: InputStatus[][]
  onClose?: () => void
}

export const GameOverModal = ({
  won,
  answer,
  tryLimit,
  historyInputStatus,
  show,
  onClose,
}: GameOverModalProps) => {
  const title = won ? "Success" : "Defeat"
  const closing = won
    ? "Congratulations! Come back tomorrow for a new puzzle."
    : "Better luck next time! Maybe you will find it tomorrow?"
  return (
    <Modal title={title} show={show} onClose={onClose}>
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
  )
}
