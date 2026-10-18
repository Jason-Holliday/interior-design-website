import ContactForm from "./ContactForm";
import FadeIn from "./FadeIn";

export default function Contact() {
  return (
    <section id="kontakt" className="w-full bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <FadeIn>
          <h2 className="text-center text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Kontaktformular
          </h2>
        </FadeIn>
        <FadeIn delay={150}>
          <ContactForm className="mt-10" />
        </FadeIn>
      </div>
    </section>
  );
}
