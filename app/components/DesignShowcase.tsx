"use client";

import Image from "next/image";
import { useState } from "react";
import AccordionItem from "./AccordionItem";
import FadeIn from "./FadeIn";
import { ProjectRequestButton } from "./ModalDialog";

const items = [
  {
    title: "Wohnraumgestaltung",
    text: "Wir gestalten exklusive Wohnräume mit edlen Materialien, zeitloser Ästhetik und einem besonderen Gespür für luxuriöse Details.",
  },
  {
    title: "Ganzheitliche Innenarchitektur",
    text: "Von der ersten Idee bis zur Umsetzung entwickeln wir maßgeschneiderte Raumkonzepte, die Design, Komfort und Eleganz harmonisch vereinen.",
  },
];

const allTitles = items.map((item) => item.title);

export default function DesignShowcase() {
  const [open, setOpen] = useState<string[]>([]);

  function toggle(title: string) {
    setOpen((current) =>
      current.includes(title) ? current.filter((t) => t !== title) : [...current, title],
    );
  }

  return (
    <section className="w-full bg-sand py-16 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        {/* Auf dem Desktop so hoch wie der Inhalt mit allen Punkten aufgeklappt */}
        <FadeIn>
          <div className="relative aspect-square overflow-hidden rounded-2xl lg:aspect-auto lg:h-full">
            <Image
              src="/Showcase.jpg"
              alt="Innenarchitekt wählt im Studio Farben und Materialien für ein Wohnkonzept aus"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>

        {/* Beide Ebenen liegen übereinander: die unsichtbare (alles aufgeklappt) gibt die
            Höhe vor, die sichtbare ist die echte, klickbare Version */}
        <FadeIn delay={150}>
          <div className="grid max-w-xl">
            <div className="invisible col-start-1 row-start-1 hidden lg:flex" aria-hidden="true">
              <Content open={allTitles} />
            </div>
            <div className="col-start-1 row-start-1 flex">
              <Content open={open} onToggle={toggle} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Content({ open, onToggle }: { open: string[]; onToggle?: (title: string) => void }) {
  return (
    <div className="flex w-full flex-col">
      <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
        Gestalte deine Wohnung mit Eleganz
      </h2>
      <p className="mt-10 text-lg leading-relaxed text-black">
        Wir gestalten exklusive Wohnräume, die durch zeitlose Ästhetik, edle Materialien und
        maßgeschneiderte Konzepte eine einzigartige Verbindung von Luxus und Eleganz schaffen.
      </p>

      <ul className="mt-8">
        {items.map((item) => (
          <AccordionItem
            key={item.title}
            title={item.title}
            text={item.text}
            isOpen={open.includes(item.title)}
            onToggle={() => onToggle?.(item.title)}
          />
        ))}
      </ul>

      {/* mt-auto schiebt den Button an die Unterkante des Bildes */}
      <div className="mt-auto pt-8">
        <ProjectRequestButton className="inline-block cursor-pointer rounded-full bg-black px-5 py-3 text-base text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" />
      </div>
    </div>
  );
}
