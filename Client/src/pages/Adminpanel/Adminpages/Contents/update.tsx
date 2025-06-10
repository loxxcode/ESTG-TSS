import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update() {
  const navigate = useNavigate();
  const [Form, setForm] = useState({
    title: '',
    description: '',
    type: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate("/adminpanel", { state: { activeTab: 0 } });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // For non-image files, show a generic preview
        setPreviewUrl(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/upload_update', Form, { withCredentials: true });
      console.log('Form submitted successfully:', response.data);
      toast.success('Update submitted successfully!', { position: 'bottom-right' });
      navigate('/adminpanel', { state: { message: 'Update created successfully!' } });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit the update. Please try again.', { position: 'bottom-right' });
    }
  };

  const isImageFile = previewUrl && previewUrl.startsWith('data:image');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg dark:bg-black text-black">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Create New Update</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={Form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="updateType" className="block text-sm font-medium text-gray-700">Update Type:</label>
              <select
                name="type"
                id="updateType"
                value={Form.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hidden">Select Type</option>
                <option value="news">News</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>

            <div>
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Updates Description:</label>
              <textarea
                name="description"
                id="desc"
                value={Form.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>



            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Upload Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
