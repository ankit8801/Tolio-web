// src/Suggest.jsx
import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Suggest() {
  const [form, setForm] = useState({
    toolName: "",
    toolUrl: "",
    category: "",
    pricing: "free",
    description: "",
    useCase: "",
    discoveredVia: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!form.toolName.trim() || !form.toolUrl.trim() || !form.description.trim()) {
      setError("Please fill in at least name, URL, and description.");
      return;
    }

    try {
      setSubmitting(true);

      await addDoc(collection(db, "suggestions"), {
        ...form,
        toolName: form.toolName.trim(),
        toolUrl: form.toolUrl.trim(),
        category: form.category.trim() || "Uncategorized",
        createdAt: serverTimestamp(),
        status: "pending",
      });

      setSuccessMessage("Thanks! Your tool was submitted. We’ll review it soon.");
      setForm({
        toolName: "",
        toolUrl: "",
        category: "",
        pricing: "free",
        description: "",
        useCase: "",
        discoveredVia: "",
        email: "",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-20">

        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-lime-600">
            Suggest a tool
          </p>
          <h1 className="text-4xl font-bold mt-2">
            Help improve{" "}
            <span className="bg-gradient-to-r from-lime-500 to-emerald-400 text-transparent bg-clip-text">
              TOLIO
            </span>
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 max-w-xl">
            Share a useful tool. We manually review every submission.
          </p>
        </div>

        <div
          className="
            rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 
            bg-white/80 dark:bg-neutral-950/80 
            backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.25)]
            p-8
          "
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Tool name + URL */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tool Name *</label>
                <input
                  value={form.toolName}
                  onChange={(e) => updateField("toolName", e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-lime-500/60"
                  placeholder="e.g. Notion AI"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tool URL *</label>
                <input
                  value={form.toolUrl}
                  onChange={(e) => updateField("toolUrl", e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-lime-500/60"
                  placeholder="https://…"
                />
              </div>
            </div>

            {/* Category + Pricing */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-lime-500/60"
                >
                  <option value="">Select category</option>
                  {[
                    "AI",
                    "Text",
                    "Images",
                    "Video",
                    "Design",
                    "Coding",
                    "Productivity",
                    "Voice",
                    "Search",
                    "Other",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Pricing</label>
                <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                  {[
                    ["free", "Free"],
                    ["paid", "Paid only"],
                    ["both", "Free + Paid"],
                    ["unknown", "Not sure"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateField("pricing", value)}
                      className={`px-3 py-2 rounded-2xl border ${
                        form.pricing === value
                          ? "bg-lime-500 text-black border-lime-500 shadow-sm"
                          : "bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">What does it do? *</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                className="w-full mt-1 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-lime-500/60 resize-none"
                placeholder="Short description"
              />
            </div>

            {/* Use Case + Discovered Via */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">How do you use it?</label>
                <textarea
                  value={form.useCase}
                  onChange={(e) => updateField("useCase", e.target.value)}
                  rows={2}
                  className="w-full mt-1 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-lime-500/60 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Where did you find it?</label>
                <textarea
                  value={form.discoveredVia}
                  onChange={(e) => updateField("discoveredVia", e.target.value)}
                  rows={2}
                  className="w-full mt-1 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-lime-500/60 resize-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Your email (optional)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-lime-500/60"
                placeholder="Only if we need to contact you"
              />
            </div>

            {/* Alerts */}
            {error && (
              <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-2xl">
                {error}
              </p>
            )}

            {successMessage && (
              <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-2xl">
                {successMessage}
              </p>
            )}

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 text-black font-semibold text-sm shadow-lg disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit tool"}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
          We manually review all suggestions to keep TOLIO high quality.
        </p>
      </div>
    </div>
  );
}
