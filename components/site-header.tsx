"use client";

import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { publicPath } from "@/lib/public-path";

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
    <header className={scrolled ? "bx-header bx-header-scrolled" : "bx-header"}>
      <div className="bx-container bx-header-inner">
        <a href="#top" className="bx-brand" onClick={() => setOpen(false)}>
          <span className="bx-brand-mark">
            <Image src={publicPath("/brand/botix-mark.png")} alt="Botix" fill sizes="36px" className="object-contain" priority />
          </span>
          <span>
            <span className="bx-brand-name">Botix</span>
            <span className="bx-brand-tag">Discord Bots. Built Better.</span>
          </span>
        </a>

        <nav className="bx-nav" aria-label="メインナビゲーション">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="bx-nav-link">
              {label}
            </a>
          ))}
          <a href="#contact" className="bx-primary-btn">
            相談する
            <ArrowRight size={16} />
          </a>
        </nav>

        <button type="button" className="bx-menu-btn" onClick={() => setOpen((value) => !value)} aria-label="メニュー" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <nav className="bx-mobile-menu" aria-label="モバイルナビゲーション">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            無料で相談する
          </a>
        </nav>
      ) : null}
    </header>
  );
}
