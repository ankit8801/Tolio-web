import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/admin/login";
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">

      {/* Title */}
      <h1
        className="
          text-4xl font-extrabold 
          bg-gradient-to-r from-lime-400 to-emerald-500 
          text-transparent bg-clip-text
        "
      >
        TOLIO Admin Dashboard
      </h1>

      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Welcome Admin — manage your entire tool universe effortlessly.
      </p>

      {/* Options Grid */}
      <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2">

        {/* Add / Manage Tools */}
        <Link
          to="/admin/tools"
          className="
            p-6 rounded-2xl
            bg-neutral-950 dark:bg-neutral-900 
            border border-neutral-800 
            shadow-[0_0_25px_rgba(0,255,100,0.05)]
            hover:shadow-[0_0_35px_rgba(0,255,120,0.12)]
            hover:border-lime-500/40
            hover:-translate-y-1
            transition-all
          "
        >
          <h2 className="text-xl font-semibold text-white">Add / Manage Tools</h2>
          <p className="text-sm mt-2 text-neutral-400">
            Add new tools, edit existing ones, or update categories.
          </p>
        </Link>

        {/* User Suggestions - NEW */}
        <Link
          to="/admin/suggestions"
          className="
            p-6 rounded-2xl
            bg-neutral-950 dark:bg-neutral-900
            border border-neutral-800 
            shadow-[0_0_25px_rgba(100,255,100,0.05)]
            hover:shadow-[0_0_35px_rgba(100,255,120,0.12)]
            hover:border-emerald-500/40
            hover:-translate-y-1
            transition-all
          "
        >
          <h2 className="text-xl font-semibold text-white">User Suggestions</h2>
          <p className="text-sm mt-2 text-neutral-400">
            Review, approve, or reject community-submitted tools.
          </p>
        </Link>

      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="
          mt-10 px-7 py-2 rounded-full 
          bg-red-600 hover:bg-red-700
          text-white font-medium shadow-md
          transition
        "
      >
        Logout
      </button>
    </div>
  );
}
