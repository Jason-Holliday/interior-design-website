import Image from "next/image";
import FadeIn from "./FadeIn";

const steps = [
  {
    title: "Persönliche Beratung",
    text: "Wir lernen deine Wünsche, Vorstellungen und deinen individuellen Wohnstil kennen.",
  },
  {
    title: "Individuelle Planung",
    text: "Wir entwickeln ein maßgeschneidertes Raumkonzept, das Ästhetik, Funktionalität und Eleganz vereint.",
  },
  {
    title: "Design & Materialauswahl",
    text: "Gemeinsam wählen wir exklusive Möbel, edle Materialien und harmonische Farben für dein neues Zuhause.",
  },
  {
    title: "Umsetzung & Vollendung",
    text: "Mit Liebe zum Detail verwandeln wir dein Konzept in einen einzigartigen Wohnraum voller Luxus und Eleganz.",
  },
];

export default function Steps() {
  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="container-page">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
              In vier einfachen Schritten zu deiner Traumwohnung
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-black">
              Von der ersten Idee bis zum vollendeten Wohnkonzept begleiten wir dich mit
              Leidenschaft, Kreativität und einem besonderen Gespür für Luxus und Eleganz.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ol className="flex min-w-0 flex-col gap-8">
            {steps.map((step, index) => (
              <FadeIn as="li" key={step.title} delay={index * 120} className="flex items-stretch gap-3 sm:gap-6">
                <span className="w-8 shrink-0 self-center text-2xl font-medium text-black sm:w-10 sm:text-3xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Punkt mit Linie bis zum nächsten Punkt (gap-8 = 2rem Abstand zwischen den Schritten) */}
                <div className="relative w-6 shrink-0" aria-hidden="true">
                  {index < steps.length - 1 && (
                    <span className="absolute left-1/2 top-1/2 h-[calc(100%+2rem)] w-0.5 -translate-x-1/2 bg-bronze" />
                  )}
                  <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze" />
                </div>

                <div className="min-w-0 flex-1 rounded-2xl bg-sand px-5 py-6 sm:px-8 sm:py-8 xl:px-24">
                  <h3 className="hyphens-auto text-2xl font-medium text-black">{step.title}</h3>
                  <p className="mt-4 max-w-sm text-lg leading-snug text-black">{step.text}</p>
                </div>
              </FadeIn>
            ))}
          </ol>

          {/* Auf dem Desktop so hoch wie die vier Schritte daneben. Ausschnitt nach rechts
              verschoben, damit die Person im Hochformat nicht angeschnitten wird */}
          <FadeIn delay={200}>
            <div className="relative aspect-square overflow-hidden rounded-2xl lg:aspect-auto lg:h-full">
              <Image
                src="/ablauf.jpg"
                alt="Innenarchitekt prüft Pläne und Materialmuster im Studio"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[70%_center]"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
