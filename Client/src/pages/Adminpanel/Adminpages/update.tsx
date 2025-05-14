import React, { useEffect, useState } from 'react';
import Card from './Updatescards/cards';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Event() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/updates", { withCredentials: true });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-estg-gray-light dark:bg-black min-h-screen">
      <div className="flex gap-4">
        <Link to="/createupdate">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Add Updates
          </button>
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-black dark:text-white mb-5 mt-5">Updates Cards</h1>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10">
          <svg
            className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">No Updates Found</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            You haven’t added any updates yet. Click the "Add Updates" button above to create your first one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {data.map((item, index) => (
            <Card 
              key={index}
              id={item._id || index}
              title={item.title}
              author={item.author?.username}
              description={item.description}
              updatestype={item.type}
              onUpdate={() => console.log('Update', index)}
              onDelete={() => console.log('Delete', index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Event;
