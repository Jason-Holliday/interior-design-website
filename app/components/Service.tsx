import type { ReactNode } from "react";
import FadeIn from "./FadeIn";

const services: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Lichtkonzept",
    text: "Atmosphärische Beleuchtung, die Räume stilvoll in Szene setzt und eine harmonische Verbindung aus Eleganz und Wohlbefinden schafft.",
    icon: (
      <>
        <path d="M12 2v5" />
        <path d="M6 7h12l4 9H2l4-9Z" />
        <path d="M9.17 16a3 3 0 1 0 5.66 0" />
      </>
    ),
  },
  {
    title: "Innenarchitektur",
    text: "Individuelle Raumgestaltung, die durch zeitlose Ästhetik, edle Materialien und höchsten Wohnkomfort begeistert.",
    icon: (
      <>
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
        <path d="M4 18v2M20 18v2M12 4v9" />
      </>
    ),
  },
  {
    title: "Outdoor Design",
    text: "Exklusive Außenbereiche, die natürliche Schönheit mit modernem Design und luxuriösem Komfort vereinen.",
    icon: (
      <>
        <path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
        <path d="M7 16v6M13 19v3" />
        <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
      </>
    ),
  },
  {
    title: "Materialauswahl",
    text: "Erlesene Materialien, harmonische Farben und hochwertige Oberflächen verleihen jedem Raum eine unverwechselbare Eleganz.",
    icon: (
      <>
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </>
    ),
  },
  {
    title: "Raumkonzepte",
    text: "Maßgeschneiderte Raumlösungen, die Funktionalität, Ästhetik und individuellen Luxus perfekt miteinander verbinden.",
    icon: (
      <>
        <path d="M3 3v4M21 3v4M3 5h18" />
        <rect x="3" y="10" width="18" height="10" rx="1" />
        <path d="M7 10v3M11 10v4M15 10v3M19 10v4" />
      </>
    ),
  },
  {
    title: "Möbeldesign",
    text: "Exklusive Möbelstücke und ausgewählte Designelemente schaffen ein harmonisches Zusammenspiel aus Stil und Komfort.",
    icon: (
      <>
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
        <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
        <path d="M5 18v2M19 18v2" />
      </>
    ),
  },
  {
    title: "Projektbegleitung",
    text: "Von der ersten Vision bis zur finalen Umsetzung begleiten wir jedes Detail mit höchstem Anspruch an Qualität und Perfektion.",
    icon: (
      <>
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </>
    ),
  },
  {
    title: "Styling & Dekoration",
    text: "Liebevoll ausgewählte Accessoires und fein abgestimmte Details vollenden das Gesamtbild und verleihen jedem Raum seinen einzigartigen Charakter.",
    icon: (
      <>
        <path d="M7 2h10v9H7z" />
        <path d="M11 2v4M14 2v3" />
        <path d="M7 11v2a2 2 0 0 0 2 2h1v5a2 2 0 0 0 4 0v-5h1a2 2 0 0 0 2-2v-2" />
      </>
    ),
  },
];

export default function Service() {
  return (
    <section id="leistungen" className="w-full bg-white py-16 sm:py-24">
      <div className="container-page">
        <FadeIn>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Unsere Leistungen
            </h2>
            <p className="mt-10 text-lg leading-relaxed text-black">
              Wir verwandeln Räume in einzigartige Wohnwelten. Mit einem Gespür für Ästhetik, edle
              Materialien und außergewöhnliche Details schaffen wir maßgeschneiderte Raumkonzepte,
              die Luxus und Persönlichkeit harmonisch vereinen.
            </p>
          </div>
        </FadeIn>

        <ul className="mt-16 grid gap-x-16 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <FadeIn as="li" key={service.title} delay={(index % 3) * 120} className="flex gap-5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-9 w-9 shrink-0 text-black"
              >
                {service.icon}
              </svg>
              <div>
                <h3 className="text-2xl font-medium text-black">{service.title}</h3>
                <p className="mt-4 max-w-xs text-lg leading-snug text-black">{service.text}</p>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
