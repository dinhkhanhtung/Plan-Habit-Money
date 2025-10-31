"use client";

import { SupportCategory } from "@/types/support";

interface CategoryTabsProps {
  categories: SupportCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryTabs({ categories, selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 sm:gap-3 p-3 flex-wrap justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 text-sm font-medium leading-normal ${
            selectedCategory === category.id
              ? "bg-primary text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {category.name}
          <span className="text-xs opacity-75">({category.count})</span>
        </button>
      ))}
    </div>
  );
}