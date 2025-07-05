import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  isVisible: boolean;
  onComplete?: () => void;
};

export const Toast = ({ message, isVisible, onComplete }: ToastProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 100);

      const hideTimer = setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }, 1300);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`
          px-4 py-2 rounded
          bg-primary text-space
          text-sm font-medium
          transition-opacity duration-300
          text-center
          ${show ? "opacity-100" : "opacity-0"}
        `}
      >
        {message}
      </div>
    </div>
  );
};
