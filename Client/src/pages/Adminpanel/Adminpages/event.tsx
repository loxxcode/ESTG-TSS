import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Eventcards/cards";

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
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events", {
        withCredentials: true,
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete_event/${id}`, {
        withCredentials: true,
      });
      alert("Event deleted successfully!");
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete the event. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-black min-h-screen">
      <button
        onClick={() => navigate("/createevent")}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Add Event
      </button>

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 mt-5">
        Event Cards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {data.length <= 0 ? (
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
              No Events Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              You haven't added any events yet. Once you do, they will show up
              here.
            </p>
          </div>
        ) : (
          data.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              title={item.title}
              description={item.description}
              author={item.author.username}
              imageUrl={item.imageUrl}
              onDelete={() => handleDelete(item._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Event;
