import Image from "next/image";
import CountUp from "./CountUp";
import FadeIn from "./FadeIn";
import { ProjectRequestButton } from "./ModalDialog";

const stats = [
  { value: 200, suffix: "+", label: "Realisierte Projekte" },
  { value: 300, suffix: "+", label: "Zufriedene Kunden" },
  { value: 10, suffix: "+", label: "Jahre Erfahrung" },
];

export default function Hero() {
  // Volle Bildschirmhöhe minus Navigation (h-25 = 6.25rem)
  return (
    <section id="startseite" className="flex min-h-[calc(100vh-6.25rem)] w-full flex-col bg-white">
      <div className="container-page grid flex-1 items-center gap-12 py-8 lg:grid-cols-2">
        <FadeIn>
          <h1 className="text-4xl font-medium leading-[1.15] tracking-tight text-black sm:text-6xl lg:text-7xl xl:text-8xl">
            Luxuriöse
            <br />
            Innenarchitektur
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-black">
            Wir gestalten exklusive Wohnräume, die durch außergewöhnliches Design, edle
            Materialien und eine harmonische Verbindung von Luxus und Eleganz begeistern.
          </p>
          <ProjectRequestButton className="mt-8 inline-block cursor-pointer rounded-full bg-black px-5 py-3 text-sm text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" />
        </FadeIn>

        {/* Breite folgt der Bildschirmhöhe, damit die Zahlen auf dem Desktop sichtbar bleiben */}
        <FadeIn delay={200}>
          <div className="relative mx-auto aspect-448/404 w-full max-w-xl lg:ml-auto lg:max-w-[min(42rem,calc((100vh-19rem)*1.109))]">
            {/* Quadrat-Rahmen hinter den Bildern: Ecken liegen genau in den Bildmitten
                (jeweils halbe Bildbreite/-höhe vom Rand) */}
            <div className="absolute bottom-[22%] left-[24%] right-[23.75%] top-[26.5%] border-2 border-black" />

            <div className="absolute right-0 top-0 h-[53%] w-[47.5%] overflow-hidden rounded-2xl">
              <Image
                src="/hero_image_1.jpg"
                alt="Modernes Wohnzimmer mit Holzdecke und Wendeltreppe"
                fill
                preload
                sizes="(min-width: 1024px) 300px, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-0 h-[44%] w-[48%] overflow-hidden rounded-2xl">
              <Image
                src="/hero_image_2.jpg"
                alt="Helles Wohnzimmer mit Pendelleuchte und Holzregal"
                fill
                sizes="(min-width: 1024px) 300px, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="border-t border-neutral-300">
        <ul className="mx-auto grid max-w-5xl divide-y divide-neutral-300 px-6 sm:grid-cols-3 sm:py-6 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <li key={stat.label} className="flex items-center justify-center gap-6 py-6">
              <span className="text-4xl font-semibold tracking-tight text-black">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs uppercase max-w-24 leading-snug tracking-wide text-black">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
