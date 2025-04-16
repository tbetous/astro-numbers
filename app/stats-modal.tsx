import { Modal } from "./modal";
import { GameSummary } from "./game-summary";
import { GlobalStatistics } from "./global-statistics";

type GameStats = {
  lastPlayedDate: string;
  gamesPlayed: number;
  gamesWon: number;
  attemptsDistribution: { [key: number]: number }; // e.g., {1: 0, 2: 0, ..., 10: 0}
};

type InputStatus = "valid" | "missplaced" | "useless" | "unknown";

export type GameOverModalProps = {
  show: boolean;
  onClose?: () => void;
  tryLimit: number;
  historyInputStatus: InputStatus[][];
  gameStats: GameStats;
};

export const StatsModal = ({
  show,
  onClose,
  historyInputStatus,
  tryLimit,
  gameStats,
}: GameOverModalProps) => {
  return (
    <Modal title="Statistics" show={show} onClose={onClose}>
      <div className="flex flex-col items-left gap-4">
        <GameSummary
          tryLimit={tryLimit}
          historyInputStatus={historyInputStatus}
        />
        <GlobalStatistics
          gamesPlayed={gameStats.gamesPlayed}
          gamesWon={gameStats.gamesWon}
          attemptsDistribution={gameStats.attemptsDistribution}
        />
      </div>
    </Modal>
  );
};
