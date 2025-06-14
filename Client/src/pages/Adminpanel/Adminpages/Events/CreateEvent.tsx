import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const API_URL = import.meta.env.VITE_API_URL;

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


function Event() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploadedData, setUploadedData] = useState(null); // New state for uploaded data

  const handleBack = () => {
    navigate('/adminpanel'  );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      toast.warn("Please fill out all fields and add an image.", { position: "bottom-right" });
      return;
    }
    console.log(uploadedData)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('imageUrl', image);
    try {
      const res = await axios.post(`${API_URL}/upload_events`, formData, { withCredentials: true });
      setUploadedData(res.data);
      toast.success('Event created successfully!', { position: "bottom-right" });
      navigate('/adminpanel', { state: { activeTab: 1 } });
    } catch (error) {
      console.error(error); 
      toast.error('Failed to create event.', { position: "bottom-right" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 relative dark:bg-black">
      {/* 🔍 SEO + Social Media Meta Tags */}
      <Helmet>
        <title>Create Event | ESTG-TSS</title>
        <meta key="description" name="description" content="Add new events and activities for ESTG-TSS. Use this admin panel to keep the school community informed about upcoming events and important dates." />

        {/* Open Graph Meta Tags */}
        <meta key="og:title" property="og:title" content="Create Event | ESTG-TSS" />
        <meta key="og:description" property="og:description" content="Create and publish new events and activities for the ESTG-TSS community from the admin panel." />
        <meta key="og:url" property="og:url" content="https://estg-tss.vercel.app/admin/create-event" />
        <meta key="og:image" property="og:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content="Create Event | ESTG-TSS" />
        <meta key="twitter:description" name="twitter:description" content="Easily add new events and activities for ESTG-TSS using the admin panel." />
        <meta key="twitter:image" name="twitter:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />
      </Helmet>
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg dark:bg-black text-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Create Event</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">Event Title:</label>
              <input
                type="text"
                id="eventTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="eventImage" className="block text-sm font-medium text-gray-700">Add Image:</label>
              <input
                type="file"
                name="imageUrl"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="eventDesc" className="block text-sm font-medium text-gray-700">Event Description:</label>
              <textarea
                id="eventDesc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Create Event
              </button>
            </div>
          </div>
        </form>

        {uploadedData && ( // Render uploaded data if available
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold">Uploaded Event:</h3>
            <p><strong>Title:</strong> {uploadedData.title}</p>
            <p><strong>Description:</strong> {uploadedData.description}</p>
            {uploadedData.imageUrl && (
              <img src={uploadedData.imageUrl} alt="Uploaded Event" className="mt-2 w-full rounded-md" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Event;
