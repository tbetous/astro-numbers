import { Star } from "./icons"
import type { InputStatus } from "./types"

type OutputProps = {
  input: number[]
  lastInputStatus: InputStatus[]
}

const AstroOutput = ({
  displayStar,
  isMissplaced,
  isUseless,
  isValid,
}: {
  displayStar: boolean
  isMissplaced: boolean
  isUseless: boolean
  isValid?: boolean
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-primary">
      <div className="h-8 w-8 border-1 border-primary rounded-md flex items-center justify-center">
        <span>{displayStar ? <Star /> : ""}</span>
      </div>
      <div
        className={
          "h-2 w-2 rounded-full border-1 border-primary transition-all duration-150 " +
          (isMissplaced
            ? "bg-missplaced border-missplaced shadow-aura-brighter shadow-missplaced/50"
            : "") +
          (isUseless
            ? "bg-useless border-useless shadow-aura-brighter shadow-useless/50"
            : "") +
          (isValid
            ? "bg-valid border-valid shadow-aura-brighter shadow-valid/50"
            : "")
        }
      ></div>
    </div>
  )
}

export const Output = ({ input, lastInputStatus }: OutputProps) => {
  return (
    <output className="flex gap-2 items-center justify-center">
      {[...Array(lastInputStatus.length).keys()].map((index) => {
        return (
          <AstroOutput
            key={index}
            displayStar={input[index] !== undefined}
            isMissplaced={lastInputStatus[index] === "missplaced"}
            isUseless={lastInputStatus[index] === "useless"}
            isValid={lastInputStatus[index] === "valid"}
          />
        )
      })}
    </output>
  )
}
