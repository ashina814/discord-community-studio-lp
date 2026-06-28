"use client";

import { ArrowRight } from "lucide-react";

export function PlanCta({
  plan,
  highlight,
  children,
}: {
  plan: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  const choosePlan = () => {
    window.dispatchEvent(new CustomEvent("select-plan", { detail: plan }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button type="button" onClick={choosePlan} className={highlight ? "plan-cta plan-cta-highlight" : "plan-cta"}>
      {children}
      <ArrowRight size={15} />
    </button>
  );
}
