import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AdminForm() {
  const navigate = useNavigate();

  const [Form, setForm] = React.useState({
    email: "",
    password: "",
  });
  
  React.useEffect(() => {
    if (localStorage.getItem("adminToken")) { // Changed from "username" to "adminToken"
      navigate("/adminpanel");
    }
  }, [navigate]);

  const handleBack = () => {
    navigate("/");
  };
  
  const [errormsg, Seterrmsg] = React.useState("");
  
  const handleForm = async (e) => {
    e.preventDefault();
    Seterrmsg("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/admin/login",
        {
          email: Form.email,
          password: Form.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Login successful", response.data);
        // Store admin token in localStorage
        localStorage.setItem("adminToken", response.data.token || "authenticated");
        navigate("/adminpanel");
      } else {
        Seterrmsg("Unexpected error. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        const msg = error.response.data?.message ||
          error.response.data?.error ||
          "Login failed. Check your credentials.";
        Seterrmsg(msg);
      } else if (error.request) {
        Seterrmsg("No response from server. Please check your connection.");
      } else {
        Seterrmsg("An unexpected error occurred.");
      }
    }
  };

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
              Admin Form
            </h1>
            <p className="mt-2 text-sm dark:text-gray-100 text-gray-800">
              Please fill in the details below
            </p>
          </div>
          
          {errormsg && (
            <div className="p-2 bg-red-100 text-red-700 rounded">
              <p>{errormsg}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleForm}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  value={Form.email}
                  onChange={(e) => setForm({ ...Form, email: e.target.value })}
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  value={Form.password}
                  onChange={(e) => setForm({ ...Form, password: e.target.value })}
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="password"
                />
              </div>
              
              <div className="flex justify-between md:flex-row flex-col gap-4">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="pl-2 dark:text-gray-300">
                    Remember Me
                  </label>
                </div>
                <div>
                  <a href="/forgetpassword" className="text-blue-400 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
            
            <div className="text-center dark:text-white">
              Login as?{" "}
              <Link to="/user" className="text-blue-400 hover:text-blue-500 ml-2">
                Content creator
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminForm;