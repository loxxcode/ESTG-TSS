import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewContentCreators = () => {
  const [data, setData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();

  // Fetch data from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/account/creators",{withCredentials: true})
      .then((res) => {
        setData(res.data); // Set the fetched data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching content creators:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-2 sm:gap-0">

   
        <h1 className="text-xl sm:text-3xl font-medium">Content Creators</h1>

        <Link
          to="/contentcreatorregistration"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors flex items-center text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          New Creator
        </Link>
      </div>

      {/* Responsive Table that becomes cards on mobile */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Table Headers - Hidden on mobile */}
        <div className="hidden sm:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <TableRow key={index} item={item} index={index} />
                ))
              ) : (
                <>
                  <TableRow item={{
                    _id: "1",
                    name: "Jane Doe",
                    email: "jane@example.com",
                    role: "Photographer",
                    phone: "+1 123 456 7890"
                  }} index={0} />
                  <TableRow item={{
                    _id: "2",
                    name: "John Smith",
                    email: "john@example.com",
                    role: "Videographer",
                    phone: "+1 987 654 3210"
                  }} index={1} />
                </>
              )}
            </tbody>
          </table>
        </div>
        {/* Show loading state */}
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : data.length > 0 ? (
          <>
            {/* Table Headers - Hidden on mobile */}
            <div className="hidden sm:block">
              <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-500">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-black">
                  {data.map((item, index) => (
                    <TableRow key={index} item={item} index={index} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards - Shows table data as cards */}
            <div className="sm:hidden space-y-3 p-3">
              {data.map((item, index) => (
                <MobileCard key={index} item={item} index={index} />
              ))}
            </div>
          </>
        ) : (
          <div className="p-4 text-center font-medium dark:bg-gray-800">
            No content creators found.
          </div>
        )}
      </div>
    </div>
  );
};

// Table Row Component (for desktop)
const TableRow = ({ item, index }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      {index + 1}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      {item.username}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      {item.email}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      {item.role}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      {item.phone || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs transition-colors flex items-center"
        onClick={() => console.log("Delete", item._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Delete
      </button>
    </td>
  </tr>
);

// Mobile Card Component (for mobile)
const MobileCard = ({ item, index }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-xs text-gray-500">
          #{index + 1} • {item.role}
        </p>
      </div>
      <button
        className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-md"
        onClick={() => console.log("Delete", item._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
      <div>
        <p className="text-gray-500 font-medium">Email</p>
        <p className="text-gray-700 truncate">{item.email}</p>
      </div>
      <div>
        <p className="text-gray-500 font-medium">Phone</p>
        <p className="text-gray-700">{item.phone || "N/A"}</p>
      </div>
    </div>
  </div>
);

export default ViewContentCreators;
