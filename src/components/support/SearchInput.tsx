"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search FAQs..." }: SearchInputProps) {
  return (
    <div className="px-4 py-3 mt-4">
      <label className="flex flex-col min-w-40 h-14 w-full">
        <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </label>
    </div>
  );
}