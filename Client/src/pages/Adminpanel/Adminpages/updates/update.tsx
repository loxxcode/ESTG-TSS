import React, { useEffect, useState } from 'react';
import Card from './cards'; // Update card component
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/updates", {
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
      await axios.delete(`http://localhost:5000/api/delete_update/${id}`, {
        withCredentials: true,
      });
      toast.success('Update deleted successfully!', { position: "bottom-right" });
      fetchData();
    } catch (error) {
      console.error('Error deleting update:', error);
      toast.error('Failed to delete the update. Please try again.', { position: "bottom-right" });
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="p-6 mt-5 bg-gray-100 dark:bg-black min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Link to="/createupdate">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Add Updates
          </button>
        </Link>

        <div className="relative w-full sm:w-96 mt-5 sm:mt-0">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search updates..."
            className="w-full px-12 py-3 rounded-md shadow-sm shadow-gray-400 bg-white dark:bg-black border border-gray-300 dark:border-gray-700"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-black dark:text-white mb-5 mt-5">Update Cards</h1>

      {/* === Conditional Rendering === */}
      {data.length === 0 ? (
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
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">No Updates Available</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            You haven’t added any updates yet. Click "Add Updates" to get started.
          </p>
        </div>
      ) : searchTerm !== '' && filtered.length === 0 ? (
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
            No updates matched your search. Try different keywords.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item, index) => (
            <Card
              key={index}
              id={item._id || index}
              title={item.title}
              author={item.author?.username}
              description={item.description}
              updatestype={item.type}
              fileUrl={item.fileUrl}
              onUpdate={() => handleUpdate(item._id)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Update;
