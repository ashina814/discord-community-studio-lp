"use client";

import { Gem, ShieldCheck, Ticket, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const healthStates = ["Stable", "Growing", "Balanced"] as const;
const rankingSets = [
  [
    ["01", "Night Guild", "18,420 XP"],
    ["02", "Voice Crew", "14,880 XP"],
    ["03", "Jackpot Guild", "12,390 XP"],
  ],
  [
    ["01", "Voice Crew", "18,760 XP"],
    ["02", "Night Guild", "18,510 XP"],
    ["03", "Quest Hub", "13,040 XP"],
  ],
  [
    ["01", "Night Guild", "19,120 XP"],
    ["02", "Quest Hub", "15,220 XP"],
    ["03", "Voice Crew", "14,930 XP"],
  ],
];

export function HeroDashboard() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setTick((current) => current + 1);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  const metrics = useMemo(
    () => ({
      circulation: 4_821_900 + tick * 1260,
      active: 386 + ((tick % 5) - 2) * 3,
      voiceXp: 12_840 + tick * 180,
      sink: 928 + (tick % 6) * 4,
      jackpot: 920_000 + tick * 1450,
      health: healthStates[tick % healthStates.length],
      ranking: rankingSets[tick % rankingSets.length],
    }),
    [tick],
  );

  return (
    <div className="relative">
      <div className="absolute inset-6 -z-10 rounded-[36px] bg-discord/20 blur-3xl" aria-hidden="true" />
      <div className="dashboard-shell">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase text-slate-500">Community OS</p>
            <h2 className="mt-1 text-xl font-black">Guild Economy Dashboard</h2>
          </div>
          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
            ONLINE
          </span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <MetricCard label="Total Circulation" value={`${metrics.circulation.toLocaleString()} Gil`} accent="gold" />
          <MetricCard label="Active Members" value={metrics.active.toLocaleString()} accent="purple" />
          <MetricCard label="Voice XP" value={`+${metrics.voiceXp.toLocaleString()}`} accent="purple" />
          <MetricCard label="Currency Sink" value={`${metrics.sink}K Gil`} accent="gold" />
        </div>
        <div className="grid gap-3 px-4 pb-4 lg:grid-cols-[1fr_0.82fr]">
          <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-black">Ranking</h3>
              <Trophy className="text-gold" size={18} />
            </div>
            <div className="space-y-3">
              {metrics.ranking.map(([rank, name, xp]) => (
                <div key={`${rank}-${name}`} className="ranking-row">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-discord">{rank}</span>
                    <span className="text-sm font-bold">{name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{xp}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <MiniPanel icon={Ticket} title="Shop" value="32 roles" />
            <MiniPanel icon={Gem} title="Jackpot Pool" value={`${metrics.jackpot.toLocaleString()} Gil`} gold />
            <MiniPanel icon={ShieldCheck} title="Economy Health" value={metrics.health} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string | number; accent: "gold" | "purple" }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4">
      <p className="text-xs font-black uppercase text-slate-500">{label}</p>
      <p className={accent === "gold" ? "mt-2 text-xl font-black text-gold sm:text-2xl" : "mt-2 text-xl font-black text-white sm:text-2xl"}>
        {value}
      </p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div className={accent === "gold" ? "h-full w-2/3 rounded-full bg-gold/80" : "h-full w-3/4 rounded-full bg-discord"} />
      </div>
    </div>
  );
}

function MiniPanel({
  icon: Icon,
  title,
  value,
  gold,
}: {
  icon: typeof Gem;
  title: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-slate-500">{title}</p>
          <p className={gold ? "mt-2 text-xl font-black text-gold sm:text-2xl" : "mt-2 text-xl font-black text-white sm:text-2xl"}>{value}</p>
        </div>
        <Icon className={gold ? "text-gold" : "text-discord"} size={24} />
      </div>
    </div>
  );
}
