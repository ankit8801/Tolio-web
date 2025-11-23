// src/Home.jsx
import { useEffect, useMemo, useState, useContext } from "react";
import Hero from "./Hero";
import CategoryBar from "./CategoryBar";
import ToolGrid from "./ToolGrid";
import Footer from "./Footer";
import { db } from "./firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import SearchContext from "./SearchContext";

export default function Home() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { search, setSearch, searchRef } = useContext(SearchContext);
  const [category, setCategory] = useState("All");

  // Firestore realtime
  useEffect(() => {
    const q = query(collection(db, "tools"), orderBy("name"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setTools(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      },
      () => {
        setError("Could not load tools. Please try again later.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Search + Filtering
  const filteredTools = useMemo(() => {
    const s = search.trim().toLowerCase();

    return tools.filter((tool) => {
      const categoryMatch =
        category === "All" ||
        (tool.category &&
          tool.category.toLowerCase() === category.toLowerCase());

      if (!categoryMatch) return false;

      if (!s) return true;

      const haystack = (
        (tool.name || "") +
        " " +
        (tool.description || "") +
        " " +
        (tool.category || "") +
        " " +
        (tool.keywords || "")
      ).toLowerCase();

      return haystack.includes(s);
    });
  }, [tools, search, category]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">

      <Hero />

      {/* MAIN SEARCH */}
      <section className="max-w-4xl mx-auto px-4 mt-6 flex flex-col items-center">
        <input
          id="main-search-input"
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search tools by name, use-case, or category…"
          className="
            w-full max-w-2xl px-5 py-3 rounded-full
            bg-white border border-neutral-300
            text-neutral-900 placeholder-neutral-500

            dark:bg-neutral-900 dark:border-neutral-700
            dark:text-neutral-100 dark:placeholder-neutral-600

            focus:ring-2 focus:ring-lime-500/60
            outline-none transition shadow-md
          "
        />
      </section>

      <CategoryBar
        activeCategory={category}
        onCategoryChange={setCategory}
      />

      <main className="max-w-6xl mx-auto px-4 pb-16 pt-4">
        {loading && (
          <p className="mt-10 text-center text-neutral-400">
            Loading tools…
          </p>
        )}

        {error && (
          <p className="mt-10 text-center text-red-400">{error}</p>
        )}

        {!loading && !error && filteredTools.length === 0 && (
          <p className="mt-10 text-center text-neutral-400">
            No tools found. Try another search.
          </p>
        )}

        {!loading && !error && filteredTools.length > 0 && (
          <ToolGrid tools={filteredTools} />
        )}
      </main>

      <Footer />
    </div>
  );
}
