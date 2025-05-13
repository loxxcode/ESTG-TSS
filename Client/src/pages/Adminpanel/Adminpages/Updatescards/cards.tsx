function StoryCard({ title, description,author, updatestype, onUpdate, onDelete }) {
  return (
    <div className="max-w-md mx-auto bg-estg-gray-light dark:bg-black border border-gray-200 rounded-2xl shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="text-xl dark:text-white font-semibold text-gray-800">
        {title}
      </div>
      {/* Body */}
      <div className="text-gray-600 dark:text-white">
        {description}
      </div>
      {/* Role */}
      <div className="text-sm text-gray-500 italic dark:text-white">
        update type: {updatestype}
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