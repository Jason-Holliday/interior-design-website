import Image from "next/image";
import FadeIn from "./FadeIn";
import { ProjectRequestButton } from "./ModalDialog";

export default function About() {
  return (
    <section id="ueber-mich" className="w-full bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <FadeIn>
          <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Hallo, ich bin John Smith
          </h2>
          <p className="mt-6 text-xl uppercase text-black sm:text-2xl">
            Interior Design mit Leidenschaft für Luxus und zeitlose Eleganz.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-10 space-y-4 text-left text-lg leading-relaxed text-black">
            <p>
              Ich bin John und meine Leidenschaft ist es, außergewöhnliche Wohnräume zu gestalten. Mit
              einem besonderen Gespür für Ästhetik, edle Materialien und harmonische Details verwandle
              ich individuelle Vorstellungen in stilvolle Wohnkonzepte.
            </p>
            <p>
              Mein Ziel ist es, Räume zu schaffen, die nicht nur durch Luxus und Eleganz begeistern,
              sondern auch deine Persönlichkeit widerspiegeln und ein einzigartiges Wohngefühl
              vermitteln.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="relative mt-12 aspect-3/2 overflow-hidden rounded-2xl">
            <Image
              src="/about.jpg"
              alt="John Smith lächelnd in seinem Designstudio mit Farb- und Materialmustern"
              fill
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>

        <ProjectRequestButton className="mt-8 inline-block cursor-pointer rounded-full bg-black px-5 py-3 text-base text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" />
      </div>
    </section>
  );
}
