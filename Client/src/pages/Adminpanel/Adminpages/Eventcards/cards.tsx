import React, { useState } from 'react';

function Card({ title, description, author, onUpdate, onDelete, imageUrl }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortDescription = !isExpanded && description.length > 100
    ? description.slice(0, 100) + '...'
    : description;

  return (
    <div className={`max-w-md mx-auto bg-black border border-gray-200 rounded-2xl shadow-md p-4 flex flex-col transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-[280px]'} overflow-hidden`}>
      <img
        src={imageUrl || 'https://via.placeholder.com/150'}
        alt="Event"
        className="h-24 w-full object-cover rounded-md mb-3"
      />

      <div className="text-xl font-semibold text-white mb-2">
        {title}
      </div>

      <div className={`text-gray-300 text-sm mb-1 ${!isExpanded ? 'line-clamp-4' : ''} overflow-hidden`}>
        {shortDescription}
      </div>

      {description.length > 100 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 text-sm underline self-start mb-2"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      )}

      <div className="text-sm text-gray-400 italic mb-3">
        Written by: {author}
      </div>

      <div className="mt-auto flex gap-3">
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

export default Card;
