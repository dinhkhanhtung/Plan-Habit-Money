"use client";

import { FAQItem } from "@/types/support";
import { useState } from "react";

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="flex flex-col p-4 mt-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
      {faqs.map((faq, index) => (
        <details
          key={faq.id}
          className={`flex flex-col ${index < faqs.length - 1 ? "border-b border-b-gray-200 dark:border-b-gray-700" : ""} py-3 group`}
          open={openItems.has(faq.id)}
        >
          <summary
            className="flex cursor-pointer items-center justify-between gap-6 py-2 list-none"
            onClick={(e) => {
              e.preventDefault();
              toggleItem(faq.id);
            }}
          >
            <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-normal">
              {faq.question}
            </p>
            <div className={`text-gray-600 dark:text-gray-400 transition-transform duration-300 ${openItems.has(faq.id) ? "rotate-180" : ""}`}>
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </summary>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-relaxed pb-2 pt-2">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}