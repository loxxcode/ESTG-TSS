import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "./cards";
import { Search } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


interface EventItem {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  author: {
    username: string;
  };
}

function Event() {
  const [data, setData] = useState<EventItem[]>([]);
  const [filtered, setFiltered] = useState<EventItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/events`, {
        withCredentials: true,
      });
      setData(response.data.data);
      setFiltered(response.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
    setFiltered(filteredData);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/delete_event/${id}`, {
        withCredentials: true,
      });
      toast.success("Event deleted successfully!", {
        position: "bottom-right",
      });
      fetchData(); // Refresh data after delete
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete the event. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="p-6 mt-5 bg-gray-100 dark:bg-black min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <button
          onClick={() => navigate("/createevent")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Add Event
        </button>

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

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 mt-5">
        Event Cards
      </h1>

      {loading ? (
        // Loading state
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse"
            >
              <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        // No events in DB
        <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
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
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">
            No Events Available
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            You haven't added any events yet. Click "Add Event" to get started.
          </p>
        </div>
      ) : searchTerm !== "" && filtered.length === 0 ? (
        // Search term entered but no matches
        <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-md">
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
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-2">
            No Matching Results
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            No events matched your search. Try different keywords.
          </p>
        </div>
      ) : (
        // Show filtered events
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {filtered.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              title={item.title}
              description={item.description}
              author={item.author.username}
              imageUrl={item.imageUrl || "https://via.placeholder.com/150"}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Event;
