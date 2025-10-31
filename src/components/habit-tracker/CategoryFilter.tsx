'use client';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['All', 'Health', 'Work', 'Personal'];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-3 py-3 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-3 transition-colors ${
            selectedCategory === category
              ? 'bg-primary/20 dark:bg-primary/20 text-primary dark:text-primary'
              : 'bg-slate-200/60 dark:bg-gray-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-300/60 dark:hover:bg-gray-700/80'
          }`}
        >
          <p className="text-sm font-semibold leading-normal">{category}</p>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;