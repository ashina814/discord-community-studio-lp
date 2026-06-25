"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function FaqList({ faqs }: { faqs: Array<[string, string]> }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map(([question, answer], index) => {
        const isOpen = open === index;
        return (
          <div key={question} className={isOpen ? "faq-item faq-item-open" : "faq-item"}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 text-left text-base font-black"
              aria-expanded={isOpen}
            >
              <span>{question}</span>
              <ChevronDown className={isOpen ? "h-5 w-5 shrink-0 rotate-180 text-discord" : "h-5 w-5 shrink-0 text-slate-500"} />
            </button>
            <div className={isOpen ? "faq-answer faq-answer-open" : "faq-answer"}>
              <p className="pt-4 leading-8 text-slate-300">{answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
