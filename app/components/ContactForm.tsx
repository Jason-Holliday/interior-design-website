"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

type ChoiceStep = {
  key: "start" | "objekt" | "raeume" | "budget";
  question: string;
  hint?: string;
  options: string[];
  multiple?: boolean;
};

const choiceSteps: ChoiceStep[] = [
  {
    key: "start",
    question: "Wann möchtest du anfangen?",
    options: ["So bald wie möglich", "In 1 – 3 Monaten", "In 3 – 6 Monaten", "Später / noch offen"],
  },
  {
    key: "objekt",
    question: "Um welche Art von Objekt geht es?",
    options: ["Wohnung", "Haus / Villa", "Ferienhaus / Chalet", "Büro / Gewerbe"],
  },
  {
    key: "raeume",
    question: "Welche Bereiche möchtest du gestalten?",
    hint: "Mehrfachauswahl möglich",
    options: [
      "Wohn- & Essbereich",
      "Küche",
      "Schlafzimmer",
      "Bad & Wellness",
      "Komplettes Zuhause",
      "Außenbereich",
    ],
    multiple: true,
  },
  {
    key: "budget",
    question: "Welches Budget planst du ein?",
    options: ["Bis 25.000 €", "25.000 – 50.000 €", "50.000 – 100.000 €", "Über 100.000 €"],
  },
];

const totalSteps = choiceSteps.length + 1;

type Answers = {
  start: string[];
  objekt: string[];
  raeume: string[];
  budget: string[];
};

const emptyAnswers: Answers = { start: [], objekt: [], raeume: [], budget: [] };
const emptyContact = { name: "", email: "", telefon: "", nachricht: "", datenschutz: false };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sichtbarer Fokusrahmen für Tastaturnutzer (WCAG 2.4.7)
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

type ContactFormProps = {
  /** Wird im Modal übergeben: zeigt nach dem Absenden einen Schließen-Button */
  onDone?: () => void;
  className?: string;
};

export default function ContactForm({ onDone, className = "" }: ContactFormProps) {
  // Eindeutige IDs, da das Formular zweimal auf der Seite steht (Section + Modal)
  const uid = useId();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [contact, setContact] = useState(emptyContact);
  const [showErrors, setShowErrors] = useState(false);
  const [sent, setSent] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);

  const choiceStep = choiceSteps[step];
  const isContactStep = step === choiceSteps.length;

  const choiceError =
    !isContactStep && answers[choiceStep.key].length === 0
      ? choiceStep.multiple
        ? "Bitte wähle mindestens eine Antwort aus."
        : "Bitte wähle eine Antwort aus."
      : "";

  const contactErrors = {
    name: contact.name.trim() ? "" : "Bitte gib deinen Namen ein.",
    email: !contact.email.trim()
      ? "Bitte gib deine E-Mail-Adresse ein."
      : !emailPattern.test(contact.email.trim())
        ? "Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de."
        : "",
    datenschutz: contact.datenschutz
      ? ""
      : "Bitte stimme der Datenschutzerklärung zu, damit wir deine Anfrage bearbeiten können.",
  };

  // Nach jedem Schrittwechsel die neue Frage fokussieren, damit Screenreader sie vorlesen
  useEffect(() => {
    if (hasNavigated.current) headingRef.current?.focus();
  }, [step, sent]);

  function goTo(nextStep: number) {
    hasNavigated.current = true;
    setShowErrors(false);
    setStep(nextStep);
  }

  function select(option: string) {
    const { key, multiple } = choiceStep;
    setAnswers((current) => {
      const selected = current[key];
      if (!multiple) return { ...current, [key]: [option] };
      return {
        ...current,
        [key]: selected.includes(option)
          ? selected.filter((o) => o !== option)
          : [...selected, option],
      };
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!isContactStep) {
      if (choiceError) {
        setShowErrors(true);
        document.getElementById(`${uid}-${choiceStep.key}-0`)?.focus();
        return;
      }
      goTo(step + 1);
      return;
    }

    const firstInvalid = (["name", "email", "datenschutz"] as const).find(
      (field) => contactErrors[field],
    );
    if (firstInvalid) {
      setShowErrors(true);
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }

    // TODO: Anfrage an einen Mail-Dienst oder eine API-Route senden ({ ...answers, ...contact })
    hasNavigated.current = true;
    setSent(true);
  }

  function reset() {
    setAnswers(emptyAnswers);
    setContact(emptyContact);
    setSent(false);
    goTo(0);
  }

  return (
    <div className={`rounded-2xl bg-sand px-5 py-8 sm:px-10 sm:py-10 lg:px-20 ${className}`}>
      {sent ? (
        <div className="py-10 text-center">
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="text-3xl font-semibold text-black outline-none"
          >
            Vielen Dank für deine Anfrage!
          </h3>
          <p className="mx-auto mt-4 max-w-md text-lg text-black">
            Wir melden uns innerhalb von 48 Stunden bei dir, um ein unverbindliches
            Erstgespräch zu vereinbaren.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className={`cursor-pointer rounded-full border-2 border-black px-8 py-4 font-semibold text-black transition-colors hover:bg-black hover:text-white ${focusRing}`}
            >
              Neue Anfrage
            </button>
            {onDone && (
              <button
                type="button"
                onClick={onDone}
                className={`cursor-pointer rounded-full bg-black px-8 py-4 font-semibold text-white transition-colors hover:bg-neutral-800 ${focusRing}`}
              >
                Schließen
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-1 text-base text-black sm:flex-row sm:items-center sm:justify-between sm:text-lg">
            <span className="uppercase">EdelDesign – Projektanfrage</span>
            <span aria-live="polite">
              Schritt {step + 1} von {totalSteps}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3" aria-hidden="true">
            {Array.from({ length: totalSteps }, (_, i) => (
              <span
                key={i}
                className={`h-5 rounded-full border-2 border-bronze transition-colors sm:h-7 duration-300 ${i <= step ? "bg-bronze" : ""}`}
              />
            ))}
          </div>

          {isContactStep ? (
            <fieldset className="mt-8" aria-labelledby={`${uid}-frage`}>
              <h3
                id={`${uid}-frage`}
                ref={headingRef}
                tabIndex={-1}
                className="text-2xl font-semibold text-black outline-none"
              >
                Wie können wir dich erreichen?
              </h3>
              <p className="mt-2 text-black">
                Pflichtfelder sind mit <span aria-hidden="true">*</span>
                <span className="sr-only">Sternchen</span> markiert.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field
                  id={`${uid}-name`}
                  label="Name"
                  required
                  value={contact.name}
                  onChange={(name) => setContact({ ...contact, name })}
                  autoComplete="name"
                  error={showErrors ? contactErrors.name : ""}
                />
                <Field
                  id={`${uid}-email`}
                  label="E-Mail"
                  type="email"
                  required
                  value={contact.email}
                  onChange={(email) => setContact({ ...contact, email })}
                  autoComplete="email"
                  error={showErrors ? contactErrors.email : ""}
                />
                <Field
                  id={`${uid}-telefon`}
                  label="Telefon"
                  type="tel"
                  value={contact.telefon}
                  onChange={(telefon) => setContact({ ...contact, telefon })}
                  autoComplete="tel"
                />
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor={`${uid}-nachricht`} className="font-semibold text-black">
                    Erzähl uns von deinem Projekt
                  </label>
                  <textarea
                    id={`${uid}-nachricht`}
                    rows={4}
                    value={contact.nachricht}
                    onChange={(e) => setContact({ ...contact, nachricht: e.target.value })}
                    className={`rounded-xl border-2 border-bronze bg-transparent px-4 py-3 text-black focus:border-black ${focusRing}`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <input
                      id={`${uid}-datenschutz`}
                      type="checkbox"
                      required
                      checked={contact.datenschutz}
                      onChange={(e) =>
                        setContact({ ...contact, datenschutz: e.target.checked })
                      }
                      aria-invalid={showErrors && !!contactErrors.datenschutz}
                      aria-describedby={
                        showErrors && contactErrors.datenschutz
                          ? `${uid}-datenschutz-fehler`
                          : undefined
                      }
                      className={`mt-1 h-5 w-5 shrink-0 cursor-pointer accent-bronze ${focusRing}`}
                    />
                    <label htmlFor={`${uid}-datenschutz`} className="cursor-pointer text-black">
                      Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage
                      gespeichert werden. Mehr dazu in der{" "}
                      <a href="/datenschutz" className={`underline ${focusRing}`}>
                        Datenschutzerklärung
                      </a>
                      . <span aria-hidden="true">*</span>
                    </label>
                  </div>
                  <ErrorMessage
                    id={`${uid}-datenschutz-fehler`}
                    message={showErrors ? contactErrors.datenschutz : ""}
                  />
                </div>
              </div>
            </fieldset>
          ) : (
            <fieldset
              className="mt-8"
              aria-labelledby={`${uid}-${choiceStep.key}-frage`}
              aria-describedby={showErrors && choiceError ? `${uid}-${choiceStep.key}-fehler` : undefined}
            >
              <h3
                id={`${uid}-${choiceStep.key}-frage`}
                ref={headingRef}
                tabIndex={-1}
                className="text-2xl font-semibold text-black outline-none"
              >
                {choiceStep.question}
              </h3>
              {choiceStep.hint && <p className="mt-2 text-black">{choiceStep.hint}</p>}
              <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
                {choiceStep.options.map((option, index) => {
                  const isSelected = answers[choiceStep.key].includes(option);
                  return (
                    <button
                      key={option}
                      id={`${uid}-${choiceStep.key}-${index}`}
                      type="button"
                      onClick={() => select(option)}
                      aria-pressed={isSelected}
                      className={`cursor-pointer rounded-xl border-2 px-4 py-4 text-lg font-semibold sm:py-6 transition-colors ${focusRing} ${isSelected ? "border-bronze bg-bronze text-white" : `text-black hover:bg-bronze/10 ${showErrors && choiceError ? "border-red-700" : "border-bronze"}`}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <div className="mx-auto max-w-3xl">
                <ErrorMessage
                  id={`${uid}-${choiceStep.key}-fehler`}
                  message={showErrors ? choiceError : ""}
                />
              </div>
            </fieldset>
          )}

          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              disabled={step === 0}
              className={`cursor-pointer rounded-full border-2 border-black px-6 py-4 text-lg font-semibold text-black transition-colors hover:bg-black sm:px-14 sm:py-5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black ${focusRing}`}
            >
              Zurück
            </button>
            <button
              type="submit"
              className={`group flex cursor-pointer items-center gap-3 rounded-full bg-black px-6 py-4 text-lg sm:gap-4 sm:px-8 sm:py-5 font-semibold text-white transition-colors hover:bg-neutral-800 ${focusRing}`}
            >
              {isContactStep ? "Absenden" : "Weiter"}
              <svg
                viewBox="0 0 48 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-6 w-9 transition-transform sm:w-12 duration-300 ease-out group-hover:translate-x-1.5"
              >
                <path d="M2 12h44M38 4l8 8-8 8" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
  error = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const errorId = `${id}-fehler`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold text-black">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-xl border-2 bg-transparent px-4 py-3 text-black focus:border-black ${focusRing} ${error ? "border-red-700" : "border-bronze"}`}
      />
      <ErrorMessage id={errorId} message={error} />
    </div>
  );
}

// Fehlertext in Rot-700 (#b91c1c): Kontrast 5,8:1 auf dem Sand-Hintergrund, plus Icon,
// damit der Fehler nicht nur über die Farbe erkennbar ist (WCAG 1.4.1 / 1.4.3)
function ErrorMessage({ id, message }: { id: string; message: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-base font-medium text-red-700">
      <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 fill-current">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-11.5a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0v-4ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        />
      </svg>
      <span>
        <span className="sr-only">Fehler: </span>
        {message}
      </span>
    </p>
  );
}
