"use client";

import { ArrowRight } from "lucide-react";

export function PlanCta({ plan, children }: { plan: string; children: React.ReactNode }) {
  const choosePlan = () => {
    window.dispatchEvent(new CustomEvent("select-plan", { detail: plan }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button type="button" onClick={choosePlan} className="plan-cta">
      {children}
      <ArrowRight size={15} />
    </button>
  );
}
