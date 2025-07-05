import { Button } from "./button";
import { CloneSolid } from "./icons";
import { Toast } from "./toast";
import { useState } from "react";

type GameStats = {
  gamesPlayed: number;
  gamesWon: number;
  attemptsDistribution: { [key: number]: number }; // e.g., {1: 0, 2: 0, ..., 10: 0}
  //   inputStatusDistribution: Record<Exclude<InputStatus, "unknown">, number>; // e.g., {valid: 0, missplaced: 0, useless: 0}
};

const computeAverageAttempts = (
  attemptsDistribution: { [key: number]: number },
  gamesPlayed: number
) => {
  if (gamesPlayed === 0) return "0.00";
  const totalAttempts = Object.keys(attemptsDistribution).reduce((acc, key) => {
    return acc + parseInt(key, 10) * attemptsDistribution[Number(key)];
  }, 0);
  return (totalAttempts / gamesPlayed).toFixed(2);
};

const computeWinRate = (gamesPlayed: number, gamesWon: number): string => {
  if (gamesPlayed === 0) return "0.00";
  return ((gamesWon / gamesPlayed) * 100).toFixed(2);
};

const Metrics = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-2 border-1 border-primary rounded">
      <p className="text-sm text-primary text-center">{label}</p>
      <p className="text-md font-bold">{value}</p>
    </div>
  );
};

export const GlobalStatistics = ({
  gamesPlayed,
  gamesWon,
  attemptsDistribution,
}: GameStats) => {
  const [showToast, setShowToast] = useState(false);

  const handleShareClick = () => {
    const summary = `✨Astro Numbers - Global Statistics✨

🎮 Total Games Played: ${gamesPlayed}
🏆 Total Wins: ${gamesWon}
📊 Win Rate: ${computeWinRate(gamesPlayed, gamesWon)}%
📝 Average Attempts: ${computeAverageAttempts(
      attemptsDistribution,
      gamesPlayed
    )}`;
    navigator.clipboard.writeText(summary);
    setShowToast(true);
  };

  const maxAttempts = Object.values(attemptsDistribution).reduce(
    (max, count) => Math.max(max, count),
    0
  );

  return (
    <>
      <div className="flex flex-col gap-2 p-2 border-primary border-1 rounded full">
        <div className="flex flex-row pb-2 border-b-1 border-primary items-center gap-2 flex-wrap">
          <h3 className="text-lg">Global Statistics</h3>
          <Button onClick={handleShareClick} title="Share">
            <div className="flex flex-row items-center gap-1 px-1 py-0.5">
              <CloneSolid className="h-3 w-3" />
              <span className="text-sm">Share</span>
            </div>
          </Button>
        </div>
        <div>
          <div className="flex flex-row gap-2 items-stretch">
            <div className="w-1/3">
              <Metrics
                label="Total wins"
                value={`${gamesWon} / ${gamesPlayed}`}
              />
            </div>
            <div className="w-1/3">
              <Metrics
                label="Win Rate"
                value={`${computeWinRate(gamesPlayed, gamesWon)}%`}
              />
            </div>
            <div className="w-1/3">
              <Metrics
                label="Avg. Attempts"
                value={computeAverageAttempts(
                  attemptsDistribution,
                  gamesPlayed
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <Toast
        message="Copied to clipboard!"
        isVisible={showToast}
        onComplete={() => setShowToast(false)}
      />
    </>
  );
};
