// src/ToolGrid.jsx
import ToolCard from "./ToolCard";

export default function ToolGrid({ tools }) {
  return (
    <div
      className="
        mt-6 grid gap-6
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
      "
    >
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
