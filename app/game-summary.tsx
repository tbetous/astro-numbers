import { Button } from "./button";
import { CloneSolid } from "./icons";
import type { InputStatus } from "./types";

export type SummaryProps = {
  historyInputStatus: InputStatus[][];
  tryLimit: number;
};

const inputStatusToEmojiText = (inputStatus: InputStatus) => {
  switch (inputStatus) {
    case "valid":
      return "🟩";
    case "missplaced":
      return "🟨";
    default:
      return "🟥";
  }
};

const InputStatusEmoji = ({ inputStatus }: { inputStatus: InputStatus }) => {
  return <span>{inputStatusToEmojiText(inputStatus)}</span>;
};

const AttemptRaw = ({ attempt }: { attempt: InputStatus[] }) => (
  <span>
    {attempt.map((inputStatus, index) => (
      <InputStatusEmoji key={index} inputStatus={inputStatus} />
    ))}
  </span>
);

const gameSummaryAsText = (
  historyInputStatus: InputStatus[][],
  tryLimit: number
) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const summary = `✨Astro numbers✨

📅 ${formattedDate}
🕹️ Number of attempt : ${historyInputStatus.length} / ${tryLimit}

${historyInputStatus
  .map((attempt) => `${attempt.map(inputStatusToEmojiText).join("")}`)
  .join("\n")}`;
  return summary;
};

export const GameSummary = ({ historyInputStatus, tryLimit }: SummaryProps) => {
  const handleShareClick = () => {
    navigator.clipboard.writeText(
      gameSummaryAsText(historyInputStatus, tryLimit)
    );
  };

  return (
    <div className="flex flex-col gap-2 p-2 border-primary border-1 rounded full">
      <div className="flex flex-row pb-2 border-b-1 border-primary items-center gap-2 flex-wrap">
        <h3 className="text-lg">Summary of the game</h3>
        <Button onClick={handleShareClick}>
          <div className="flex flex-row items-center gap-1 px-1 py-0.5">
            <CloneSolid className="h-3 w-3" />
            <span className="text-sm">Share</span>
          </div>
        </Button>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p>
          Number of attempt : {historyInputStatus.length} / {tryLimit}
        </p>
        <ul>
          {historyInputStatus.map((attempt, index) => (
            <li key={index}>
              <AttemptRaw attempt={attempt} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
