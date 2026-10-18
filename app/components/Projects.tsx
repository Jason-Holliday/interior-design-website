import Image from "next/image";
import FadeIn from "./FadeIn";

const projects = [
  {
    title: "Villa am See",
    text: "Exklusive Architektur in perfekter Harmonie mit Natur und Stil.",
    image: "/Villa_See.jpg",
  },
  {
    title: "Stadtresidenz München",
    text: "Urbane Eleganz mit maßgeschneiderter Innenarchitektur.",
    image: "/Stadtresiden.jpg",
  },
  {
    title: "Chalet Alpenblick",
    text: "Luxuriöse Rückzugsorte mit authentischem Charakter und modernem Komfort.",
    image: "/CHalet.jpg",
  },
  {
    title: "Wellness Refugium",
    text: "Exklusive Architektur in perfekter Harmonie mit Natur und Stil.",
    image: "/Wellness.jpg",
  },
  {
    title: "Penthouse Skyline",
    text: "Exklusive Architektur in perfekter Harmonie mit Natur und Stil.",
    image: "/Luxus_Penthouse.jpg",
  },
  {
    title: "Landhaus modern",
    text: "Exklusive Architektur in perfekter Harmonie mit Natur und Stil.",
    image: "/Landhaus.jpg",
  },
];

export default function Projects() {
  return (
    <section id="projekte" className="w-full bg-sand py-16 sm:py-24">
      <div className="container-page">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Einblicke in unsere Projekte
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black">
              Unsere Projekte stehen für zeitlose Ästhetik, erstklassige Materialien und
              maßgeschneiderte Wohnkonzepte, die höchste Ansprüche an Design und Lebensqualität
              erfüllen.
            </p>
          </div>
        </FadeIn>

        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <FadeIn as="li" key={project.title} delay={(index % 3) * 120} className="group cursor-pointer">
              <div className="relative aspect-6/5 overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-center justify-between px-2">
                <h3 className="text-2xl font-medium text-black">{project.title}</h3>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-9 w-9 shrink-0 text-neutral-800 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </div>
              <p className="mt-3 max-w-xs text-lg leading-snug text-black">{project.text}</p>
            </FadeIn>
          ))}
        </ul>

        <div className="mt-16 text-center">
          <a
            href="#projekte"
            className="inline-block rounded-full bg-black px-5 py-3 text-base text-white transition-colors hover:bg-neutral-800"
          >
            Alle Projekte entdecken
          </a>
        </div>
      </div>
    </section>
  );
}
