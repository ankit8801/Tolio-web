import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export default function ReviewSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all suggestions
  async function loadSuggestions() {
    setLoading(true);
    const snap = await getDocs(collection(db, "suggestions"));
    setSuggestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => {
    loadSuggestions();
  }, []);

  // APPROVE (Moves suggestion → tools collection)
  async function approveSuggestion(s) {
    const toolData = {
      name: s.toolName,
      url: s.toolUrl,
      category: s.category || "Uncategorized",
      description: s.description,
      icon: "⚡", // Or blank
      isFree:
        s.pricing === "free" ||
        s.pricing === "both"
          ? true
          : false,
      createdAt: serverTimestamp(),
      keywords: s.useCase || ""
    };

    await addDoc(collection(db, "tools"), toolData);
    await deleteDoc(doc(db, "suggestions", s.id));

    alert("Suggestion approved and added to TOLIO!");
    loadSuggestions();
  }

  // REJECT
  async function rejectSuggestion(id) {
    if (!window.confirm("Reject this suggestion?")) return;

    await deleteDoc(doc(db, "suggestions", id));
    loadSuggestions();
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent mb-6">
        User Suggestions
      </h1>

      {loading && (
        <p className="text-neutral-400 text-center mt-6">Loading…</p>
      )}

      {!loading && suggestions.length === 0 && (
        <p className="text-neutral-400 text-center mt-6">
          No suggestions for now.
        </p>
      )}

      {/* Suggestion List */}
      <div className="space-y-5">
        {suggestions.map((s) => (
          <div
            key={s.id}
            className="bg-neutral-900 rounded-2xl p-5 border border-neutral-700 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{s.toolName}</h2>
                <p className="text-lime-400">{s.toolUrl}</p>

                <p className="mt-2 text-neutral-300 text-sm">{s.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-neutral-800 border border-neutral-700">
                    Category: {s.category || "N/A"}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${
                      s.pricing === "free"
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-amber-500/20 border-amber-500/50 text-amber-300"
                    }`}
                  >
                    Pricing: {s.pricing}
                  </span>
                </div>

                {s.useCase && (
                  <p className="mt-3 text-neutral-400 text-xs">
                    Use case: {s.useCase}
                  </p>
                )}

                {s.email && (
                  <p className="mt-1 text-neutral-500 text-xs">
                    Submitted by: {s.email}
                  </p>
                )}
              </div>

              {/* Approve / Reject */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => approveSuggestion(s)}
                  className="px-4 py-1.5 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectSuggestion(s.id)}
                  className="px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
