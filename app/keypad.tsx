import { CheckSolid, DeleteLeftSolid } from "./icons";

type KeypadProps = {
  onNumberInput: (n: number) => void;
  onErase: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
  eraseDisabled?: boolean;
  disabled?: boolean;
};

type KeypadButtonProps = {
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const KeypadButton = ({ onClick, disabled, children }: KeypadButtonProps) => {
  return (
    <button
      className="
        h-12 w-12 flex justify-center items-center text-primary border-1 border-primary rounded-md cursor-pointer transition-all duration-150
        hover:shadow-aura shadow-primary/50 
        focus:outline-none focus:ring-2 focus:ring-primary hover:text-space hover:bg-primary 
        active:scale-90 
        disabled:cursor-not-allowed disabled:border-disabled disabled:text-disabled disabled:bg-space disabled:shadow-none disabled:scale-100
        "
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const Keypad = ({
  onNumberInput,
  onErase,
  onSubmit,
  submitDisabled,
  eraseDisabled,
  disabled,
}: KeypadProps) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="flex gap-4">
        {[7, 8, 9].map((value) => (
          <KeypadButton
            onClick={() => onNumberInput(value)}
            disabled={disabled}
          >
            {value}
          </KeypadButton>
        ))}
      </div>
      <div className="flex gap-4">
        {[4, 5, 6].map((value) => (
          <KeypadButton
            onClick={() => onNumberInput(value)}
            disabled={disabled}
          >
            {value}
          </KeypadButton>
        ))}
      </div>
      <div className="flex gap-4">
        {[1, 2, 3].map((value) => (
          <KeypadButton
            onClick={() => onNumberInput(value)}
            disabled={disabled}
          >
            {value}
          </KeypadButton>
        ))}
      </div>
      <div className="flex gap-4">
        <KeypadButton onClick={onErase} disabled={submitDisabled || disabled}>
          <DeleteLeftSolid className="h-4 w-4" />
        </KeypadButton>
        <KeypadButton onClick={() => onNumberInput(0)} disabled={disabled}>
          0
        </KeypadButton>
        <KeypadButton onClick={onSubmit} disabled={eraseDisabled || disabled}>
          <CheckSolid className="h-4 w-4" />
        </KeypadButton>
      </div>
    </div>
  );
};
