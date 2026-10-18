"use client";

import { useState } from "react";
import AccordionItem from "./AccordionItem";
import FadeIn from "./FadeIn";

const questions = [
  {
    title: "Wie läuft die Zusammenarbeit ab?",
    text: "Wir starten mit einem persönlichen Gespräch, in dem wir deine Wünsche und deinen Wohnstil kennenlernen. Danach entwickeln wir ein Konzept, wählen gemeinsam Materialien aus und begleiten die Umsetzung bis zum letzten Detail.",
  },
  {
    title: "Kann ich auch nur einen einzelnen Raum gestalten lassen?",
    text: "Ja, sehr gerne. Ob Wohnzimmer, Schlafzimmer oder Bad: Wir gestalten auch einzelne Räume mit derselben Sorgfalt wie ein komplettes Zuhause.",
  },
  {
    title: "Wie lange dauert ein Interior-Design-Projekt?",
    text: "Das hängt vom Umfang ab. Ein einzelner Raum ist oft in wenigen Wochen umgesetzt, eine komplette Wohnung oder ein Haus dauert in der Regel mehrere Monate.",
  },
  {
    title: "Kann ich eigene Möbel in das Design integrieren?",
    text: "Natürlich. Lieblingsstücke und Erbstücke geben einem Raum Persönlichkeit. Wir binden sie bewusst in das neue Konzept ein.",
  },
  {
    title: "Kann ich meine eigenen Ideen und Wünsche einbringen?",
    text: "Unbedingt. Deine Ideen sind die Grundlage jedes Konzepts. Wir ergänzen sie mit unserer Erfahrung und unserem Gespür für Details.",
  },
  {
    title: "Wie starte ich mein Projekt?",
    text: "Schreib uns einfach über das Kontaktformular oder ruf uns an. Wir melden uns zeitnah und vereinbaren ein unverbindliches Erstgespräch.",
  },
  {
    title: "Was kostet ein Projekt?",
    text: "Die Kosten richten sich nach Umfang und Ausstattung. Nach dem Erstgespräch erhältst du ein transparentes, individuelles Angebot.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<string[]>([]);

  function toggle(title: string) {
    setOpen((current) =>
      current.includes(title) ? current.filter((t) => t !== title) : [...current, title],
    );
  }

  return (
    <section id="faq" className="w-full bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <FadeIn>
          <h2 className="text-center text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Häufige Fragen
          </h2>
        </FadeIn>

        <ul className="mt-10">
          {questions.map((question, index) => (
            <AccordionItem
              key={question.title}
              title={question.title}
              text={question.text}
              isOpen={open.includes(question.title)}
              onToggle={() => toggle(question.title)}
              titleClassName="text-xl font-semibold"
              fadeInDelay={index * 80}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
