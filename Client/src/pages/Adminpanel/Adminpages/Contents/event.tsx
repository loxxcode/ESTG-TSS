import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Event() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/adminpanel', { state: { activeTab: 1 } }); // 1 is the index for Events tab
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 relative dark:bg-black">
      <button 
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg dark:bg-black text-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Create Event</h2>
          {/* <button
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Back to Events
          </button> */}
        </div>
        
        <form>
          <div className="space-y-4">
            <div>
              <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Event Title:</label>
              <input
                type="text"
                id="eventTitle"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="eventImage" className="block text-sm font-medium text-gray-700">Add Image:</label>
              <input
                type="file"
                name="file"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                
                />
            </div>

            <div>
              <label htmlFor="eventDesc" className="block text-sm font-medium text-gray-700">Event Description:</label>
              <textarea
                name="Desc"
                id="eventDesc"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Event;
 