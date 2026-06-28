"use client";

import { useState } from "react";

export function FaqList({ faqs }: { faqs: Array<[string, string]> }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => {
        const isOpen = open === index;
        const displayIndex = String(index + 1).padStart(2, "0");

        return (
          <div key={question} className={isOpen ? "faq-item faq-item-open" : "faq-item"}>
            <button type="button" onClick={() => setOpen(isOpen ? null : index)} className="faq-button" aria-expanded={isOpen}>
              <span className="faq-index">{displayIndex}</span>
              <span className="faq-question">{question}</span>
              <span className="faq-plus" aria-hidden="true">
                +
              </span>
            </button>
            <div className={isOpen ? "faq-answer faq-answer-open" : "faq-answer"}>
              <div>
                <p>{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
