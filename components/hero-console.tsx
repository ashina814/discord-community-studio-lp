"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { publicPath } from "@/lib/public-path";

const events = [
  { text: "kanata が LV.42 に到達", tone: "blue" },
  { text: "rui が VC に参加しました", tone: "green" },
  { text: "デイリー報酬 +120 Gil", tone: "purple" },
  { text: "mochi がショップで購入", tone: "blue" },
  { text: "新メンバー 3人 が参加", tone: "green" },
  { text: "haru が寝落ちマッチング開始", tone: "purple" },
  { text: "通話ランキングが更新", tone: "blue" },
  { text: "Jackpot Pool +860 Gil", tone: "green" },
];

const stats = [
  { label: "ACTIVE", value: "312", percent: "78%", tone: "blue" },
  { label: "IN VC", value: "28", percent: "46%", tone: "green" },
  { label: "GIL/DAY", value: "8.4k", percent: "64%", tone: "purple" },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function HeroConsole() {
  const reducedMotion = useReducedMotion();
  const [members, setMembers] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setMembers(1284);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1300;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setMembers(Math.round(1284 * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setTick((current) => current + 1);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const feed = useMemo(() => {
    return Array.from({ length: 4 }, (_, index) => events[(tick + index) % events.length]);
  }, [tick]);

  return (
    <aside className="bx-console" aria-label="Botix live community console" data-reveal>
      <div className="bx-console-head">
        <div className="bx-live-pill">
          <span />
          LIVE
        </div>
        <div className="bx-console-server">
          <span className="bx-console-mark">
            <Image src={publicPath("/brand/botix-mark.png")} alt="" fill sizes="28px" className="object-contain" />
          </span>
          <span>neko-server</span>
        </div>
        <div className="bx-console-members">
          <strong>{members.toLocaleString("en-US")}</strong>
          <span>MEMBERS</span>
        </div>
      </div>

      <div className="bx-console-feed">
        <p className="bx-console-label">ACTIVITY</p>
        <div className="bx-feed-list">
          {feed.map((event, index) => (
            <div
              key={`${event.text}-${tick}-${index}`}
              className={`bx-feed-row bx-tone-${event.tone} ${index === 0 && !reducedMotion ? (tick % 2 ? "bx-feed-enter-a" : "bx-feed-enter-b") : ""}`}
            >
              <span className="bx-feed-diamond" />
              <span className="bx-feed-text">{event.text}</span>
              <span className="bx-feed-now">now</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bx-console-stats">
        {stats.map((stat) => (
          <div key={stat.label} className={`bx-mini-stat bx-tone-${stat.tone}`}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <div className="bx-stat-bar">
              <i style={{ width: stat.percent }} />
            </div>
            <em>{stat.percent}</em>
          </div>
        ))}
      </div>
    </aside>
  );
}
