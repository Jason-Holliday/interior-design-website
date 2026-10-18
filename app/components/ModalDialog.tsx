"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import ContactForm from "./ContactForm";

const OpenModalContext = createContext<() => void>(() => {});

/**
 * Stellt das Projektanfrage-Modal für die ganze Seite bereit.
 * Nutzt das native <dialog>: Fokus-Falle, Escape zum Schließen und die oberste
 * Ebene (über allem, ohne z-index) bringt der Browser selbst mit.
 */
export default function ModalDialog({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }, []);

  function close() {
    dialogRef.current?.close();
  }

  // Läuft bei jedem Schließen (Button, Escape, Klick auf den Hintergrund)
  function handleClose() {
    document.documentElement.style.overflow = "";
    triggerRef.current?.focus();
  }

  return (
    <OpenModalContext value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label="Projektanfrage"
        onClose={handleClose}
        onClick={(event) => event.target === event.currentTarget && close()}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl scale-95 overflow-y-auto rounded-2xl bg-sand opacity-0 shadow-2xl transition-all transition-discrete duration-300 ease-out backdrop:bg-black/0 backdrop:transition-all backdrop:transition-discrete backdrop:duration-300 open:scale-100 open:opacity-100 open:backdrop:bg-black/50 starting:open:scale-95 starting:open:opacity-0 starting:open:backdrop:bg-black/0 motion-reduce:transition-none motion-reduce:backdrop:transition-none"
      >
        <div className="flex justify-end px-3 pt-3">
          <button
            type="button"
            onClick={close}
            aria-label="Dialog schließen"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-black"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6 text-black"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <ContactForm onDone={close} className="pt-0 sm:pt-0" />
      </dialog>
    </OpenModalContext>
  );
}

/** Button, der das Projektanfrage-Modal öffnet */
export function ProjectRequestButton({
  className,
  children = "Jetzt Projekt anfragen",
}: {
  className?: string;
  children?: ReactNode;
}) {
  const open = useContext(OpenModalContext);
  return (
    <button type="button" onClick={open} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}
