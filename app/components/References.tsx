"use client";

import Image from "next/image";
import { useState } from "react";
import FadeIn from "./FadeIn";

// poster = Vorschaubild, src = Videodatei in /public (z. B. "/videos/kunde-1.mp4").
// Solange src fehlt, zeigt die Kachel nur das Vorschaubild.
const videos: { poster: string; src?: string }[] = [
  "camera-1.avif",
  "camera-2.avif",
  "camera-3.jpg",
  "camera-4.jpg",
  "camera-5.jpg",
  "camera-6.jpg",
  "camera-7.jpg",
  "camera-8.jpg",
  "camera-9.jpg",
  "camera-10.jpg",
  "camera-12.jpg",
  "camera-13.jpg",
  "camera-15.jpg",
  "camera-16.jpg",
  "camera-18.jpg",
  "camera-27.jpg",
].map((file) => ({ poster: `/${file}` }));

const reviews = [
  { name: "Sophie Müller", avatar: "/avatar-4.avif", text: "Unser Wohnzimmer ist kaum wiederzuerkennen. Jedes Detail passt, und wir fühlen uns endlich richtig zuhause." },
  { name: "Lukas Schneider", avatar: "/avatar-1.avif", text: "Von der ersten Idee bis zur Umsetzung perfekt begleitet. Die Materialauswahl war eine echte Bereicherung!" },
  { name: "Anna Fischer", avatar: "/avatar-6.avif", text: "Das Lichtkonzept hat unsere Wohnung komplett verändert. Abends ist es jetzt ein ganz besonderes Gefühl." },
  { name: "Daniel Weber", avatar: "/avatar-2.avif", text: "Professionell, kreativ und gleichzeitig sehr einfühlsam. Unsere Wünsche wurden immer ernst genommen." },
  { name: "Julia Hoffmann", avatar: "/avatar-7.avif", text: "Ich hätte nie gedacht, dass man aus unserem kleinen Bad so viel herausholen kann. Einfach wunderschön." },
  { name: "Benjamin Richter", avatar: "/avatar-3.avif", text: "Die Zusammenarbeit war eine der besten Entscheidungen für unser neues Zuhause." },
  { name: "Laura Neumann", avatar: "/avatar-8.avif", text: "Unsere alten Lieblingsmöbel wurden so geschickt integriert, dass alles wie aus einem Guss wirkt." },
  { name: "Sebastian Klein", avatar: "/avatar-5.avif", text: "Termingerecht, transparent und mit einem großartigen Gespür für Stil. Absolut empfehlenswert." },
  { name: "Miriam Bauer", avatar: "/avatar-11.avif", text: "Authentisch, inspirierend und absolut zuverlässig. Ich kann die Zusammenarbeit von Herzen weiterempfehlen." },
  { name: "Patrick Vogel", avatar: "/avatar-9.avif", text: "Unser Penthouse hat durch das neue Konzept eine Eleganz bekommen, die wir uns immer gewünscht haben." },
  { name: "Katharina Beck", avatar: "/avatar-12.avif", text: "Jeder Raum erzählt jetzt eine Geschichte. Vielen Dank für die wertvolle Begleitung!" },
  { name: "Florian Roth", avatar: "/avatar-10.avif", text: "Hochwertige Materialien, durchdachte Planung und ein Ergebnis, das uns jeden Tag begeistert." },
];

export default function References() {
  return (
    <section id="kundenstimmen" className="w-full bg-white py-16 sm:py-24">
      <div className="container-page">
        <FadeIn>
          <h2 className="text-center text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Unsere zufriedenen Kunden
          </h2>
        </FadeIn>

        {/* Jede Kachel blendet beim Reinscrollen einzeln ein, pro Reihe gestaffelt */}
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {videos.map((video, index) => (
            <FadeIn as="li" key={index} delay={(index % 4) * 100}>
              <VideoTile poster={video.poster} src={video.src} label={`Kundenvideo ${index + 1}`} />
            </FadeIn>
          ))}
        </ul>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <FadeIn
              as="li"
              key={review.name}
              delay={(index % 4) * 100}
              className="rounded-xl bg-sand p-5 shadow-md"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={review.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold uppercase text-black">{review.name}</p>
                  <Stars />
                </div>
              </div>
              <p className="mt-3 text-sm italic leading-snug text-black">{review.text}</p>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function VideoTile({ poster, src, label }: { poster: string; src?: string; label: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing && src) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        className="aspect-10/7 w-full rounded-xl bg-black object-cover shadow-md"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${label} abspielen`}
      className="group relative block aspect-10/7 w-full cursor-pointer overflow-hidden rounded-xl shadow-md"
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-3 border-black sm:h-14 sm:w-14 sm:border-4 bg-white/30 transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-black sm:ml-1 sm:h-6 sm:w-6" aria-hidden="true">
          <path d="M6 4l14 8-14 8z" />
        </svg>
      </span>
    </button>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6z" />
        </svg>
      ))}
    </div>
  );
}
