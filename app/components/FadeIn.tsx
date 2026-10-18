"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  /** Verzögerung in ms, z. B. für gestaffelte Karten */
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

/**
 * Blendet den Inhalt beim Reinscrollen von unten ein.
 * Bei „Bewegung reduzieren“ (prefers-reduced-motion) ist alles sofort sichtbar.
 */
export default function FadeIn({ children, delay = 0, className = "", as = "div" }: FadeInProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "motion-safe:translate-y-8 motion-safe:opacity-0"} ${className}`}
    >
      {children}
    </Tag>
  );
}
