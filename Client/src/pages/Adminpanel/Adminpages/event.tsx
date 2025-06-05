import React, { useEffect, useState } from 'react';
import Card from './Eventcards/cards';
import axios from 'axios';
import { Search } from 'lucide-react';

function Event() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events", {
        withCredentials: true,
      });
      setData(response.data.data);
      setFiltered(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
    );
    setFiltered(filteredData);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete_event/${id}`, {
        withCredentials: true,
      });
      alert('Event deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete the event. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-black min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <a href="/createevent">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Add Event
          </button>
        </a>

        {/* Search bar */}
        <div className="relative w-full sm:w-96 mt-5">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search events..."
            className="w-full px-12 py-3 rounded-md shadow-sm shadow-gray-400 bg-white dark:bg-black border border-gray-200 dark:border-gray-700"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 mt-5">Event Cards</h1>

      {/* === Conditional Rendering === */}
      {data.length === 0 ? (
        // Case 1: No events in DB
        <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-black rounded-lg shadow-md">
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
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">No Events Available</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            You haven’t added any events yet. Click "Add Event" to get started.
          </p>
        </div>
      ) : searchTerm !== '' && filtered.length === 0 ? (
        // Case 2: Search term entered but no matches
        <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-black rounded-lg shadow-md">
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
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">No Matching Results</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            No events matched your search. Try different keywords.
          </p>
        </div>
      ) : (
        // Case 3: Show event cards
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {filtered.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              author={item.author.username}
              imageUrl={item.imageUrl || "https://via.placeholder.com/150"}
              onUpdate={() => console.log('Update', index)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Event;
