import React from "react";
import { FaTrash } from "react-icons/fa";

const ProblemCard = ({
  id,
  title,
  difficulty,
  platform,
  topics = [],
  notes,
  onDelete,
}) => {
  return (
    <div className="relative h-full flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

      {/* TOPICS */}
      <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end max-w-[60%]">
        {topics.slice(0, 2).map((topic, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded-full "
          >
            {topic}
          </span>
        ))}

        {topics.length > 2 && (
          <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
            +{topics.length - 2}
          </span>
        )}
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-slate-900 pr-24">
        {title}
      </h2>

      {/* META */}
      <div className="flex gap-3 mt-3">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${difficulty === "Easy"
              ? "bg-green-100 text-green-700"
              : difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {difficulty}
        </span>

        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
          {platform}
        </span>
      </div>

      {/* NOTES */}
      <p className="mt-4 text-sm text-slate-600 line-clamp-4 grow">
        {notes}
      </p>

      {/* DELETE BUTTON */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onDelete(id)}
          className="flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
        >
          <FaTrash />
          Delete
        </button>
      </div>

    </div>
  );
};

export default ProblemCard;