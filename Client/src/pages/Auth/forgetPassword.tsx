import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/account/forgot-password",
//         { email },
//         { withCredentials: true }
//       );

//       if (response.status === 200) {
//         setSuccess(true);
//         setMsg("Password reset link sent to your email!");
//       } else {
//         setMsg("Failed to send reset link. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       if (error.response) {
//         setMsg(
//           error.response.data?.message ||
//             "An error occurred while processing your request."
//         );
//       } else if (error.request) {
//         setMsg("No response from server. Please check your connection.");
//       } else {
//         setMsg("An unexpected error occurred.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
      <button
        onClick={() => navigate(-1)}
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
        <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-sm shadow-gray-400 bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-200 md:text-gray-800 dark:text-gray-200">
              Forgot Password
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {success
                ? "Check your email for further instructions"
                : "Enter your email to receive a reset link"}
            </p>
          </div>

          {msg && (
            <div
              className={`p-3 rounded-md ${
                success
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {msg}
            </div>
          )}

          {!success ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

                          <div>
                              <Link to={"/resetpassword"} className="text-blue-400 flex">
                              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
                              </Link>
                
              </div>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={() => navigate("/admin")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}

          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
            </span>
            <Link
              to="/admin"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;