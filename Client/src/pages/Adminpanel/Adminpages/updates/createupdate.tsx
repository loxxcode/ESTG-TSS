import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UpdateData {
  _id?: string;
  title: string;
  description: string;
  type: string;
}

const EditUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UpdateData>({
    title: "",
    description: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(id ? true : false);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      const fetchUpdate = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/single_update/${id}`,
            { withCredentials: true }
          );
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching update:", err);
          toast.error("Failed to load update data. Please try again.", { position: "bottom-right" });
        } finally {
          setIsLoading(false);
        }
      };
      fetchUpdate();
    } else {
      setFormData({ title: "", description: "", type: "" });
      setIsLoading(false);
    }
  }, [id, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate("/adminpanel");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/edit_update/${id}`,
          formData,
          { withCredentials: true }
        );
        navigate("/adminpanel", { state: { message: 'Update successfully updated!' } });
      } else {
        const { _id, ...createData } = formData;
        await axios.post(
          `http://localhost:5000/api/create_update`,
          createData,
          { withCredentials: true }
        );
        navigate("/adminpanel", { state: { message: 'Update successfully created!' } });
      }
    } catch (err) {
      console.error(isEditMode ? "Error updating update:" : "Error creating update:", err);
      toast.error(`Failed to ${isEditMode ? 'save changes' : 'create update'}. Please try again.`, { position: "bottom-right" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-md shadow-gray-400 bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h1 className="text-3xl font-bold dark:text-gray-200 text-gray-800">
              {isEditMode ? "Edit Update" : "Create New Update"}
            </h1>
            <p className="mt-2 text-sm dark:text-gray-100 text-gray-800">
              {isEditMode ? "Please update the details below" : "Please fill in the details for the new update"}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select a type</option>
                  <option value="news">News</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isEditMode ? "Save Changes" : "Create Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUpdate;
