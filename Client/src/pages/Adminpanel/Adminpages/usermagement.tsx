import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewContentCreators = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/account/creators", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching content creators:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string, username: string) => {
    // Show confirmation toast
    toast.info(
      <div className="p-2">
        <p className="font-semibold mb-2">Delete {username}?</p>
        <p className="text-sm mb-3">This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss();
              toast.success('Deletion cancelled', { position: 'bottom-right' });
            }}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss();
              try {
                const response = await axios.delete(
                  `http://localhost:5000/api/account/creators/${id}`,
                  {
                    withCredentials: true,
                  }
                );
                if (response.status === 200) {
                  toast.success(response.data.message || "Content creator deleted successfully", { position: 'bottom-right' });
                  setData((prevData) => prevData.filter((item) => item._id !== id));
                } else {
                  throw new Error('Failed to delete');
                }
              } catch (error) {
                console.error('Error deleting content creator:', error);
                toast.error("Failed to delete content creator.", { position: 'bottom-right' });
              }
            }}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>,
      {
        position: 'bottom-right',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        className: 'custom-toast',
      }
    );
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 gap-5 flex flex-col dark:bg-black min-h-screen">
      <div className="flex flex-col gap-4">
        <Link
          to="/contentcreatorregistration"
          className="flex bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-40 h-8 items-center justify-center rounded-sm text-white transition-colors"
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
        <h1 className="text-xl sm:text-2xl font-bold dark:text-white">
          Content Creators
        </h1>
      </div>

      <div className="bg-white dark:bg-black shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        ) : data.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-black">
                <thead className="bg-white dark:bg-black">
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
                      Backup code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                  {data.map((item, index) => (
                    <TableRow
                      key={index}
                      item={item}
                      index={index}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3 p-3">
              {data.map((item, index) => (
                <MobileCard
                  key={index}
                  item={item}
                  index={index}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        ) : (
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
            No Content Creators Available
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            You haven't added any content creators yet. Click "Add Content Creator" to get
            started.
          </p>
        </div>
        )}
      </div>
    </div>
  );
};

const TableRow = ({ item, index, onDelete }) => (
  <tr className="dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-700 border-spacing-1 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
      {index + 1}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
      {item.username}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
      {item.email}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
      {item.role}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
      {item.backupCodeDecimal || "N/A"}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      <button
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs transition-colors flex items-center"
        onClick={() => onDelete(item._id)}
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

const MobileCard = ({ item, index, onDelete }) => (
  <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">
          {item.username}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          #{index + 1} • {item.role}
        </p>
      </div>
      <button
        className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-md transition-colors"
        onClick={() => onDelete(item._id)}
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
        <p className="text-gray-500 dark:text-gray-300 font-medium">Email</p>
        <p className="text-gray-700 dark:text-gray-200 truncate">
          {item.email}
        </p>
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-300 font-medium">Phone</p>
        <p className="text-gray-700 dark:text-gray-200">
          {item.phone || "N/A"}
        </p>
      </div>
    </div>
  </div>
);

export default ViewContentCreators;
