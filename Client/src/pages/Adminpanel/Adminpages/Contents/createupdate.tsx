import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EventData {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const EditEventForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<EventData>({
    _id: '',
    title: '',
    description: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      setFormData({
        _id: id || '',
        title: location.state.title || '',
        description: location.state.description || '',
        imageUrl: location.state.imageUrl || ''
      });
      setIsLoading(false);
    } else {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/events/${id}`,
            { withCredentials: true }
          );
          setFormData(response.data.data);
        } catch (err) {
          console.error("Error fetching event:", err);
          toast.error("Failed to load event data. Please try again later.", { position: "bottom-right" });
        } finally {
          setIsLoading(false);
        }
      };
      fetchEvent();
    }
  }, [id, location.state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (imageFile) {
        formDataToSend.append('imageUrl', imageFile);
      }

      await axios.put(
        `http://localhost:5000/api/update_event/${id}`,
        formDataToSend,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      navigate('/adminpanel', { state: { message: 'Event successfully updated!' } });
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error("Failed to save changes. Please try again.", { position: "bottom-right" });
    }
  };

  const handleBack = () => {
    navigate('/adminpanel');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading event data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
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
              Edit Event
            </h1>
            <p className="mt-2 text-sm dark:text-gray-100 text-gray-800">
              Update the event details below
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Event Title
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

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Event Image (Optional)
                </label>
                <input
                  type="file"
                  id="image"
                  name="imageUrl"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.imageUrl && !imageFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Current Image:</p>
                    <img 
                      src={formData.imageUrl} 
                      alt="Current event" 
                      className="mt-1 w-full h-auto rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEventForm;