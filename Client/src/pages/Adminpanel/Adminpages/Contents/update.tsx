import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const navigate = useNavigate();
  const [Form, setForm] = useState({
    title: '',
    desc: '',
    updateType: '',
  });

  const handleBack = () => {
    navigate('/adminpanel', { state: { activeTab: 0 } }); // 0 is the index for Updates tab
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/upload_update', Form); 
      console.log('Form submitted successfully:', response.data);
      alert('Update submitted successfully!');
      navigate('/adminpanel', { state: { activeTab: 0 } });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the update. Please try again.');
    }
  };

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
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Updates Description:</label>
              <textarea
                name="desc"
                id="desc"
                value={Form.desc}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="updateType" className="block text-sm font-medium text-gray-700">Update Type:</label>
              <select
                name="updateType"
                id="updateType"
                value={Form.updateType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                <option value="News">News</option>
                <option value="Announcement">Announcement</option>
              </select>
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