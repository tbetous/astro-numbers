type TryCountProps = {
  tryLeft: number
  tryTotal: number
}

export const TryCount = ({ tryLeft, tryTotal }: TryCountProps) => {
  return (
    <div className="flex border-1 border-primary items-center justify-center">
      <div className="text-primary text-sm border-r-1 border-primary p-1 px-2">
        Attempts left
      </div>
      <div className="text-primary text-sm border-primary p-1 px-2">
        {tryLeft}/{tryTotal}
      </div>
    </div>
  )
}
