import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Uncomment axios

function ContentCreatorRegistration() {
  const [Form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/adminpanel");
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", Form); // Log form data to the console
      const response = await axios.post(
        "http://localhost:5000/api/account/creator/register",
        Form,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Registration successful", response.data);
        navigate("/user"); // Redirect to a success page
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        alert("Registration failed: " + error.response.data.message);
      } else if (error.request) {
        console.error("No response from server. Please check your connection.");
        alert("Network error: Unable to reach the server.");
      } else {
        console.error("Unexpected error:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black ">
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
      {/* Centered Form Container */}
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-md text-black bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
          {/* Form Header */}
          <div className="text-center ">
            <h1 className="text-2xl font-bold text-black  dark:bg-black dark:text-white">
              Content Creator Registration
            </h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
              Join our creative community
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleForm}>
            <div className="space-y-4 text-black">
              {/* Username Field */}
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

              {/* Email Field */}
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

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  value={Form.password}
                  onChange={(e) =>
                    setForm({ ...Form, password: e.target.value })
                  }
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
              {/* Role Selection */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  Content Role <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select your role</option>
                  <option value="Admin">Admin</option>
                  <option value="Content_creator">Content Creator</option>
                </select>
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  value={Form.phone}
                  onChange={(e) => setForm({ ...Form, phone: e.target.value })}
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="+1 (123) 456-7890"
                />
              </div>

              {/* Terms Agreement */}
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Register as Creator
              </button>
            </div>

            {/* Login Option */}
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
    </div>
  );
}

export default ContentCreatorRegistration;
