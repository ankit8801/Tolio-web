import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function ManageTools() {
  const [tools, setTools] = useState([]);

  // FORM FIELDS
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [isFree, setIsFree] = useState(true);

  const [editId, setEditId] = useState(null);

  // Load All Tools
  async function loadTools() {
    const snap = await getDocs(collection(db, "tools"));
    setTools(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }

  useEffect(() => {
    loadTools();
  }, []);

  // Add or Edit a tool
  async function handleAddOrEdit() {
    if (!name.trim() || !url.trim() || !category.trim()) {
      alert("Name, URL, and Category are required!");
      return;
    }

    const toolData = {
      name,
      url,
      category,
      description,
      icon,
      isFree,
    };

    if (editId) {
      await updateDoc(doc(db, "tools", editId), toolData);
      alert("Tool updated successfully!");
    } else {
      await addDoc(collection(db, "tools"), toolData);
      alert("Tool added successfully!");
    }

    resetForm();
    loadTools();
  }

  // Reset Form
  function resetForm() {
    setName("");
    setUrl("");
    setCategory("");
    setDescription("");
    setIcon("");
    setIsFree(true);
    setEditId(null);
  }

  // Delete tool
  async function handleDelete(id) {
    if (!window.confirm("Delete this tool?")) return;
    await deleteDoc(doc(db, "tools", id));
    loadTools();
  }

  // Enter edit mode
  function startEdit(tool) {
    setEditId(tool.id);
    setName(tool.name);
    setUrl(tool.url);
    setCategory(tool.category);
    setDescription(tool.description);
    setIcon(tool.icon);
    setIsFree(tool.isFree ?? true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-lime-500 to-emerald-500 text-transparent bg-clip-text">
        Manage Tools
      </h1>

      {/* FORM */}
      <div className="bg-neutral-900 p-6 rounded-2xl shadow-2xl space-y-4">

        <input
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white"
          placeholder="Tool Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white"
          placeholder="Tool URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white"
          placeholder="Category (e.g., AI, Coding, Images)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white"
          placeholder="Icon (emoji or image URL)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />

        <textarea
          className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white"
          placeholder="Short Description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* FREE vs PAID */}
        <div className="flex items-center justify-between bg-neutral-800 px-4 py-3 rounded-xl border border-neutral-700">
          <span className="text-neutral-300 font-medium">Pricing Type</span>

          <button
            onClick={() => setIsFree(!isFree)}
            className={`
              w-16 h-7 rounded-full flex items-center transition relative
              ${isFree ? "bg-emerald-500/40" : "bg-amber-500/40"}
            `}
          >
            <span
              className={`
                h-6 w-6 rounded-full bg-white shadow-lg transition transform
                ${isFree ? "translate-x-1" : "translate-x-9"}
              `}
            ></span>
          </button>

          <span className="text-neutral-300 text-sm">
            {isFree ? "Free" : "Paid / Trial"}
          </span>
        </div>

        <button
          onClick={handleAddOrEdit}
          className="w-full py-3 rounded-xl text-black font-semibold bg-gradient-to-r from-lime-500 to-green-600 hover:opacity-90 transition"
        >
          {editId ? "Save Changes" : "Add Tool"}
        </button>

        {editId && (
          <button
            onClick={resetForm}
            className="w-full py-2 rounded-xl bg-red-600 text-white"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* TOOL LIST */}
      <h2 className="text-2xl text-white mt-10 mb-4">Existing Tools</h2>

      {tools.map((tool) => (
        <div
          key={tool.id}
          className="bg-neutral-900 p-5 rounded-xl shadow flex justify-between items-center mb-3"
        >
          <div>
            <h3 className="text-xl text-white font-semibold flex items-center gap-2">
              {tool.icon || "⚡"} {tool.name}
            </h3>
            <p className="text-lime-400">{tool.url}</p>
            <p className="text-neutral-400 text-sm mt-1">
              {tool.category} • {tool.isFree ? "Free" : "Paid / Trial"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => startEdit(tool)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(tool.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
