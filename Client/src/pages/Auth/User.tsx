import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function User() {
  const [Form, setForm] = useState({
    email: "",
    password: "",

  });
  const handleForm = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/v1/auth/user', Form);
    if (response.status === 200) { 
      console.log("Login successful", response.data);
      // Handle successful login (e.g., redirect to dashboard)
    }
    else {
      console.error("Login failed", response.data);
      // Handle login failure (e.g., show error message)
    }
  }
  return (
    <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-black'>
      {/* Navbar */}
      <Navbar />
      
      {/* Centered Form Container */}
      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 rounded-lg  border-spacing-11 shadow-md shadow-gray-400  ">
          {/* Form Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold dark:text-gray-200">Content Creator Login</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleForm}>
                      <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  value={Form.email}
                  onChange={(e)=>setForm({...Form, email: e.target.value})}
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="contentcreator@example.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  value={Form.password}
                  onChange={(e)=>setForm({...Form, password: e.target.value})}
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between md:flex-row flex-col gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Sign In
              </button>
            </div>

            {/* Alternative Login Option */}
            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Not an admin? </span>
              <Link to="/admin" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                back
              </Link>
            </div>
            <div>
              <Link to="/contentcreatorregistration" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Register as Content Creator
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;