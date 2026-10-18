import FadeIn from "./FadeIn";

type AccordionItemProps = {
  title: string;
  text: string;
  isOpen: boolean;
  onToggle?: () => void;
  titleClassName?: string;
  /** Wenn gesetzt, blendet der Eintrag beim Reinscrollen mit dieser Verzögerung (ms) ein */
  fadeInDelay?: number;
};

export default function AccordionItem({
  title,
  text,
  isOpen,
  onToggle,
  titleClassName = "text-2xl font-medium",
  fadeInDelay,
}: AccordionItemProps) {
  const content = (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-6 border-b-2 border-black py-4 text-left"
      >
        <span className={`text-black ${titleClassName}`}>{title}</span>
        {/* Strich, der sich bei geschlossenem Zustand zum Plus dreht */}
        <span className="relative h-7 w-7 shrink-0" aria-hidden="true">
          <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-black" />
          <span
            className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-black transition-transform duration-300 ${isOpen ? "" : "rotate-90"}`}
          />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <p className="overflow-hidden text-lg leading-relaxed text-black">
          <span className="block pb-2 pt-6">{text}</span>
        </p>
      </div>
    </>
  );

  if (fadeInDelay === undefined) return <li>{content}</li>;
  return (
    <FadeIn as="li" delay={fadeInDelay}>
      {content}
    </FadeIn>
  );
}
