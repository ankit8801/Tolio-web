export default function Hero() {
  return (
    <section
      className="
        w-full py-24
        bg-gradient-to-br
        from-lime-400 via-lime-500 to-emerald-600
        dark:from-lime-500 dark:via-emerald-600 dark:to-emerald-700
        text-white text-center
        rounded-b-4xl
        shadow-[0_20px_40px_rgba(0,0,0,0.25)]
        relative overflow-hidden
      "
    >

      {/* Subtle glossy highlight for premium feel */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-b from-white/10 to-transparent
          dark:from-white/5
          pointer-events-none
        "
      />

      <h1
        className="
          text-5xl md:text-6xl font-extrabold tracking-tight
          drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]
        "
      >
        Every Tool. One Platform.
      </h1>

      <p
        className="
          mt-6 text-lg md:text-xl text-white/90 
          max-w-3xl mx-auto leading-relaxed
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]
        "
      >
        Discover the world’s best free and trial tools for AI, coding, editing,
        productivity, design, research, and more — instantly.
      </p>

    </section>
  );
}
