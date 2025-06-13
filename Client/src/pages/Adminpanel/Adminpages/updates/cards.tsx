import React, { useState } from 'react';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Helmet } from 'react-helmet';
function StoryCard({ title, description, author, id, updatestype, fileUrl, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const descriptionLimit = 180;
  const needsTruncation = description && description.length > descriptionLimit;
  const truncatedDescription = description ? description.slice(0, descriptionLimit) + '...' : '';
  const displayDescription = isExpanded || !needsTruncation ? description : truncatedDescription;

  return (
    <div className={`w-full bg-estg-gray-light dark:bg-black border border-gray-200 rounded-2xl shadow-md p-6 space-y-2 transition-all duration-300 flex flex-col justify-between ${!isExpanded ? 'h-[430px]' : 'h-auto'}`}>
       {/* 🔍 SEO + Social Media Meta Tags */}
            <Helmet>
              <title>Admin Panel | ESTG-TSS</title>
              <meta name="description" content="Manage updates, events, and content creators from the admin panel of ESTG-TSS." />
      
              {/* Open Graph Meta Tags */}
              <meta property="og:title" content="Admin Panel | ESTG-TSS" />
              <meta property="og:description" content="Control content and users from the admin panel of ESTG-TSS." />
              <meta property="og:url" content="https://estg-tss.vercel.app/admin" />
              <meta property="og:image" content="https://estg-tss.vercel.app/assets/admin-preview.jpg" />
      
              {/* Twitter Card Meta Tags */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Admin Panel | ESTG-TSS" />
              <meta name="twitter:description" content="Control content and users from the admin panel of ESTG-TSS." />
              <meta name="twitter:image" content="https://estg-tss.vercel.app/assets/admin-preview.jpg" />
            </Helmet>
      {/* Header */}
      <div className="text-xl dark:text-white font-semibold text-gray-800 mb-2">
        {title}
      </div>

      {/* Body */}
      <div className={`text-gray-600 dark:text-white flex-grow overflow-hidden ${!isExpanded && needsTruncation ? 'line-clamp-6' : ''}`}>
        {displayDescription}
      </div>

      {/* Show More/Less Button */}
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 text-sm flex items-center gap-1 hover:text-blue-600 transition-colors self-start mt-2"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show More <ChevronDown size={16} />
            </>
          )}
        </button>
      )}

      {/* Download Option */}
      {fileUrl && (
        <a
          href={fileUrl}
          download={`${title}.pdf`} // 🔁 forces filename with .pdf
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm mt-3 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
        >
          📥 Download Attachment
        </a>

      )}

      {/* Info Section and Actions */}
      <div className="mt-auto space-y-2">
        <div className="text-sm text-gray-500 italic dark:text-white">
          Type: {updatestype}
        </div>
        <div className="text-sm text-gray-500 italic dark:text-white">
          Written by: {author || 'Anonymous'}
        </div>
        <div className="flex gap-4 pt-2">
          <button onClick={onUpdate} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg text-sm font-medium flex-1 flex items-center justify-center transition-colors">
            <Pencil size={16} />
          </button>
          <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg text-sm font-medium flex-1 flex items-center justify-center transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default StoryCard;