"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SearchInput } from "@/components/support/SearchInput";
import { CategoryTabs } from "@/components/support/CategoryTabs";
import { FAQAccordion } from "@/components/support/FAQAccordion";
import { ContactInfo } from "@/components/support/ContactInfo";
import { faqData, categories, contactInfo } from "@/data/support";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFaqs = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Support & FAQ" />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-6">
              <div className="flex flex-wrap justify-between gap-3 mb-8">
              <div>
                <p className="text-text-light dark:text-text-dark text-4xl font-black leading-tight tracking-[-0.033em]">
                  Support & FAQ
                </p>
                <p className="text-text-muted-light dark:text-text-muted-dark text-lg mt-2">
                  We're here to help. Find answers to your questions below.
                </p>
                </div>
              </div>
            </div>

            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search FAQs..."
            />

            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <FAQAccordion faqs={filteredFaqs} />

            <ContactInfo contact={contactInfo} />

            <footer className="mt-12 text-center text-text-muted-light dark:text-text-muted-dark text-sm py-8">
              <div className="flex justify-center gap-6">
                <a className="hover:text-primary" href="#">Terms of Service</a>
                <a className="hover:text-primary" href="#">Privacy Policy</a>
              </div>
              <p className="mt-4">© 2024 Planner App. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
