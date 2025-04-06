import { Button } from "./button";
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
    <Button className="h-12 w-12" onClick={onClick} disabled={disabled}>
      {children}
    </Button>
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
