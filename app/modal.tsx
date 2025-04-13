import { type ReactNode, useEffect, useRef } from "react";
import { Button } from "./button";
import { XmarkSolid } from "./icons";

type ModalProps = {
  title: string;
  show: boolean;
  onClose?: () => void;
  children: ReactNode;
};

export const Modal = ({ title, show, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement | null>(null);

  const closeModal = () => {
    ref.current?.close();
    onClose?.();
  };

  useEffect(() => {
    if (show) {
      ref.current?.showModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <dialog ref={ref} onCancel={onClose} className="relative ">
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full min-w-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
          <div className="relative h-full w-full flex flex-col gap-4 transform overflow-hidden rounded-lg bg-space text-left shadow-xl transition-all p-4 sm:my-8 sm:w-full sm:max-w-lg">
            <div className="flex items-center justify-between pb-4 border-b-1 text-primary border-primary">
              <h2 className="text-xl">{title}</h2>
              <Button onClick={closeModal}>
                <XmarkSolid className="h-6 w-6" />
              </Button>
            </div>
            <div className="text-white">{children}</div>
          </div>
        </div>
      </div>
    </dialog>
  );
};
