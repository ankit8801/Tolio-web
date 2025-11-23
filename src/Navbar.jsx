// src/Navbar.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import SearchContext from "./SearchContext";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const { setSearch } = useContext(SearchContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  function focusMainSearch() {
    const target = document.getElementById("main-search-input");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => target.focus(), 300);
  }

  function handleNavbarSearch(e) {
    setSearch(e.target.value);
    focusMainSearch();
  }

  return (
    <nav
      className="
        sticky top-0 z-50 
        bg-white/95 dark:bg-[#0b0b0b]/90
        backdrop-blur-xl border-b 
        border-neutral-200 dark:border-neutral-800
        shadow-[0_4px_20px_rgba(0,0,0,0.2)]
        transition-all duration-300
      "
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Brand */}
        <Link
          to="/"
          className="
            text-xl font-bold tracking-tight
            bg-gradient-to-r from-lime-500 to-emerald-500
            text-transparent bg-clip-text
            hover:opacity-80 transition
          "
        >
          ⚡ TOLIO
        </Link>

        {/* Navbar Search */}
        <input
          placeholder="Search anything…"
          onClick={focusMainSearch}
          onChange={handleNavbarSearch}
          className="
            hidden md:block px-5 py-2 rounded-full
            bg-neutral-100 dark:bg-neutral-900
            border border-neutral-300 dark:border-neutral-700
            text-sm text-neutral-700 dark:text-neutral-300
            placeholder-neutral-400 dark:placeholder-neutral-600
            focus:ring-2 focus:ring-lime-500/40
            outline-none transition
          "
        />

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Suggest Tool → internal page, not Google Form */}
          <Link
            to="/suggest"
            className="
              px-4 py-1.5 rounded-full 
              bg-neutral-200 dark:bg-neutral-800 
              hover:bg-neutral-300 dark:hover:bg-neutral-700 
              text-neutral-700 dark:text-neutral-300
              transition shadow-sm text-sm
            "
          >
            Suggest a Tool
          </Link>

          {/* Admin */}
          <Link
            to="/admin/login"
            className="
              px-4 py-1.5 rounded-full 
              bg-gradient-to-r from-lime-500 to-emerald-500
              text-black font-semibold shadow-sm
              hover:opacity-90 transition text-sm
            "
          >
            Admin
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              w-12 h-6 flex items-center rounded-full relative
              bg-neutral-300 dark:bg-neutral-600
              transition-all duration-300
              shadow-inner
            "
          >
            <span
              className={`
                absolute h-5 w-5 rounded-full 
                bg-white dark:bg-lime-400
                shadow-[0_2px_6px_rgba(0,0,0,0.3)]
                transform transition-all duration-300
                ${darkMode ? "translate-x-6" : "translate-x-1"}
              `}
            ></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
