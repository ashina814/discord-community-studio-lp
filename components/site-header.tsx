"use client";

import { ArrowRight, Gem, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["できること", "#features"],
  ["制作例", "#showcase"],
  ["料金", "#pricing"],
  ["FAQ", "#faq"],
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-header site-header-scrolled" : "site-header"}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 text-sm font-black" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-discord/40 bg-discord/15 text-discord shadow-glow">
            <Gem size={20} />
          </span>
          <span>Discord Community Studio</span>
        </a>
        <nav className="hidden items-center gap-2 text-sm font-bold text-slate-300 md:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="nav-link">
              {label}
            </a>
          ))}
          <a href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-discord/90 px-4 py-2 text-white shadow-glow transition hover:bg-discord">
            相談
            <ArrowRight size={15} />
          </a>
        </nav>
        <button type="button" className="rounded-xl border border-white/[0.08] bg-white/[0.045] p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="メニュー">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="mx-auto mt-3 grid max-w-6xl gap-2 rounded-2xl border border-white/[0.08] bg-[#0b1020] p-3 text-sm font-bold text-slate-200 md:hidden">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="rounded-xl px-3 py-3 hover:bg-white/[0.06]" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" className="rounded-xl bg-discord px-3 py-3 text-center text-white" onClick={() => setOpen(false)}>
            無料相談する
          </a>
        </nav>
      ) : null}
    </header>
  );
}
