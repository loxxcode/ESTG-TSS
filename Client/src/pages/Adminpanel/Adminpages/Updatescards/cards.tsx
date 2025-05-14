import React, { useState } from 'react';

function StoryCard({ title, description, author, updatestype, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortDescription = !isExpanded && description.length > 100
    ? description.slice(0, 100) + '...'
    : description;

  return (
    <div className={`max-w-md mx-auto bg-estg-gray-light dark:bg-black border border-gray-200 rounded-2xl shadow-md p-6 space-y-4 transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-[280px]'} overflow-hidden`}>
      {/* Header */}
      <div className="text-xl dark:text-white font-semibold text-gray-800">
        {title}
      </div>
      {/* Body */}
      <div className={`text-gray-600 dark:text-white ${!isExpanded ? 'line-clamp-4' : ''} overflow-hidden`}>
        {shortDescription}
      </div>
      {description.length > 100 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 text-sm underline self-start"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}
      {/* Role */}
      <div className="text-sm text-gray-500 italic dark:text-white">
        type: {updatestype}
      </div>
      {/* Role */}
      <div className="text-sm text-gray-500 italic dark:text-white">
        Written by: {author}
      </div>
      {/* Actions */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={onUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Update
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StoryCard;