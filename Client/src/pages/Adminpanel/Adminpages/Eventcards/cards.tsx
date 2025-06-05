
import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  imageUrl?: string;
  onDelete: () => void;
}

function Card({
  id,
  title,
  description,
  author,
  imageUrl,
  onDelete,
}: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const shortDescription =
    !isExpanded && description.length > 100
      ? `${description.slice(0, 100)}...`
      : description;

  const handleUpdate = () => {
    navigate(`/editeevent/${id}`, {
      state: {
        title,
        description,
        author,
        imageUrl,
      },
    });
  };

  return (
    <div
      className={`max-w-md mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-4 flex flex-col transition-all duration-300 ${
        isExpanded ? "h-auto" : "h-[330px]"
      } overflow-hidden`}
    >
      <img
        src={imageUrl || "https://via.placeholder.com/150"}
        alt="Event"
        className="h-24 w-full object-cover rounded-md mb-3"
      />

      <div className="text-xl font-semibold text-black dark:text-white mb-2">
        {title}
      </div>

      <div
        className={`text-gray-600 dark:text-gray-300 text-sm mb-1 ${
          !isExpanded ? "line-clamp-4" : ""
        } overflow-hidden`}
      >
        {shortDescription}
      </div>

      {description.length > 100 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 hover:text-blue-500 text-sm underline self-start mb-2"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}

      <div className="text-sm text-gray-400 italic mb-3">
        Written by: {author}
      </div>

      <div className="mt-auto flex gap-3">
        <button
          onClick={onUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg text-sm font-medium flex-1 flex items-center justify-center transition-colors"
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors" >
          <Pencil size={16} />
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg text-sm font-medium flex-1 flex items-center justify-center transition-colors"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"

        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default Card;
