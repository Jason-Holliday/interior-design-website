"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const underlineHover =
  "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-center after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100";

const links = [
  { href: "#startseite", label: "Startseite" },
  { href: "#projekte", label: "Projekte" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ueber-mich", label: "Über mich" },
  { href: "#kundenstimmen", label: "Kundenstimmen" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  // Menü mit Escape schließen
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="relative z-50 w-full bg-white">
      <nav className="container-page flex h-25 items-center justify-between">
        <Link href="/" className="text-3xl font-light tracking-tight text-black">
          EdelDesign
        </Link>

        <ul className="hidden items-center gap-4 text-sm text-black md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={underlineHover}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-black transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-black transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-black transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Liegt über dem Inhalt (absolute + z-50), statt ihn nach unten zu schieben.
          inert nimmt das geschlossene Menü aus der Tab-Reihenfolge */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full border-t border-black/10 bg-white shadow-lg transition-all duration-300 ease-out md:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        <ul className="container-page flex flex-col gap-5 py-6 text-base text-black">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className={underlineHover}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
