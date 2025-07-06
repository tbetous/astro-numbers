import { useState } from "react"
import { useLocalStorage } from "usehooks-ts"
import type { Route } from "./+types/app"

import { generateDailyAnswer } from "./utils/generate-daily-answer"
import { Header } from "./header"
import { Keypad } from "./keypad"
import { Output } from "./output"
import { OnboardingModal } from "./onboarding-modal"
import { GameOverModal } from "./game-over-modal"
import { StatsModal } from "./stats-modal"
import { TryCount } from "./tryCount"
import type { InputStatus } from "./types"

type Configuration = {
  onboarding: boolean
}

type GameState = {
  history: InputStatus[][]
  lastPlayedDate: string
}

type GameStats = {
  lastPlayedDate: string
  gamesPlayed: number
  gamesWon: number
  attemptsDistribution: { [key: number]: number } // e.g., {1: 0, 2: 0, ..., 10: 0}
  inputStatusDistribution: Record<Exclude<InputStatus, "unknown">, number> // e.g., {valid: 0, missplaced: 0, useless: 0}
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Astro Numbers" },
    {
      name: "description",
      content: "Find the daily secret 5-digit number within 10 attempts",
    },
  ]
}

const NUMBER_LENGTH = 5 // Adjusted to match the length of the answer
const TRY_LIMIT = 10

const getDate = () => {
  const today = new Date()
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
}

const INITIAL_STATS: GameStats = {
  lastPlayedDate: "",
  gamesPlayed: 0,
  gamesWon: 0,
  attemptsDistribution: Array.from(
    { length: TRY_LIMIT },
    (_, i) => i + 1
  ).reduce(
    (acc, attempt) => {
      acc[attempt] = 0
      return acc
    },
    {} as { [key: number]: number }
  ),
  inputStatusDistribution: {
    valid: 0,
    missplaced: 0,
    useless: 0,
  },
}

export default function App() {
  const today = getDate()
  const answer = generateDailyAnswer(NUMBER_LENGTH)

  const [gameState, setGameState] = useLocalStorage<GameState>("gameState", {
    history: [],
    lastPlayedDate: today,
  })

  const [gameStats, setGameStats] = useLocalStorage<GameStats>(
    "gameStats",
    INITIAL_STATS
  )

  const isNewDay = gameState.lastPlayedDate !== today

  const [configuration, setConfiguration] = useLocalStorage<Configuration>(
    "configuration",
    {
      onboarding: true,
    }
  )

  const [historyStatus, setHistoryStatus] = useState<InputStatus[][]>(
    isNewDay ? [] : gameState.history
  )

  const [displayOnboarding, setDisplayOnboarding] = useState(
    configuration && configuration.onboarding
  )
  const [displayStats, setDisplayStats] = useState(false)
  const [tryLeft, setTryLeft] = useState(TRY_LIMIT - historyStatus.length)
  const [input, setInput] = useState<number[]>([])
  const [inputStatus, setInputStatus] = useState<InputStatus[]>(
    (historyStatus.length && historyStatus[historyStatus.length - 1]) ||
      Array(NUMBER_LENGTH).fill("unknown")
  )
  const [gameOverShown, setGameOverShown] = useState(false)

  const hasWon = inputStatus.every((status) => status === "valid")
  const hasNoTryLeft = tryLeft <= 0
  const isGameOver = hasNoTryLeft || hasWon

  const updateGameStats = () => {
    setGameStats((prevStats) => {
      const attemptsUsed = TRY_LIMIT - tryLeft
      const updatedStats = { ...prevStats }

      updatedStats.gamesPlayed += 1
      if (hasWon) {
        updatedStats.gamesWon += 1
        updatedStats.attemptsDistribution[attemptsUsed] += 1
      }

      updatedStats.inputStatusDistribution = historyStatus.reduce(
        (acc, status) => {
          status.forEach((s) => {
            if (s !== "unknown") {
              acc[s] = (acc[s] || 0) + 1
            }
          })
          return acc
        },
        { ...prevStats.inputStatusDistribution }
      )

      updatedStats.lastPlayedDate = today

      return updatedStats
    })
  }

  if (isGameOver && today !== gameStats.lastPlayedDate) {
    updateGameStats()
  }

  const handleShowHelp = () => {
    setDisplayOnboarding(true)
  }

  const handleShowStats = () => {
    setDisplayStats(true)
  }

  const handleCloseOnboarding = () => {
    setConfiguration((configuration) => ({
      ...configuration,
      onboarding: false,
    }))
    setDisplayOnboarding(false)
  }

  const handleNumberInput = (number: number) => {
    if (input.length >= NUMBER_LENGTH) return

    setInput((input) => [...input, number])
  }

  const handleEraseInput = () => {
    if (input.length === 0) return

    setInput((input) => input.slice(0, input.length - 1))
  }

  const updateGameState = (newHistory: InputStatus[][]) => {
    setGameState({
      history: newHistory,
      lastPlayedDate: today,
    })
  }

  const handleSubmit = () => {
    if (input.length !== NUMBER_LENGTH) return
    if (tryLeft <= 0) return

    setTryLeft((count) => count - 1)

    const answerNumberCountMap = answer.reduce(
      (acc: { [key: number]: number }, value: number) => {
        if (!acc[value]) acc[value] = 0
        acc[value] += 1
        return acc
      },
      {}
    )

    const newOutputStatus: InputStatus[] = input.map((number, index) => {
      if (!answerNumberCountMap[number]) return "useless"

      answerNumberCountMap[number] -= 1

      if (answer[index] === number) return "valid"
      return "missplaced"
    })

    setInput([])
    setInputStatus(newOutputStatus)
    const newHistory = [...historyStatus, newOutputStatus]
    setHistoryStatus(newHistory)
    updateGameState(newHistory)
  }

  return (
    <main className="flex flex-col items-center justify-center px-4 gap-6">
      <Header onShowHelp={handleShowHelp} onShowStats={handleShowStats} />
      <TryCount tryLeft={tryLeft} tryTotal={TRY_LIMIT} />
      <Output input={input} lastInputStatus={inputStatus} />
      <Keypad
        onNumberInput={handleNumberInput}
        onErase={handleEraseInput}
        onSubmit={handleSubmit}
        submitDisabled={input.length === 0}
        eraseDisabled={input.length < NUMBER_LENGTH}
        disabled={isGameOver}
      />
      <OnboardingModal
        show={displayOnboarding}
        onClose={handleCloseOnboarding}
      />
      <GameOverModal
        won={hasWon}
        historyInputStatus={historyStatus}
        show={isGameOver && !gameOverShown}
        answer={answer}
        tryLimit={TRY_LIMIT}
        onClose={() => {
          setGameOverShown(true)
        }}
      />
      <StatsModal
        show={displayStats}
        historyInputStatus={historyStatus}
        tryLimit={TRY_LIMIT}
        gameStats={gameStats}
        onClose={() => setDisplayStats(false)}
      />
    </main>
  )
}
