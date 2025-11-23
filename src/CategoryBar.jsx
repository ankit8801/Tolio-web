// src/CategoryBar.jsx
const CATEGORIES = [
  "All",
  "AI",        // ✅ NEW CATEGORY
  "Text",
  "Images",
  "Video",
  "Design",
  "Coding",
  "Voice",
  "Search",
  "Productivity",
];

export default function CategoryBar({ activeCategory, onCategoryChange }) {
  return (
    <section className="w-full mt-6 mb-4">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap gap-3 justify-center">

        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                transition shadow-sm
                ${
                  isActive
                    ? "bg-gradient-to-r from-lime-400 to-emerald-500 text-black shadow"
                    : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                }
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
}
