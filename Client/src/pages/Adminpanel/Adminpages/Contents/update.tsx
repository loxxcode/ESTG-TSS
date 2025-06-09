import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UpdateForm {
  title: string;
  description: string;
  type: string;
}

function Update() {
  const navigate = useNavigate();
  const [form, setForm] = useState<UpdateForm>({
    title: '',
    description: '',
    type: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate('/adminpanel', { state: { activeTab: 0 } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('type', form.type);
      
      if (file) {
        formData.append('imageUrl', file);
      }

      const response = await axios.post(
        'http://localhost:5000/api/upload_update', 
        formData, 
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Form submitted successfully:', response.data);
      toast.success('Update submitted successfully!', { position: 'bottom-right' });
      navigate('/adminpanel', { state: { message: 'Update created successfully!', activeTab: 0 } });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit the update. Please try again.', { position: 'bottom-right' });
    } finally {
      setIsLoading(false);
    }
  };

  const isImageFile = previewUrl && previewUrl.startsWith('data:image');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 relative dark:bg-black">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg dark:bg-black dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Create New Update</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="updateType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Update Type:</label>
              <select
                name="type"
                id="updateType"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              >
                <option value="">Select Type</option>
                <option value="news">News</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>

            <div>
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Updates Description:</label>
              <textarea
                name="description"
                id="desc"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
                rows={4}
              />
            </div>

            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload File (Optional)
              </label>
              <input
                type="file"
                id="file"
                name="fileUrl"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                accept=".pdf"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                PDF file(Max: 5MB)
              </p>
            </div>

            {(previewUrl || file) && (
              <div className="mt-2 p-2 border border-gray-300 rounded-md dark:border-gray-700">
                {isImageFile ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-40 mx-auto"
                  />
                ) : (
                  <div className="flex items-center">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {file?.name || "Selected File"}
                      </p>
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove File
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                'Upload Updates'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;