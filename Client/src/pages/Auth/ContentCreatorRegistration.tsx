import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ContentCreatorRegistration() {
  const navigate = useNavigate();
  const [Form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/content-creator",
      Form
    );
    if (response.status === 200) {
      console.log("Registration successful", response.data);
      // Handle successful registration (e.g., redirect to dashboard)
    } else {
      console.error("Registration failed", response.data);
      // Handle registration failure (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black ">
      {/* Centered Form Container */}
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-md shadow-gray-400 bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>

          {/* Form Header */}
          <div className="text-center ">
            <h1 className="text-3xl font-bold text-gray-200 md:text-gray-500">
              Content Creator Registration
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join our creative community
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleForm}>
            <div className="space-y-4">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Content Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={Form.role}
                  onChange={(e) => setForm({ ...Form, role: e.target.value })}
                  id="role"
                  name="role"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select your role</option>
                  <option value="photographer">Photographer</option>
                  <option value="videographer">Videographer</option>
                  <option value="writer">Writer/Blogger</option>
                  <option value="designer">Graphic Designer</option>
                  <option value="podcaster">Podcaster</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
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
