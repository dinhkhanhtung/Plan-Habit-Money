"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
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
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Header title="Planner App" />
          <Sidebar />

          <main className="mt-8 ml-64">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] w-full">
                Support & FAQ
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-lg w-full">
                We're here to help. Find answers to your questions below.
              </p>
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

            <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm py-8">
              <div className="flex justify-center gap-6">
                <a className="hover:text-primary" href="#">Terms of Service</a>
                <a className="hover:text-primary" href="#">Privacy Policy</a>
              </div>
              <p className="mt-4">© 2024 Planner App. All rights reserved.</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}