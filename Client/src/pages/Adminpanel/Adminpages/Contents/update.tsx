
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

interface UpdateData {
  _id?: string;
  title: string;
  description: string;
  type: string;
  fileUrl?: string;
}

const Update = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UpdateData>({
    title: "",
    description: "",
    type: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      const fetchUpdate = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/single_update/${id}`,
            { withCredentials: true }
          );
          setFormData(response.data);
          if (response.data.fileUrl) {
            setPreviewUrl(response.data.fileUrl);
          }
        } catch (err) {
          console.error("Error fetching update:", err);
          toast.error("Failed to load update data. Please try again.", {
            position: "bottom-right",
          });
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
    if (isEditMode) {
      setFormData(prev => ({ ...prev, fileUrl: '' }));
    }
  };

  const handleBack = () => {
    navigate("/adminpanel");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('type', formData.type);
      
      if (file) {
        formDataToSend.append('fileUrl', file);
      }

      if (isEditMode) {
        await axios.put(
          `${API_URL}/edit_update/${id}`,
          formDataToSend,
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        navigate("/adminpanel", {
          state: { message: "Update successfully updated!" },
        });
      } else {
        await axios.post(
          `${API_URL}/upload_update`,
          formDataToSend,
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        navigate("/adminpanel", {
          state: { message: "Update successfully created!" },
        });
      }
    } catch (err) {
      console.error(isEditMode ? "Error updating update:" : "Error creating update:", err);
      toast.error(`Failed to ${isEditMode ? 'save changes' : 'create update'}. Please try again.`, { position: "bottom-right" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl dark:text-gray-200">Loading...</div>
      </div>
    );
  }

  const isImageFile = previewUrl && (previewUrl.startsWith('http') || previewUrl.startsWith('data:image'));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
       {/* 🔍 SEO + Social Media Meta Tags */}
            <Helmet>
        <title>Content Updates | ESTG-TSS</title>
        <meta key="description" name="description" content="Manage and review all content updates for ESTG-TSS. Use this admin panel to organize, edit, or delete content updates and keep the school community informed." />

        {/* Open Graph Meta Tags */}
        <meta key="og:title" property="og:title" content="Content Updates | ESTG-TSS" />
        <meta key="og:description" property="og:description" content="Access and manage all content updates for ESTG-TSS from the admin panel. Organize and update content easily." />
        <meta key="og:url" property="og:url" content="https://estg-tss.vercel.app/admin/content-updates" />
        <meta key="og:image" property="og:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content="Content Updates | ESTG-TSS" />
        <meta key="twitter:description" name="twitter:description" content="Manage and organize all content updates for ESTG-TSS from the admin panel. Keep your content up to date." />
        <meta key="twitter:image" name="twitter:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />
      </Helmet>
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
              {isEditMode ? "Edit Update" : "Create New Update"}
            </h1>
            <p className="mt-2 text-sm dark:text-gray-100 text-gray-800">
              {isEditMode
                ? "Please update the details below"
                : "Please fill in the details for the new update"}
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
                  placeholder="Enter update title"
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
                  placeholder="Enter detailed description"
                />
              </div>

              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {isEditMode ? "Update File (Optional)" : "Upload File (Optional)"}
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  accept=".pdf"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  PDF file (Max: 5MB)
                </p>
              </div>

              {(previewUrl || formData.fileUrl) && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    File Preview
                  </label>
                  <div className="mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md">
                    {isImageFile ? (
                      <img 
                        src={previewUrl || formData.fileUrl} 
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
                            {file?.name || (formData.fileUrl ? "Uploaded File" : "No file selected")}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {file?.type || (formData.fileUrl ? "Click to view/download" : "")}
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
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? "Saving..." : "Creating..."}
                  </span>
                ) : (
                  <span>{isEditMode ? "Save Changes" : "Create Update"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;