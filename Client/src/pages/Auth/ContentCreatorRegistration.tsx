import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Copy } from "lucide-react";
import { Helmet } from "react-helmet";

const API_URL = import.meta.env.VITE_API_URL;

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

function ContentCreatorRegistration() {
  const [Form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [backupCode, setBackupCode] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/adminpanel");
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/account/creator/register`,
        Form,
        { withCredentials: true }
      );

      if (response.status === 201) {
        // Show backup code returned by API
        setBackupCode(response.data.backupCode);
        setCopySuccess(false);
      }
    } catch (error) {
      if (error.response) {
        alert("Registration failed: " + error.response.data.message);
      } else if (error.request) {
        alert("Network error: Unable to reach the server.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  const copyToClipboard = () => {
    if (backupCode) {
      navigator.clipboard.writeText(backupCode).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  const closeModal = () => {
    setBackupCode(null);
    // Redirect after showing backup code if you want
    navigate("/user");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
      {/* 🔍 SEO + Social Media Meta Tags */}
      <Helmet>
        <title>Admin Panel | ESTG-TSS</title>
        <meta name="description" content="Manage updates, events, and content creators from the admin panel of ESTG-TSS." />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Admin Panel | ESTG-TSS" />
        <meta property="og:description" content="Control content and users from the admin panel of ESTG-TSS." />
        <meta property="og:url" content="https://estg-tss.vercel.app/admin" />
        <meta property="og:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Admin Panel | ESTG-TSS" />
        <meta name="twitter:description" content="Control content and users from the admin panel of ESTG-TSS." />
        <meta name="twitter:image" content="https://estg-tss.vercel.app/assets/hero_image.jpg" />
      </Helmet>
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
        aria-label="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
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
        <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-md text-black bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              Content Creator Registration
            </h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
              Join our creative community
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleForm}>
            <div className="space-y-4 text-black">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  value={Form.username}
                  onChange={(e) =>
                    setForm({ ...Form, username: e.target.value })
                  }
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="creative_username"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  value={Form.email}
                  onChange={(e) => setForm({ ...Form, email: e.target.value })}
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="creator@example.com"
                />
              </div>

        

            

              {/* Terms */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-800 dark:text-gray-300"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Terms of Service
                  </Link>
                </label>
              </div>
          
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Register as Creator
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
              </span>
              <Link
                to="/user"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Login instead
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Backup Code Modal */}
      {backupCode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="backup-code-title"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-sm w-full p-6 mx-4 text-center">
            <h2
              id="backup-code-title"
              className="text-xl font-semibold mb-4 text-gray-900 dark:text-white"
            >
              Your Backup Code
            </h2>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              Please save this backup code securely. You will need it to recover
              your account.
            </p>
            <div className="flex items-center justify-center space-x-2 mb-6 p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 font-mono text-lg select-all cursor-text">
              <span>{backupCode}</span>
              <button
                onClick={copyToClipboard}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition-colors"
                aria-label="Copy backup code"
                title="Copy backup code"
              >
                <Copy size={20} />
              </button>
            </div>
            {copySuccess && (
              <p className="text-green-600 dark:text-green-400 mb-4">
                Backup code copied to clipboard!
              </p>
            )}
            <button
              onClick={closeModal}
              className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentCreatorRegistration;