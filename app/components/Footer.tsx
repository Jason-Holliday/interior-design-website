import Link from "next/link";

const columns = [
  {
    title: "Navigation",
    links: [
      { href: "#startseite", label: "Startseite" },
      { href: "#projekte", label: "Projekte" },
      { href: "#leistungen", label: "Leistungen" },
      { href: "#ueber-mich", label: "Über mich" },
      { href: "#kundenstimmen", label: "Kundenstimmen" },
      { href: "#kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/agb", label: "AGB" },
      { href: "/widerrufsrecht", label: "Widerrufsrecht" },
    ],
  },
  {
    title: "Social Media",
    links: [
      { href: "https://www.instagram.com/", label: "Instagram" },
      { href: "https://www.tiktok.com/", label: "TikTok" },
      { href: "https://www.linkedin.com/", label: "LinkedIn" },
    ],
  },
  {
    title: "Kontakt",
    links: [{ href: "mailto:hallo@jonsmith.de", label: "hallo@jonsmith.de" }],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-sand py-16 sm:py-24">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="text-4xl font-light tracking-tight text-black sm:text-5xl">
            EdelDesign
          </Link>
          <p className="mt-6 max-w-sm text-lg leading-snug text-black">
            Wir gestalten exklusive Wohnräume, die durch außergewöhnliches Design, edle
            Materialien und eine harmonische Verbindung von Luxus und Eleganz begeistern.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-xl font-semibold text-black sm:text-2xl">{column.title}</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {column.links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className={`relative text-base text-black sm:text-lg ${link.href.startsWith("mailto:") ? "wrap-anywhere" : ""} after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-center after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
