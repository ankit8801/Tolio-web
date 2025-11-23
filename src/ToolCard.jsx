// src/ToolCard.jsx
export default function ToolCard({ tool }) {
  const pricingLabel =
    typeof tool.isFree === "boolean"
      ? tool.isFree
        ? "Free"
        : "Paid / Trial"
      : "Pricing";

  const pricingColor =
    tool.isFree === true
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      : "bg-amber-500/20 text-amber-300 border-amber-500/30";

  return (
    <a
      href={tool.url || "#"}
      target="_blank"
      rel="noreferrer"
      className="
        block p-6 rounded-3xl 
        bg-white/10 dark:bg-white/5
        backdrop-blur-2xl 
        border border-white/20 dark:border-white/10
        shadow-[0_8px_40px_rgba(0,0,0,0.25)]
        hover:shadow-[0_12px_55px_rgba(0,0,0,0.35)]
        hover:-translate-y-1 transition-all duration-300
      "
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className="
              text-4xl p-3 rounded-2xl
              bg-white/20 dark:bg-white/10
              shadow-inner
            "
          >
            {tool.icon || "🧰"}
          </div>

          {/* Name */}
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {tool.name || "Unnamed Tool"}
          </h3>
        </div>

        {/* Pricing Chip */}
        <span
          className={`
            px-3 py-1 rounded-full text-xs font-medium border
            ${pricingColor}
          `}
        >
          {pricingLabel}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-neutral-700 dark:text-neutral-300 text-[15px] leading-relaxed">
        {tool.description || "No description available."}
      </p>

      {/* Bottom Row */}
      <div className="mt-5 flex items-center justify-between text-sm">
        {/* Category Chip */}
        <span
          className="
            px-3 py-1 rounded-full font-medium
            bg-white/20 text-neutral-800 
            dark:bg-white/10 dark:text-neutral-200
          "
        >
          {tool.category || "Uncategorized"}
        </span>

        {/* Link */}
        <span
          className="
            text-neutral-700 dark:text-neutral-300 
            underline underline-offset-4 
            hover:text-emerald-400 dark:hover:text-emerald-300 
            transition
          "
        >
          Visit tool →
        </span>
      </div>
    </a>
  );
}
